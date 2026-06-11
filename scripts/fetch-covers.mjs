// Fetches book covers for the Reading Room by ISBN and saves them into
// public/images/books/<slug>.jpg, then regenerates the cover manifest.
//
//   node scripts/fetch-covers.mjs            # fetch missing covers
//   node scripts/fetch-covers.mjs --force    # re-fetch even if a file exists
//
// Sources, tried in order per book: Google Books, then Open Library. Run this
// on your own machine — shared/CI IPs are often rate-limited (HTTP 429) by
// Google. Covers that aren't found keep their designed fallback in the UI.
//
// Note: cover images are publisher copyright; this is the same use a library
// or bookshop listing makes of them. Review if you need formal clearance.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const BOOKS_TS = 'app/[locale]/research/books.ts';
const OUT_DIR = 'public/images/books';
const FORCE = process.argv.includes('--force');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function parseBooks() {
  const src = readFileSync(BOOKS_TS, 'utf8');
  const re = /slug:\s*"([^"]+)"[\s\S]*?isbn:\s*(null|"[^"]+")/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    const slug = m[1];
    const isbn = m[2] === 'null' ? null : m[2].slice(1, -1);
    out.push({ slug, isbn });
  }
  return out;
}

async function fetchJson(url, tries = 5) {
  let delay = 1500;
  for (let i = 0; i < tries; i++) {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.status === 429) {
      await sleep(delay);
      delay *= 2;
      continue;
    }
    if (!res.ok) return null;
    return res.json();
  }
  return null;
}

async function googleCover(isbn) {
  const d = await fetchJson(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&country=US`
  );
  const li = d?.items?.[0]?.volumeInfo?.imageLinks;
  let url = li?.thumbnail || li?.smallThumbnail;
  if (!url) return null;
  // Upgrade to a larger, un-curled image and force https.
  return url.replace(/^http:/, 'https:').replace(/&zoom=\d/, '').replace('&edge=curl', '');
}

async function openLibraryCover(isbn) {
  const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;
  const res = await fetch(url);
  return res.ok && Number(res.headers.get('content-length') || 0) > 1000 ? url : null;
}

async function download(url, dest) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) return false; // guard against 1x1 placeholders
  writeFileSync(dest, buf);
  return true;
}

const existing = new Set(
  existsSync(OUT_DIR)
    ? readdirSync(OUT_DIR).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).map((f) => f.replace(/\.[^.]+$/, ''))
    : []
);

const books = parseBooks();
let got = 0;
const misses = [];

for (const { slug, isbn } of books) {
  if (!isbn) continue;
  if (!FORCE && existing.has(slug)) continue;

  const url = (await googleCover(isbn)) || (await openLibraryCover(isbn));
  if (url && (await download(url, join(OUT_DIR, `${slug}.jpg`)))) {
    got++;
    console.log(`  ✓ ${slug}`);
  } else {
    misses.push(slug);
    console.log(`  · ${slug} (not found — keeps designed cover)`);
  }
  await sleep(600);
}

console.log(`\nFetched ${got} cover(s). ${misses.length} not found.`);

// Refresh the manifest so the UI picks up whatever we downloaded.
execFileSync('node', ['scripts/gen-covers.mjs'], { stdio: 'inherit' });

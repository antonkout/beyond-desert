// Fetches book covers for the Reading Room by ISBN and saves them into
// public/images/books/<slug>.jpg, then regenerates the cover manifest.
//
//   node scripts/fetch-covers.mjs            # fetch missing covers
//   node scripts/fetch-covers.mjs --force    # re-fetch even if a file exists
//
// Primary source is Google's cover-image CDN (books.google.com/books/content),
// which serves cover thumbnails by ISBN without the rate-limited API. For each
// book we try several zoom levels and keep the highest-resolution real cover.
// Open Library is a final fallback.
//
// "Cover not available" is a generic placeholder image Google returns with HTTP
// 200. We detect it automatically: any image that repeats across several
// different books is a placeholder and is rejected, so those books keep their
// designed fallback cover in the UI.
//
// Note: cover images are publisher copyright; this is the same use a library or
// bookshop listing makes of them. Review if you need formal clearance.

import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const BOOKS_TS = 'app/[locale]/research/books.ts';
const OUT_DIR = 'public/images/books';
const FORCE = process.argv.includes('--force');
const ZOOMS = [3, 2, 1]; // high → low resolution
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const md5 = (buf) => createHash('md5').update(buf).digest('hex');

function parseBooks() {
  const src = readFileSync(BOOKS_TS, 'utf8');
  const re = /slug:\s*"([^"]+)"[\s\S]*?isbn:\s*(null|"[^"]+")/g;
  const out = [];
  let m;
  while ((m = re.exec(src))) {
    out.push({ slug: m[1], isbn: m[2] === 'null' ? null : m[2].slice(1, -1) });
  }
  return out;
}

async function fetchBuffer(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    return buf.length > 1500 ? buf : null;
  } catch {
    return null;
  }
}

const googleUrl = (isbn, zoom) =>
  `https://books.google.com/books/content?vid=ISBN${isbn}&printsec=frontcover&img=1&zoom=${zoom}`;
const openLibUrl = (isbn) => `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;

const books = parseBooks().filter((b) => b.isbn);
const targets = FORCE
  ? books
  : books.filter((b) => !existsSync(join(OUT_DIR, `${b.slug}.jpg`)));

// Pass 1 — gather candidate images (all zooms + Open Library) and hash them so
// we can spot the shared "no cover" placeholder.
const candidates = new Map(); // slug -> [{score, buf, hash}]
const hashCount = new Map();
for (const { slug, isbn } of targets) {
  const list = [];
  for (const z of ZOOMS) {
    const buf = await fetchBuffer(googleUrl(isbn, z));
    if (buf) list.push({ score: z, buf, hash: md5(buf) });
    await sleep(250);
  }
  const ol = await fetchBuffer(openLibUrl(isbn));
  if (ol) list.push({ score: 0.5, buf: ol, hash: md5(ol) });
  for (const c of list) hashCount.set(c.hash, (hashCount.get(c.hash) || 0) + 1);
  candidates.set(slug, list);
}

const placeholders = new Set(
  [...hashCount.entries()].filter(([, n]) => n >= 3).map(([h]) => h)
);

// Pass 2 — keep the highest-scoring non-placeholder image per book.
let got = 0;
const misses = [];
for (const { slug } of targets) {
  const real = (candidates.get(slug) || [])
    .filter((c) => !placeholders.has(c.hash))
    .sort((a, b) => b.score - a.score);
  const dest = join(OUT_DIR, `${slug}.jpg`);
  if (real.length) {
    writeFileSync(dest, real[0].buf);
    got++;
    console.log(`  ✓ ${slug}`);
  } else {
    if (existsSync(dest)) rmSync(dest); // drop any stale placeholder
    misses.push(slug);
    console.log(`  · ${slug} (no cover — keeps designed fallback)`);
  }
}

console.log(`\nFetched ${got} cover(s). ${misses.length} without a cover.`);
execFileSync('node', ['scripts/gen-covers.mjs'], { stdio: 'inherit' });

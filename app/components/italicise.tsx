import { Fragment, type ReactNode } from 'react';

// Review (D. Frenez): "Falaj/falaj and Aflaj/aflaj should be italicised
// everywhere". They are Arabic loanwords, so they are set in italics wherever
// they occur in running text. Doing this at render time rather than by marking
// up each string means new copy gets the treatment automatically and no
// occurrence can be missed.
//
// Only the Latin-script forms are matched: italicising Arabic script is
// typographically wrong, and the Arabic text uses الفلج / الأفلاج anyway.
const TERM = /\b(falaj|aflaj)\b/gi;

export function italiciseTerms(text: string): ReactNode {
  if (!TERM.test(text)) return text;
  TERM.lastIndex = 0;

  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = TERM.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<em key={`${m.index}-${m[0]}`}>{m[0]}</em>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));

  return out.map((node, i) => <Fragment key={i}>{node}</Fragment>);
}

import { marked } from 'marked';
import { makeWordRegExp } from './utils/word-regexp';

export async function extractSection(document: string, heading: string) {
  const tokens = marked.lexer(document);
  const headingRe = makeWordRegExp(heading);
  const start = tokens.findIndex(t => t.type === 'heading' && t.text.search(headingRe) === 0);
  if (start === -1) {
    throw Error(`Section '${heading}' not found`);
  } else {
    const { depth } = tokens[start]! as marked.Tokens.Heading;
    const end = tokens.findIndex((t, i) => i > start && t.type === 'heading' && t.depth <= depth);
    const section = tokens.slice(start + 1, end >= 0 ? end : undefined).map(t => t.raw).join('');
    return section;
  }
}

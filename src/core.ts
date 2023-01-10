import { makeWordRegExp } from './utils/word-regexp';

export function extractSection(document: string, wantedHeading: string) {
  // ATX Headings as defined in GitHub Flavored Markdown (https://github.github.com/gfm/#atx-headings)
  const heading = /^ {0,3}(?<lead>#{1,6})(?: [ \t\v\f]*(?<text>.*?)[ \t\v\f]*)?(?:[\n\r]+|$)/mg;

  const wantedHeadingRe = makeWordRegExp(wantedHeading);

  let start, end;

  for (const m of document.matchAll(heading)) {
    if (!start) {
      if (m.groups!.text!.search(wantedHeadingRe) === 0) {
        start = m;
      }
    } else if (m.groups!.lead!.length <= start.groups!.lead!.length) {
      end = m;
      break;
    }
  }

  if (start) {
    return document.slice(start.index! + start[0].length, end?.index);
  }
}

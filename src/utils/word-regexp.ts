export function makeWordRegExp(word: string) {
  const start = word.length > 0 && /\b/.test(word[0]!) ? '\\b' : '';
  const end = word.length > 0 && /\b/.test(word[word.length - 1]!) ? '\\b' : '';
  return new RegExp(
    start + [...word].map(c => /[a-z]/i.test(c) ? c : '\\' + c).join('') + end
  );
}

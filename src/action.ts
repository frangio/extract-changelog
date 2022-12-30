import * as core from '@actions/core';
import * as github from '@actions/github';
import { extractSection } from './core';

(async () => {
  const inputFile = core.getInput('changelog');
  const outputFile = core.getInput('output');
  const versionMatch = github.context.ref.match(/^refs\/tags\/v(\d[^-]*)/);
  if (!versionMatch) {
    throw Error('github.context.ref is not a tag');
  } else {
    const version = versionMatch[1]!;
    await extractSection(inputFile, outputFile, version);
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});

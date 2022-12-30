import * as core from '@actions/core';
import * as github from '@actions/github';
import { extractSection } from './core';
import { promises as fs } from 'fs';
import path from 'path';

(async () => {
  const inputFile = core.getInput('changelog');
  const input = await fs.readFile(inputFile, 'utf8');

  const outputFile = path.join(await fs.mkdtemp('extract-changelog-'), 'output.md');

  const versionMatch = github.context.ref.match(/^refs\/tags\/v(\d[^-]*)/);

  if (!versionMatch) {
    throw Error('github.context.ref is not a tag');
  } else {
    const version = versionMatch[1]!;
    const output = await extractSection(input, version);
    await fs.writeFile(outputFile, output);
    core.setOutput('file', outputFile);
  }
})().catch(e => {
  console.error(e);
  process.exit(1);
});

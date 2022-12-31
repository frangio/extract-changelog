import assert from 'assert/strict';
import { extractSection } from './core';

it('extracts first and final section', () => {
  const heading = '0.1.0';
  const section = `- One\n`;
  const input = [`# Changelog\n`, `## ${heading}\n`, section].join('');
  assert.equal(extractSection(input, heading), section);
});

it('extracts first section', () => {
  const heading = '0.1.0';
  const section = `- One\n`;
  const input = [`# Changelog\n`, `## ${heading}\n`, section, `## 9.0.0\n`, `- X\n`].join('');
  assert.equal(extractSection(input, heading), section);
});

it('extracts final section', () => {
  const heading = '0.1.0';
  const section = `- One\n`;
  const input = [`# Changelog\n`, `## 9.0.0\n- X\n`, `## ${heading}\n`, section].join('');
  assert.equal(extractSection(input, heading), section);
});

it('extracts middle section', () => {
  const heading = '0.1.0';
  const section = `- One\n`;
  const input = [
    `# Changelog\n`,
    `## 9.0.0\n- X\n`,
    `## ${heading}\n`,
    section,
    `## 7.0.0\n- X\n`,
  ].join('');
  assert.equal(extractSection(input, heading), section);
});

it('includes subsections', () => {
  const heading = '0.1.0';
  const section = [
    `- One\n`,
    `### Notice\n`,
    `- Hear\n`,
  ].join('');
  const input = [
    `# Changelog\n`,
    `## ${heading}\n`,
    section,
    `## 7.0.0\n- X\n`,
  ].join('');
  assert.equal(extractSection(input, heading), section);
});

it('excludes outer level headings', () => {
  const heading = '0.1.0';
  const section = `- One\n`;
  const input = [
    `# Changelog\n`,
    `## ${heading}\n`,
    section,
    `# Other Notes\n`,
  ].join('');
  assert.equal(extractSection(input, heading), section);
});

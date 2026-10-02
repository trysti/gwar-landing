#!/usr/bin/env node
// PostToolUse hook: after Claude edits a source file, run `npm run check`
// (draft build + Content Blacklist). On failure exit 2 so the output goes back to Claude.
import { execSync } from 'node:child_process';
import { relative } from 'node:path';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
const file = JSON.parse(input).tool_input?.file_path;
if (!file) process.exit(0);
const rel = relative(root, file);
if (!/^(content|data|src|assets|scripts)\//.test(rel)) process.exit(0);

try {
  execSync('node scripts/build.mjs --draft && node scripts/check-content.mjs', { cwd: root, stdio: 'pipe' });
} catch (e) {
  process.stderr.write(`npm run check failed after editing ${rel}:\n${e.stdout}${e.stderr}`);
  process.exit(2);
}

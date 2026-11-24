#!/usr/bin/env node
// Pre-commit guard: blocks commits that contain secrets or personal data.
// Usage:
//   node scripts/guvenlik-tarama.mjs          -> scan staged files (pre-commit hook)
//   node scripts/guvenlik-tarama.mjs --all    -> scan every tracked + untracked (non-ignored) file
// False positives: add the exact matched text (one per line) to scripts/guvenlik-izin.txt with a "# reason" comment above it.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

const git = (...args) => execFileSync('git', args, { encoding: 'buffer', maxBuffer: 64 * 1024 * 1024 });

const scanAll = process.argv.includes('--all');

const files = (
  scanAll
    ? git('ls-files', '--cached', '--others', '--exclude-standard', '-z')
    : git('diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z')
)
  .toString('utf8')
  .split('\0')
  .filter(Boolean);

const allowFile = 'scripts/guvenlik-izin.txt';
const allowed = new Set(
  existsSync(allowFile)
    ? readFileSync(allowFile, 'utf8')
        .split(/\r?\n/)
        .map((l) => l.trim())
        .filter((l) => l && !l.startsWith('#'))
    : [],
);

// Files that must never be committed, whatever their content.
const FORBIDDEN_PATHS = [
  { re: /(^|\/)\.env(\.(?!example$)[^/]*)?$/, why: '.env file' },
  { re: /\.(pem|key|p12|pfx)$/i, why: 'private key / certificate file' },
  { re: /(^|\/)id_(rsa|ed25519|ecdsa)(\.pub)?$/, why: 'SSH key' },
  { re: /(^|\/)kisisel\//, why: 'personal folder' },
  { re: /(kimlik|adli[-_ ]?sicil|pasaport|passport)/i, why: 'identity document' },
];

// Patterns inside file contents.
const RULES = [
  { why: 'Anthropic API key', re: /sk-ant-[A-Za-z0-9_-]{20,}/g },
  { why: 'OpenAI-style API key', re: /\bsk-(proj-)?[A-Za-z0-9_-]{20,}/g },
  { why: 'Google API key', re: /\bAIza[0-9A-Za-z_-]{35}\b/g },
  { why: 'GitHub token', re: /\bgh[pousr]_[A-Za-z0-9]{30,}\b/g },
  { why: 'AWS access key', re: /\bAKIA[0-9A-Z]{16}\b/g },
  { why: 'Slack token', re: /\bxox[abprs]-[A-Za-z0-9-]{10,}/g },
  { why: 'Telegram bot token', re: /\b\d{8,10}:[A-Za-z0-9_-]{35}\b/g },
  { why: 'private key block', re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
  { why: 'connection string with password', re: /\b[a-z+]+:\/\/[^\s:/@]+:[^\s@/]{3,}@[^\s]+/gi },
  {
    why: 'hard-coded secret',
    re: /\b(password|passwd|secret|api[_-]?key|access[_-]?token|auth[_-]?token)\b\s*[:=]\s*['"][^'"\s]{6,}['"]/gi,
  },
  { why: 'Turkish phone number', re: /(?<![\d])(\+90[\s-]?|0)?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}(?![\d])/g },
  { why: 'IBAN', re: /\bTR\d{2}[\s]?(\d{4}[\s]?){5}\d{2}\b/g },
  { why: 'e-mail address', re: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g },
  { why: 'TC identity number', re: /\b[1-9]\d{10}\b/g, check: isValidTckn },
];

// Generic addresses that are fine to commit.
const SAFE_EMAIL = /@(example\.(com|org|net)|users\.noreply\.github\.com|anthropic\.com)$/i;

function isValidTckn(s) {
  const d = [...s].map(Number);
  const odd = d[0] + d[2] + d[4] + d[6] + d[8];
  const even = d[1] + d[3] + d[5] + d[7];
  if ((((odd * 7 - even) % 10) + 10) % 10 !== d[9]) return false;
  return d.slice(0, 10).reduce((a, b) => a + b, 0) % 10 === d[10];
}

const mask = (s) => (s.length <= 6 ? '***' : `${s.slice(0, 3)}…${s.slice(-2)}`);

const problems = [];

for (const file of files) {
  const normalized = file.replace(/\\/g, '/');
  for (const p of FORBIDDEN_PATHS) {
    if (p.re.test(normalized)) problems.push({ file, line: 0, why: p.why, hit: normalized });
  }

  let buf;
  try {
    buf = scanAll ? readFileSync(file) : git('show', `:${file}`);
  } catch {
    continue;
  }
  if (buf.includes(0)) continue; // binary
  const lines = buf.toString('utf8').split(/\r?\n/);

  lines.forEach((text, i) => {
    for (const rule of RULES) {
      for (const m of text.matchAll(rule.re)) {
        const hit = m[0];
        if (allowed.has(hit)) continue;
        if (rule.check && !rule.check(hit)) continue;
        if (rule.why === 'e-mail address' && SAFE_EMAIL.test(hit)) continue;
        problems.push({ file, line: i + 1, why: rule.why, hit });
      }
    }
  });
}

if (problems.length) {
  console.error('\n✋ Güvenlik taraması commit\'i durdurdu (kişisel veri / anahtar şüphesi):\n');
  for (const p of problems) {
    console.error(`  ${p.file}${p.line ? `:${p.line}` : ''}  —  ${p.why}  (${mask(p.hit)})`);
  }
  console.error(
    `\nDüzelt ve tekrar dene. Yanlış alarmsa eşleşen metni gerekçesiyle ${allowFile} dosyasına ekle.\n`,
  );
  process.exit(1);
}

console.log(`✅ Güvenlik taraması temiz (${files.length} dosya).`);

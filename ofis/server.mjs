#!/usr/bin/env node
// AjanlarOfisi — local-only office screen (ADR-004). No dependencies.
// Run: node ofis/server.mjs  → http://127.0.0.1:4400
// Reads the agents' own files (event logs, status, ledger) and serves them read-only.

import { createServer } from 'node:http';
import { readFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');
const PUBLIC = join(HERE, 'public');
const PORT = Number(process.env.OFIS_PORT ?? 4400);
const HOST = '127.0.0.1'; // never expose outside this machine

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.json': 'application/json; charset=utf-8',
};

const SAFE_NAME = /^[a-z0-9-]+$/;
const SAFE_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SAFE_FILE = /^0[1-9]-[a-z0-9-]+\.md$/;

const readText = async (p) => (existsSync(p) ? readFile(p, 'utf8') : '');
const readJson = async (p, fallback) => {
  try {
    return JSON.parse(await readFile(p, 'utf8'));
  } catch {
    return fallback;
  }
};

function frontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (!m) return out;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

async function agents() {
  const dir = join(ROOT, '.claude', 'agents');
  if (!existsSync(dir)) return [];
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  return Promise.all(
    files.map(async (f) => {
      const fm = frontmatter(await readFile(join(dir, f), 'utf8'));
      return { id: fm.name ?? f.replace(/\.md$/, ''), description: fm.description ?? '', model: fm.model ?? '' };
    }),
  );
}

function parseLedger(md) {
  const lessons = [];
  const proposals = [];
  let section = '';
  for (const line of md.split(/\r?\n/)) {
    if (line.startsWith('## ')) section = line.slice(3).trim().toLowerCase();
    const m = line.match(/^- (\d{4}-\d{2}-\d{2}) · ([a-z-]+) · (.+)$/);
    if (!m) continue;
    const item = { date: m[1], agent: m[2], text: m[3] };
    (section.startsWith('kural') ? proposals : lessons).push(item);
  }
  return { lessons, proposals };
}

async function teams() {
  const dir = join(ROOT, 'takimlar');
  const names = (await readdir(dir)).filter((n) => SAFE_NAME.test(n));
  return Promise.all(
    names.map(async (name) => {
      const tdir = join(dir, name);
      const kosu = join(tdir, 'kosu');
      const runs = existsSync(kosu) ? (await readdir(kosu)).filter((d) => SAFE_DATE.test(d)).sort().reverse() : [];
      return {
        name,
        status: await readJson(join(tdir, 'durum.json'), {}),
        runs,
        ledger: parseLedger(await readText(join(tdir, 'defter.md'))),
      };
    }),
  );
}

async function run(team, date) {
  const rdir = join(ROOT, 'takimlar', team, 'kosu', date);
  if (!existsSync(rdir)) return null;
  const raw = await readText(join(rdir, 'olaylar.jsonl'));
  const events = raw
    .split(/\r?\n/)
    .filter(Boolean)
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
  const files = [];
  for (const f of (await readdir(rdir)).sort()) {
    if (!SAFE_FILE.test(f)) continue;
    const s = await stat(join(rdir, f));
    files.push({ name: f, bytes: s.size });
  }
  return { team, date, events, files };
}

function send(res, code, body, type = 'application/json; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(typeof body === 'string' || Buffer.isBuffer(body) ? body : JSON.stringify(body));
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${HOST}`);
    if (req.method !== 'GET') return send(res, 405, { error: 'read-only' });

    if (url.pathname === '/api/state') {
      return send(res, 200, { now: new Date().toISOString(), agents: await agents(), teams: await teams() });
    }
    if (url.pathname === '/api/run') {
      const team = url.searchParams.get('team') ?? '';
      const date = url.searchParams.get('date') ?? '';
      if (!SAFE_NAME.test(team) || !SAFE_DATE.test(date)) return send(res, 400, { error: 'bad params' });
      const data = await run(team, date);
      return data ? send(res, 200, data) : send(res, 404, { error: 'no run' });
    }
    if (url.pathname === '/api/file') {
      const team = url.searchParams.get('team') ?? '';
      const date = url.searchParams.get('date') ?? '';
      const name = url.searchParams.get('name') ?? '';
      if (!SAFE_NAME.test(team) || !SAFE_DATE.test(date) || !SAFE_FILE.test(name)) return send(res, 400, { error: 'bad params' });
      const p = join(ROOT, 'takimlar', team, 'kosu', date, name);
      return existsSync(p) ? send(res, 200, await readFile(p, 'utf8'), 'text/plain; charset=utf-8') : send(res, 404, 'not found', 'text/plain');
    }

    const rel = url.pathname === '/' ? 'index.html' : url.pathname.slice(1);
    const p = resolve(PUBLIC, rel);
    if (!p.startsWith(PUBLIC) || !existsSync(p)) return send(res, 404, 'not found', 'text/plain');
    return send(res, 200, await readFile(p), TYPES[extname(p)] ?? 'application/octet-stream');
  } catch (err) {
    return send(res, 500, { error: String(err?.message ?? err) });
  }
});

server.listen(PORT, HOST, () => console.log(`AjanlarOfisi ofis ekranı → http://${HOST}:${PORT}`));

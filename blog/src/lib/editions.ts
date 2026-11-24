import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export interface BriefItem {
  headline: string;
  html: string;
  sources: { name: string; url: string }[];
  verified: 'primary' | 'secondary' | 'unknown';
}

export interface Edition {
  dateKey: string; // YYYY-MM-DD
  date: Date;
  number: number; // 0 for the specimen edition
  specimen: boolean;
  brief?: Post;
  article?: Post;
  items: BriefItem[];
  sourceCount: number;
}

const FIRST_YEAR = 2026;

export const dateKey = (d: Date): string => d.toISOString().slice(0, 10);

export function formatLongDate(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export function formatShortDate(d: Date): string {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(d);
}

export function toRoman(n: number): string {
  const map: [number, string][] = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'],
    [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of map) while (n >= v) { out += s; n -= v; }
  return out;
}

export const volumeOf = (d: Date): string => toRoman(Math.max(1, d.getUTCFullYear() - FIRST_YEAR + 1));

export const padNo = (n: number): string => String(n).padStart(3, '0');

export const postUrl = (p: Post): string => `/posts/${p.id}`;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Tiny inline-markdown renderer for excerpts: links, bold, italics. Input is escaped first. */
export function inlineMd(s: string): string {
  return escapeHtml(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text: string, url: string) => {
      const external = /^https?:/.test(url);
      return `<a href="${url}"${external ? ' rel="noopener" target="_blank"' : ''}>${text}</a>`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function parseBrief(body: string): BriefItem[] {
  const parts = body.split(/^## +/m).slice(1);
  return parts.map((part) => {
    const [first = '', ...rest] = part.split(/\r?\n/);
    const sourceLine = rest.find((l) => /^Sources?:/i.test(l.trim())) ?? '';
    const text = rest
      .filter((l) => l.trim() && !/^Sources?:/i.test(l.trim()))
      .join(' ')
      .trim();
    const sources = [...sourceLine.matchAll(LINK_RE)].map((m) => ({ name: m[1] ?? '', url: m[2] ?? '' }));
    const verified = sourceLine.includes('✅') ? 'primary' : sourceLine.includes('🟡') ? 'secondary' : 'unknown';
    return { headline: first.trim(), html: inlineMd(text), sources, verified };
  });
}

/** First paragraphs of an article (no headings), as inline HTML, up to `maxWords`. */
export function excerpt(body: string, maxWords = 170): string[] {
  const paras = body
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.trim())
    .filter((p) => p && !p.startsWith('#') && !/^\d+\.\s/.test(p) && !p.startsWith('- '));
  const out: string[] = [];
  let words = 0;
  for (const p of paras) {
    if (words >= maxWords) break;
    const w = p.split(/\s+/);
    if (words + w.length > maxWords && out.length) {
      out.push(inlineMd(w.slice(0, maxWords - words).join(' ') + '…'));
      break;
    }
    out.push(inlineMd(p));
    words += w.length;
  }
  return out;
}

export function countSources(...bodies: (string | undefined)[]): number {
  const urls = new Set<string>();
  for (const b of bodies) for (const m of (b ?? '').matchAll(LINK_RE)) if (m[2]?.startsWith('http')) urls.add(m[2]);
  return urls.size;
}

export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => data.status === 'published');
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** All editions, newest first. Numbering skips the specimen (No. 000). */
export async function getEditions(): Promise<Edition[]> {
  const posts = await getPublishedPosts();
  const byDate = new Map<string, Post[]>();
  for (const p of posts) {
    const k = dateKey(p.data.date);
    byDate.set(k, [...(byDate.get(k) ?? []), p]);
  }
  const keys = [...byDate.keys()].sort();
  let counter = 0;
  const editions = keys.map((k) => {
    const group = byDate.get(k) ?? [];
    const brief = group.find((p) => p.data.type === 'brief');
    const article = group.find((p) => p.data.type === 'article');
    const specimen = group.every((p) => p.data.specimen);
    const number = specimen ? 0 : ++counter;
    return {
      dateKey: k,
      date: (brief ?? article)!.data.date,
      number,
      specimen,
      brief,
      article,
      items: brief?.body ? parseBrief(brief.body) : [],
      sourceCount: countSources(brief?.body, article?.body),
    } satisfies Edition;
  });
  return editions.reverse();
}

export async function getEditionFor(post: Post): Promise<Edition | undefined> {
  const editions = await getEditions();
  return editions.find((e) => e.dateKey === dateKey(post.data.date));
}

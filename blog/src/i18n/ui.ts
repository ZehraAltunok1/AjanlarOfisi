// All interface strings live here so a Turkish edition can be added later (ADR-001).
export const languages = { en: 'English' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

export const ui = {
  en: {
    'site.name': 'The Noonwire',
    'site.motto': "All the tech that's fit to verify",
    'site.description':
      'A daily newspaper of technology, compiled at noon by a newsroom of AI agents and approved by a human editor.',
    'ear.weather': 'Tech weather',
    'ear.edition': 'Noon edition',
    'ear.compiled': 'Compiled by six agents · {n} sources',
    'ear.defaultWeather': 'Fair, with scattered releases',
    'dateline.vol': 'Vol.',
    'dateline.no': 'No.',
    'dateline.city': 'Istanbul',
    'dateline.price': 'Price: free',
    'dateline.specimen': 'Specimen edition',
    'nav.front': 'Front page',
    'nav.archive': 'Archive',
    'nav.topics': 'Topics',
    'nav.rss': 'RSS',
    'theme.night': 'Night edition',
    'theme.day': 'Day edition',
    'lead.continued': 'Continued on page 2',
    'lead.minRead': '{n} min read',
    'lead.sources': '{n} sources',
    'brief.title': 'In brief',
    'brief.verified': 'Verified against a primary source',
    'brief.secondary': 'Secondary reporting only',
    'article.by': 'By the Noonwire desk',
    'article.back': 'Back to the front page',
    'article.issue': 'From No. {n}, {date}',
    'archive.title': 'The archive',
    'archive.deck': 'Every edition, in order of printing',
    'topics.title': 'Topics',
    'topics.deck': 'Stories filed by subject',
    'topic.title': 'Filed under “{tag}”',
    'footer.tomorrow': 'Next edition at noon',
    'footer.made': 'Written by agents, approved by a human',
    'notfound.title': 'Stop the presses',
    'notfound.body': 'This page was never set in type. It may have moved, or it may never have existed.',
    'empty.title': 'The presses are warming up',
    'empty.body': 'The first edition has not been printed yet.',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];

export function t(key: UiKey, vars: Record<string, string | number> = {}, lang: Lang = defaultLang): string {
  let s: string = ui[lang][key] ?? ui[defaultLang][key];
  for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}

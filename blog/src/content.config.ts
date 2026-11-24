import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['brief', 'article']),
    date: z.coerce.date(),
    status: z.enum(['draft', 'approved', 'published', 'rejected']),
    tags: z.array(z.string()).default([]),
    summary: z.string().max(200),
    deck: z.string().optional(),
    readingMinutes: z.number().int().positive().optional(),
    weather: z.string().max(80).optional(),
    specimen: z.boolean().default(false),
    publishedAt: z.coerce.date().optional(),
  }),
});

export const collections = { posts };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const artikel = defineCollection({
  loader: glob({ base: './src/content/artikel', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    label: z.enum(['proyek', 'teknis', 'blog']),
    aplikasi: z.enum(['kantor', 'hotel', 'instansi', 'kampus']),
    tipe: z.string().optional(),
    lokasi: z.string().optional(),
    image: z.string().optional(),
    author: z.string().default('Tim Teknis Pireki'),
  }),
});

const lokasi = defineCollection({
  loader: glob({ base: './src/content/lokasi', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    kota: z.string(),
    provinsi: z.string(),
    title: z.string(),
    description: z.string(),
    kantorLayanan: z.string(),
    cakupanWilayah: z.array(z.string()),
    karakteristikGedung: z.string(),
    image: z.string().default('/img/lokasi-default.svg'),
    tipePopuler: z.array(z.string()).optional(),
  }),
});

export const collections = { artikel, lokasi };

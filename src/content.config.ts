import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			author: z.string().default('Tim Redaksi PanduanWarga'),
			source: z.string().optional(),
			// Hanya izinkan http/https. `z.string().url()` saja masih menerima
			// `javascript:` dan `data:` yang bisa dipakai untuk XSS.
			sourceUrl: z
				.string()
				.url()
				.refine((u) => /^https?:\/\//i.test(u), {
					message: 'sourceUrl harus diawali http:// atau https://',
				})
				.optional(),
		}),
});

export const collections = { blog };
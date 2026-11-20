// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://panduanwarga.com',
	integrations: [
		mdx(),
		sitemap({
			// Halaman paginasi beranda (/2/, /3/, ...) isinya duplikat dengan /blog/,
			// jadi tidak dimasukkan ke sitemap (halaman tsb juga diberi noindex).
			filter: (page) => !/^https?:\/\/[^/]+\/\d+\/?$/.test(page),
		}),
	],
	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Atkinson',
			cssVariable: '--font-atkinson',
			fallbacks: ['sans-serif'],
			options: {
				variants: [
					{
						src: ['./src/assets/fonts/atkinson-regular.woff'],
						weight: 400,
						style: 'normal',
						display: 'swap',
					},
					{
						src: ['./src/assets/fonts/atkinson-bold.woff'],
						weight: 700,
						style: 'normal',
						display: 'swap',
					},
				],
			},
		},
	],
});
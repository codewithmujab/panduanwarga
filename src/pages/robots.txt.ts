import type { APIRoute } from 'astro';

// Dibuat otomatis dari `site` di astro.config.mjs agar domain sitemap selalu konsisten.
export const GET: APIRoute = ({ site }) => {
	const sitemapURL = new URL('sitemap-index.xml', site).href;
	const body = `User-agent: *
Disallow: /admin/
Allow: /

Sitemap: ${sitemapURL}
`;
	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
};

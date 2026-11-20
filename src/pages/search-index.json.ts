import { getCollection } from 'astro:content';

export async function GET() {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const index = posts.map((post) => {
    const date = new Date(post.data.pubDate);
    // Selalu pakai UTC (sama dengan cara pubDate di-parse) agar arsip bulan
    // dan filter tanggal konsisten di zona waktu mana pun.
    const yearMonth = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}`;
    const fullDate = date.toISOString().split('T')[0];

    return {
      id: post.id,
      title: post.data.title,
      description: post.data.description,
      pubDate: date.toISOString(),
      yearMonth,
      fullDate,
    };
  });

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}

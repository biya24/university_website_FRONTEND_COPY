// app/api/search/route.ts
import { NextResponse } from 'next/server';

interface SearchResult {
  id: number;
  title: string;
  url: string;
  type: string;
  description?: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchContent(query);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ results: [] });
  }
}

async function searchContent(query: string): Promise<SearchResult[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/jsonapi/node/page?filter[title][value]=${encodeURIComponent(query)}&filter[title][operator]=CONTAINS`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const json = await res.json();

  return json.data.map((item: any, index: number) => ({
    id: index,
    title: item.attributes.title,
    url: item.attributes.path?.alias || `/node/${item.attributes.drupal_internal__nid}`,
    type: item.type.replace("node--", ""),
    description: item.attributes.body?.summary || "",
  }));
}

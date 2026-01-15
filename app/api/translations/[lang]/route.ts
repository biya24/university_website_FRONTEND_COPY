import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ lang: string }> }
) {
  const { lang } = await params;

  if (!lang) return NextResponse.json({});

  return NextResponse.json({});
}

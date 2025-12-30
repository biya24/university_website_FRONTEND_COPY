import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { lang: string } }) {
  const { lang } = params;
  if (!lang) return NextResponse.json({});
  // Return an empty object if not needed
  return NextResponse.json({});
}

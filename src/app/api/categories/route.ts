import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);

  try {
    const supabase = await createClient();
    const cats = await supabase
      .from("categories")
      .select()
      .limit(Number(params?.amount || 5));

    if (cats.error || cats.status !== 200) {
      throw new Error("Can't get the categories list");
    }
    return new NextResponse(JSON.stringify(cats.data), { status: 200 });
  } catch (e: unknown) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

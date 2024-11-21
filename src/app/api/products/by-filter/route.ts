import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);

  try {
    const supabase = await createClient();
    const request = supabase
      .from("products")
      .select()
      .limit(Number(params?.amount || 20));

    let products;

    if (params.new) {
      products = await request.eq("isNew", true);
    }

    if (params.top_selling) {
      products = await request.order("sold_amount", { ascending: false });
    }

    if (products?.error || products?.status !== 200) {
      throw new Error("Can't get the categories list");
    }
    return new NextResponse(JSON.stringify(products.data), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest, context: any) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);

    const supabase = await createClient();
    const { id } = await context?.params;

    const product = await supabase
      .from("products")
      .select()
      .eq("slug", id)
      .single();

    if (product.error || product.status !== 200) {
      throw new Error("Can't find the product by slug");
    }
    const isFav = await supabase
      .from("favorites")
      .select()
      .eq("product_id", product.data.id)
      .eq("user_id", params.param)
      .single();

    const response = {
      ...product.data,
      isFavorite: !!isFav.data,
    };

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 410 });
  }
}

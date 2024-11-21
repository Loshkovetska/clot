import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest, context: any) {
  try {
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
    return new NextResponse(JSON.stringify(product.data), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 410 });
  }
}

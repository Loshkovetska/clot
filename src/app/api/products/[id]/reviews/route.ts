import createClient from "@/lib/config/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  try {
    const supabase = await createClient();

    const product = await supabase
      .from("reviews")
      .select("*, product_slug:product_id.slug")
      .eq("product_slug", context)
      .single();

    if (product.error || product.status !== 200) {
      throw new Error("Can't find the product reviews by slug");
    }
    return NextResponse.json(JSON.stringify(product.data), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 410 });
  }
}

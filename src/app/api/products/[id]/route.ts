import createClient from "@/lib/config/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: any) {
  try {
    const supabase = await createClient();
    const { id } = await context?.params;

    console.log(id);

    const product = await supabase
      .from("products")
      .select()
      .eq("slug", id)
      .single();

    if (product.error || product.status !== 200) {
      throw new Error("Can't find the product by slug");
    }
    return NextResponse.json(JSON.stringify(product.data), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 410 });
  }
}
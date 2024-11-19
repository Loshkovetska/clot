import createClient from "@/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const products = await supabase.from("products").select();

    if (products.data?.length) {
      return new NextResponse(JSON.stringify([]), { status: 200 });
    }
    throw new Error("Can't get the products list");
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

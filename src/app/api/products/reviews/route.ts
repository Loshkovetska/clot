import createClient from "@/lib/config/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = Object.fromEntries(req.nextUrl.searchParams);

    const reviews = await supabase
      .from("reviews")
      .select()
      .eq("product_id", params.id);

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't find the product reviews by slug");
    }
    return NextResponse.json(JSON.stringify(reviews.data), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = await req.json();

    const reviews = await supabase.from("reviews").insert(params);

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't add a review");
    }
    return NextResponse.json(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

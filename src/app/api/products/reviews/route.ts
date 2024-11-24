import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

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
    return new NextResponse(JSON.stringify(reviews.data), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = await req.json();

    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const reviews = await supabase.from("reviews").insert({
      ...params,
      user_id: auth.userId,
    });

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't add a review");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

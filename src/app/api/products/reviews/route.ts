import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = Object.fromEntries(req.nextUrl.searchParams);

    const reviews = await supabase
      .from("reviews")
      .select("*, user:user_id(*)")
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

    const copy = JSON.parse(JSON.stringify(params));
    delete copy.totalReviews;
    delete copy.productRate;

    const reviews = await supabase.from("reviews").insert({
      ...copy,
      user_id: auth.userId,
    });

    if (reviews.error) {
      throw new Error("Can't add a review");
    }

    const rate = (params.productRate + params.rate) / (params.totalReviews + 1);

    await supabase
      .from("products")
      .update({ totalReviews: params.totalReviews + 1, rate: rate })
      .eq("id", params.product_id);
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

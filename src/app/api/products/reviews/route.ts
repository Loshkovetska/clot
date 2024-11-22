import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

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

    const { userId } = getAuth(req);

    if (!userId) {
      return new NextResponse(JSON.stringify("Unauthorized!"), {
        status: 401,
      });
    }

    const reviews = await supabase.from("reviews").insert({
      ...params,
      user_id: userId,
    });

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't add a review");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

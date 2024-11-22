import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const reviews = await supabase
      .from("favorites")
      .select()
      .eq("user_id", auth.userId);

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't get user fav list");
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

    const reviews = await supabase.from("favorites").insert({
      ...params,
      user_id: auth.userId,
    });

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't add the product to favorites");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = await req.json();

    const reviews = await supabase
      .from("favorites")
      .delete()
      .eq("product_id", params.product_id);

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't delete the product from fav list ");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

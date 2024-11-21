import createClient from "@/lib/config/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = Object.fromEntries(req.nextUrl.searchParams);

    const reviews = await supabase.from("favorites").select();
    //   todo add user condition

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't find user fav list");
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

    const reviews = await supabase.from("favorites").insert(params);

    if (reviews.error || reviews.status !== 200) {
      throw new Error("Can't add the product to favorites");
    }
    return NextResponse.json(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
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
    return NextResponse.json(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

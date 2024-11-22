import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export async function GET(req: NextRequest) {
  try {
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = await createClient();

    const cart = await supabase
      .from("cart")
      .select(
        "*, product:product_id(id, title, imageUrls, shippingCost, taxCost)"
      )
      .eq("user_id", auth.userId);

    if (cart.error || cart.status !== 200) {
      throw new Error("Can't find user shop cart");
    }
    return new NextResponse(JSON.stringify(cart.data), { status: 200 });
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

    const cart = await supabase.from("cart").insert({
      ...params,
      user_id: auth.userId,
    });

    if (cart.error) {
      throw new Error("Can't add a product to shop cart");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = await req.json();

    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const copy = JSON.parse(JSON.stringify(params));
    delete copy.id;

    const cart = await supabase.from("cart").update(copy).eq("id", params.id);

    if (cart.error) {
      throw new Error("Can't add a product to shop cart");
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

    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const column = params.id ? "id" : "user_id";
    const value = params.id || auth.userId;
    const cart = await supabase.from("cart").delete().eq(column, value);

    if (cart.error) {
      throw new Error("Can't add a product to shop cart");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

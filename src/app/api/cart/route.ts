import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const cart = await supabase.from("cart").select();
    //   todo add user condition

    if (cart.error || cart.status !== 200) {
      throw new Error("Can't find user shop cart");
    }
    return NextResponse.json(JSON.stringify(cart.data), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = await req.json();

    const cart = await supabase.from("cart").insert(params);

    if (cart.error || cart.status !== 200) {
      throw new Error("Can't add a product to shop cart");
    }
    return NextResponse.json(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}

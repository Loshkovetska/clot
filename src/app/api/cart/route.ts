import { auth, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest) {
  try {
    const { userId, getToken } = await auth();
    console.log(userId);
    const supabase = await createClient();
    const cart = await supabase.from("cart").select();
    //   todo add user condition

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

    const { userId } = getAuth(req);

    console.log(userId);

    const user = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", userId)
      .single();

    if (user.error || user.status !== 200) {
      throw new Error("Can't find user");
    }

    const cart = await supabase.from("cart").insert({
      ...params,
      user_id: user.data?.id,
    });

    if (cart.error || cart.status !== 200) {
      throw new Error("Can't add a product to shop cart");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

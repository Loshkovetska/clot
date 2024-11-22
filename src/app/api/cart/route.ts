import { auth, getAuth } from "@clerk/nextjs/server";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse(JSON.stringify("Unauthorized!"), {
        status: 401,
      });
    }
    const supabase = await createClient();
    const cart = await supabase
      .from("cart")
      .select("*, product:product_id(*)")
      .eq("user_id", userId);

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

    const auth = getAuth(req);

    if (!auth.userId) {
      return new NextResponse(JSON.stringify("Unauthorized!"), {
        status: 401,
      });
    }

    const cart = await supabase.from("cart").insert({
      ...params,
      user_id: auth.userId,
    });

    if (cart.error || cart.status !== 200) {
      throw new Error("Can't add a product to shop cart");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    console.log((e as AxiosError).response?.data);
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

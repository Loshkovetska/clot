import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const favorites = await supabase
      .from("favorites")
      .select("product:product_id(*), combination")
      .eq("user_id", auth.userId);

    if (favorites.error || favorites.status !== 200) {
      throw new Error("Can't get user fav list");
    }

    const response = favorites.data.map((fav) => ({
      ...fav.product,
      isFavorite: true,
      combinations: [JSON.parse(fav.combination)],
    }));
    return new NextResponse(JSON.stringify(response), { status: 200 });
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

    delete params.type;

    const favorites = await supabase.from("favorites").insert({
      ...params,
      user_id: auth.userId,
    });

    if (favorites.error) {
      throw new Error("Can't add the product to favorites");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = await createClient();
    const params = await req.json();

    const favorites = await supabase
      .from("favorites")
      .delete()
      .eq("product_id", params.product_id)
      .eq("user_id", auth.userId);

    if (favorites.error) {
      throw new Error("Can't delete the product from fav list ");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

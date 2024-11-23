import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);

  try {
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = await createClient();
    const request = supabase
      .from("products")
      .select()
      .limit(Number(params?.amount || 20));

    let products;

    if (params.new) {
      products = await request.eq("isNew", true);
    }

    if (params.top_selling) {
      products = await request.order("sold_amount", { ascending: false });
    }

    if (products?.error || products?.status !== 200) {
      throw new Error("Can't get the categories list");
    }

    const ids = products.data.map((prod) => prod.id);

    const favs = await supabase
      .from("favorites")
      .select("product_id, user_id")
      .in("product_id", ids)
      .eq("user_id", auth.userId);

    const response = products.data.map((product) => {
      const isFav = favs.data?.find((fav) => fav.product_id === product.id);
      return {
        ...product,
        isFavorite: !!isFav,
      };
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

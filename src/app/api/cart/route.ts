import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";
import { getCartSummary } from "@/lib/utils/cart";

export async function GET(req: NextRequest) {
  try {
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = await createClient();

    const cart = await supabase
      .from("cart")
      .select(
        "*, product:product_id(id, title, imageUrls, shippingCost, taxCost), coupon:coupon_id(id, discount)"
      )
      .eq("user_id", auth.userId);

    if (cart.error || cart.status !== 200) {
      throw new Error("Can't find user shop cart");
    }

    const response = {
      cartItems: cart.data.map((item) => {
        delete item.user_id;
        delete item.created_at;
        delete item.coupon_id;
        delete item.product_id;
        return item;
      }),
      cartSummary: getCartSummary(cart.data),
      appliedDiscount: !!getCartSummary(cart.data)?.discount,
    };
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

    const inCart = await supabase
      .from("cart")
      .select()
      .eq("user_id", auth.userId)
      .eq("product_id", params.product_id)
      .single();

    if (inCart.data) {
      console.log(typeof inCart.data.combination);
      // inInCart
      // const updatedCart = await supabase.from("cart").update({
      //   amount:
      // });
    }

    if (!inCart.data) {
      const cart = await supabase.from("cart").insert({
        ...params,
        coupon_id: null,
        user_id: auth.userId,
      });
      if (cart.error) {
        throw new Error("Can't add a product to shop cart");
      }
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

    let cart: any;

    if (params.coupon) {
      const coupon = await supabase
        .from("coupons")
        .select()
        .eq("coupon_code", params?.coupon)
        .single();

      if (coupon.error || coupon.status !== 200) {
        throw new Error("Can't find such coupon");
      }

      const today = new Date(new Date().toDateString());
      const expiredDate = new Date(
        new Date(coupon.data.expired_date).toDateString()
      );

      if (expiredDate === today) {
        throw new Error("Coupon is expired!");
      }

      await supabase
        .from("coupons")
        .update({ expired_date: new Date() })
        .eq("coupon_code", coupon.data.coupon_code);

      cart = await supabase
        .from("cart")
        .update({ coupon_id: coupon.data.id })
        .eq("user_id", auth.userId);
    } else cart = await supabase.from("cart").update(copy).eq("id", params.id);

    if (cart.error) {
      throw new Error("Can't update the shop cart");
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

import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

const ORDERS_PER_PAGE = 6;

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);

  try {
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = await createClient();

    const response = await supabase
      .from("orders")
      .select(
        "* ,address:address_id(*), items:order_items(*, product:product_id(*))",
        { count: "exact" }
      )
      .eq("address.user_id", auth.userId)
      .eq("status", params.filter)
      .range(
        (Number(params.page) - 1) * ORDERS_PER_PAGE,
        Number(params.page) * (ORDERS_PER_PAGE - 1)
      );

    if (response.error) {
      throw new Error("Can't find user orders");
    }

    const totalPages = Math.ceil((response.count || 0) / ORDERS_PER_PAGE);

    const result = {
      orders: response.data,
      page: Number(params.page),
      totalPages: totalPages,
      totalCount: response.count || 0,
      hasNextPage: Number(params.page) + 1 <= totalPages,
      hasPrevPage: Number(params.page) - 1 > 1,
    };

    return new NextResponse(JSON.stringify(result), { status: 200 });
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

    const productIds = params.items.map((item: any) => item.product_id);

    const count = await supabase.from("orders").select("id", {
      count: "exact",
    });

    // const selectedProducts = await supabase
    //   .from("products")
    //   .select("id, combinations, sold_amount")
    //   .in("id", productIds);

    // for (let i = 0; i < (selectedProducts.data?.length || 0); i++) {
    //   const item = selectedProducts.data?.[i];
    //   const paramItem = params.items.find(
    //     (parItem: any) => parItem.product_id === item?.id
    //   );

    //   const combinations =
    //     item?.combinations.map((comb: any) => {
    //       if (JSON.stringify(comb) === JSON.stringify(paramItem.combination)) {
    //         return {
    //           ...comb,
    //           amount: paramItem.combination - paramItem.amount,
    //         };
    //       }

    //       return comb;
    //     }) || [];

    //   const updateProd = await supabase
    //     .from("products")
    //     .update({
    //       sold_amount: item?.sold_amount + paramItem.amount,
    //       combinations: combinations,
    //     })
    //     .eq("id", item?.id);

    //   if (updateProd.error) throw new Error("Can't update product info");
    // }

    const result = await supabase
      .from("orders")
      .insert({
        address_id: params.address_id,
        order_number: (count?.count || 0) + 1,
        status: "Processing",
        tracking: JSON.stringify([
          {
            status: "Shipped",
            date: null,
          },
          {
            status: "Order Confirmed",
            date: null,
          },
          {
            status: "Order Placed",
            date: new Date(),
          },
        ]),
        total_price: params.total_price,
        total_tax: params.total_tax,
        total_unitprice: params.total_unitprice,
        total_shipping: params.total_shipping,
        total_discount: params.total_discount,
      })
      .select("id")
      .single();

    if (result.error) {
      throw new Error("Can't add order");
    }

    const itemsResult = await supabase.from("order_items").insert(
      params.items.map((item: any) => ({
        ...item,
        order_id: result.data.id,
      }))
    );

    if (itemsResult.error) {
      throw new Error("Can't add cart items to order");
    }

    await supabase.from("cart").delete().eq("user_id", auth.userId);

    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e: any) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

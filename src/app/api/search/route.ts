import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { FilterType } from "@/types/filter";

const PRODUCTS_PER_PAGE = 6;

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);

  try {
    const supabase = await createClient();
    let request = supabase.rpc("get_products_list", undefined, {
      count: "exact",
    });

    //FILTER BY CATEGORY
    if (params.slug) {
      request = request.filter("categories.slug", "eq", params.slug);
    }
    //FILTER BY QUERY
    if (params.q) {
      request = request.ilike("title", `%${params.q}%`);
    }

    //FILTER BY GENDER
    if (params.gender) {
      request = request.eq("gender", params.gender);
    }

    //FILTER BY DEALS ("sale" | "free-shipping")
    if (params.deals) {
      if (params.deals === "free-shipping") {
        request = request.eq("shippingCost", 0);
      }

      if (params.deals === "sale") {
        request = request.gt("discount", 0).order("discount", {
          ascending: false,
        });
      }
    }

    if (params["sort-by"]) {
      //FILTER BY SORT BY ( "price-asc" | "price-desc" | "high-rated" | "new" )
      switch (params["sort-by"] as FilterType["sort-by"]) {
        case "top-selling":
          request = request.order("sold_amount", {
            ascending: false,
          });
          break;
        case "new":
          request = request.order("created_at", { ascending: false });
          break;
        case "high-rated":
          request = request.order("rate", {
            ascending: false,
          });
          break;

        case "price-asc":
          request = request.order("new_price", {
            ascending: true,
          });
          break;

        case "price-desc":
          request = request.order("new_price", {
            ascending: false,
          });
          break;
      }
    }

    if (Number(params.price_min)) {
      request = request.gte("new_price", params.price_min);
    }

    if (Number(params.price_max)) {
      request = request.lte("new_price", params.price_max);
    }

    request = request.range(
      (Number(params.page) - 1) * PRODUCTS_PER_PAGE,
      Number(params.page) * (PRODUCTS_PER_PAGE - 1)
    );

    const response = await request;

    if (response.error) {
      throw new Error("Can't get products by provided filters");
    }

    const totalPages = Math.ceil((response.count || 0) / PRODUCTS_PER_PAGE);

    const result = {
      products: response.data,
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

import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { FilterType } from "@/types/filter";

const PRODUCTS_PER_PAGE = 6;

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);

  try {
    console.log(params);
    const supabase = await createClient();
    let request = supabase
      .from("products")
      .select("*, category:category_id(slug)");

    //FILTER BY CATEGORY
    if (params.slug) {
      request = request.eq("category.slug", params.slug);
    }
    //FILTER BY QUERY ---DONE
    if (params.q) {
      request = request.ilike("title", `%${params.q}%`);
    }

    //FILTER BY GENDER ---DONE
    if (params.gender) {
      request = request.eq("gender", params.gender);
    }

    //FILTER BY DEALS ("sale" | "free-shipping") --DONE
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
    //FILTER BY SORT BY ( "price-asc" | "price-desc" | "high-rated" | "new" )
    if (params["sort-by"]) {
      switch (params["sort-by"] as FilterType["sort-by"]) {
        case "new": //done
          request = request.order("created_at", { ascending: false });
          break;
        case "high-rated": //done
          request = request.order("rate", {
            ascending: false,
          });
          break;

        case "price-asc":
          request = request.order("", {
            ascending: true,
          });
          break;

        case "price-desc":
          request = request.order("", {
            ascending: false,
          });
          break;
      }
    }

    if (params.price_min && params.price_max) {
      if (params.price_min === params.price_max) {
        request = request.eq("price", params.price_min);
      } else
        request = request
          .gte("price", params.price_min)
          .lte("price", params.price_max);
    }

    if (params.price_min && !params.price_max) {
      request = request.gte("price", params.price_min);
    }
    if (params.price_max && params.price_min) {
      request = request.lte("price", params.price_max);
    }

    const totalResponse = await request;

    console.log("REQUEST", request);

    request = request.range(
      (Number(params.page) - 1) * PRODUCTS_PER_PAGE,
      Number(params.page) * (PRODUCTS_PER_PAGE - 1)
    );

    const response = await request;

    if (response.error || response.status !== 200) {
      throw new Error("Can't get products by provided filters");
    }

    const totalPages = Math.ceil(
      (totalResponse.data?.length || 0) / PRODUCTS_PER_PAGE
    );

    const result = {
      products: response.data,
      page: Number(params.page),
      totalPages: totalPages,
      totalCount: totalResponse.data?.length || 0,
      hasNextPage: Number(params.page) + 1 <= totalPages,
      hasPrevPage: Number(params.page) - 1 > 1,
    };

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

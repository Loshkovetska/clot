import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export async function GET(req: NextRequest) {
  try {
    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const supabase = await createClient();

    const result = await supabase
      .from("addresses")
      .select()
      .eq("user_id", auth.userId);

    if (result.error) {
      throw new Error("Can't find user addresses");
    }

    return new NextResponse(JSON.stringify(result.data), { status: 200 });
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

    const result = await supabase
      .from("addresses")
      .insert({
        ...params,
        is_primary: true,
        user_id: auth.userId,
      })
      .select()
      .single();

    if (result.error) {
      throw new Error("Can't add the address");
    }

    await supabase
      .from("addresses")
      .update({ is_primary: false })
      .neq("id", result.data.id);

    return new NextResponse(JSON.stringify(result.data), { status: 200 });
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

    const result = await supabase
      .from("addresses")
      .update(copy)
      .eq("id", params.id)
      .select()
      .single();

    if (result.error) {
      throw new Error("Can't update the address");
    }

    if (params.is_primary) {
      await supabase
        .from("addresses")
        .update({ is_primary: false })
        .neq("id", result.data.id);
    }

    return new NextResponse(JSON.stringify(result.data), { status: 200 });
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

    const result = await supabase
      .from("addresses")
      .delete()
      .eq("id", params.id);

    if (result.error) {
      throw new Error("Can't delete the address");
    }

    const res = await supabase.from("addresses").select().maybeSingle();

    if (res.data) {
      await supabase
        .from("addresses")
        .update({ is_primary: true })
        .eq("id", res.data.id);
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}
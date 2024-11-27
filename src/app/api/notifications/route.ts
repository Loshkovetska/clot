import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export const GET = async (req: NextRequest) => {
  try {
    const supabase = await createClient();

    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const response = await supabase
      .from("notifications")
      .select()
      .eq("user_id", auth.userId);

    if (response.error) throw new Error("Can't get user notifications");

    return new NextResponse(JSON.stringify(response.data), { status: 200 });
  } catch (e: any) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const supabase = await createClient();

    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const headers = {
      headers: {
        Authorization: "Bearer " + process.env.CLERK_SECRET_KEY,
      },
    };

    const clerkUser = await axios.get(
      process.env.CLERK_API + "/users/" + auth.userId,
      headers
    );

    const TEXT = `${clerkUser.data.first_name} ${clerkUser.data.last_name}, you placed and order check your order history for full details`;

    const response = await supabase.from("notifications").insert({
      user_id: auth.userId,
      text: TEXT,
      read: false,
    });

    if (response.error) throw new Error("Can't post user notification");

    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e: any) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
};

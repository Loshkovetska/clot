import { getAuth } from "@clerk/nextjs/server";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      throw new Error("Unauthorized!");
    }

    const clerkUser = await axios.get(
      "https://api.clerk.com/v1/users/" + userId,
      {
        headers: {
          Authorization: "Bearer " + process.env.CLERK_SECRET_KEY,
        },
      }
    );

    const supabase = await createClient();

    const user = await supabase.from("users").insert({
      firstname: clerkUser.data.first_name,
      lastname: clerkUser.data.last_name,
      imageUrl: clerkUser.data.image_url,
      clerk_user_id: clerkUser.data.id,
    });

    if (!user.error || user.status !== 200) {
      throw new Error("Can't add user");
    }
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 401 });
  }
}

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

import createClient from "@/lib/config/supabase";
import { validateUser } from "@/lib/helpers/error-helper";

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createClient();
    const params = await req.json();

    const auth = validateUser(req);
    if (auth instanceof NextResponse) return auth;

    const headers = {
      headers: {
        Authorization: "Bearer " + process.env.CLERK_SECRET_KEY,
      },
    };

    const clerkUser = await axios.patch(
      process.env.CLERK_API + "/users/" + auth.userId,
      {
        first_name: params.firstname,
        last_name: params.lastname,
      },
      headers
    );

    const isEmailPresent = clerkUser.data.email_addresses.find(
      (email: any) => email.email_address === params.email.trim()
    );

    const isPhonePresent = clerkUser.data.phone_numbers.find(
      (phone: any) =>
        phone.phone_number === params.phonenumber.replaceAll(/[-\s+]/g, "")
    );

    if (!isEmailPresent) {
      await axios.post(
        process.env.CLERK_API + "/email_addresses",
        {
          user_id: auth.userId,
          email_address: params.email,
          verified: true,
          primary: true,
        },
        headers
      );
    }
    if (!isPhonePresent && params.phonenumber) {
      await axios.post(
        process.env.CLERK_API + "/phone_numbers",
        {
          user_id: auth.userId,
          phone_number: params.phonenumber,
          verified: true,
          primary: true,
          reserved_for_second_factor: true,
        },
        headers
      );
    }

    const response = await supabase
      .from("users")
      .update({
        firstname: params.firstname,
        lastname: params.lastname,
      })
      .eq("clerk_user_id", auth.userId);

    if (response.error) {
      throw new Error("Can't update user data");
    }
    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 500 });
  }
}

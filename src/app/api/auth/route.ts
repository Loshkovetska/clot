import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";

import createClient from "@/lib/config/supabase";

export async function POST(req: NextRequest) {
  try {
    const wh = new Webhook(process.env.SIGNING_SECRET || "");

    const headerPayload = await headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return new Response("Error: Missing Svix headers", {
        status: 400,
      });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: any;

    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent;
    } catch (err) {
      return new Response("Error: Verification error", {
        status: 400,
      });
    }

    const supabase = await createClient();

    const user = await supabase.from("users").insert({
      firstname: evt.data.first_name,
      lastname: evt.data.last_name,
      imageUrl: evt.data.image_url,
      clerk_user_id: evt.data.id,
    });

    if (!user.error || user.status !== 200) {
      throw new Error("Can't add user");
    }

    return new NextResponse(JSON.stringify("OK"), { status: 200 });
  } catch (e) {
    return new NextResponse(JSON.stringify(e), { status: 401 });
  }
}

import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const validateUser = (req: NextRequest) => {
  const auth = getAuth(req);

  if (!auth.userId) {
    return new NextResponse(JSON.stringify("Unauthorized!"), {
      status: 401,
    });
  }

  return auth;
};

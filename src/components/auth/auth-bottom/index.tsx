import * as Clerk from "@clerk/elements/common";
import Link from "next/link";

import { ROUTES } from "@/lib/constants/routes";

export default function AuthBottom({ isSignIn }: { isSignIn: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">
        {isSignIn ? "Don't h" : "H"}ave an Account?{" "}
        <Clerk.Link
          navigate={isSignIn ? "sign-up" : "sign-in"}
          className="font-medium"
        >
          {isSignIn ? "Create One" : "Sign In"}
        </Clerk.Link>
      </p>
      {isSignIn && (
        <p className="text-sm">
          Forgot Password?{" "}
          <Link
            href={ROUTES.resetPassword}
            className="font-medium"
          >
            Reset
          </Link>
        </p>
      )}
    </div>
  );
}

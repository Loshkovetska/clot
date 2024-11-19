"use client";
import AuthForm from "@/components/auth/auth-form";
import SocialConnect from "@/components/auth/social-connect";
import BackButton from "@/components/common/buttons/back-button";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import * as SignUp from "@clerk/elements/sign-up";

import Link from "next/link";

export default function AuthWrapper({
  type = "sign-in",
}: {
  type?: "sign-in" | "sign-up" | "password-reset";
}) {
  const isSignIn = type === "sign-in";
  const isReset = type === "password-reset";
  const Component = isSignIn ? SignIn : SignUp;
  const TITLE = isSignIn
    ? "Sign in"
    : isReset
      ? "Forgot Password"
      : "Create Account";

  return (
    <Component.Root>
      <Component.Step
        name="start"
        className={cn(
          "max-w-[500px] w-full flex flex-col items-center px-6 mx-auto",
          isSignIn ? "pt-[120px]" : "pt-16"
        )}
      >
        {!isSignIn && <BackButton />}
        <h1 className="text-black-100 dark:text-white mb-8 text-3xl self-start">
          {TITLE}
        </h1>

        <div className="w-full flex flex-col gap-4">
          <AuthForm type={type} />
          <Component.Action
            submit
            className={cn(
              buttonVariants(),
              "rounded-2xl",
              isReset ? "mt-2" : !isReset && !isSignIn ? "mt-6" : ""
            )}
          >
            Continue
          </Component.Action>
          {!isReset && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-black-100 dark:text-white">
                {isSignIn ? "Don't h" : "H"}ave an Account?{" "}
                <Clerk.Link
                  navigate={isSignIn ? "sign-up" : "sign-in"}
                  className="font-medium text-black-100 dark:text-white"
                >
                  {isSignIn ? "Create One" : "Sign In"}
                </Clerk.Link>
              </p>
              {isSignIn && (
                <p className="text-sm text-black-100 dark:text-white">
                  Forgot Password?{" "}
                  <Link
                    href={ROUTES.resetPassword}
                    className="font-medium text-black-100 dark:text-white"
                  >
                    Reset
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>

        <SocialConnect />
      </Component.Step>
    </Component.Root>
  );
}

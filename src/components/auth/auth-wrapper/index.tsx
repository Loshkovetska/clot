"use client";
import * as SignIn from "@clerk/elements/sign-in";
import * as SignUp from "@clerk/elements/sign-up";

import AuthBottom from "@/components/auth/auth-bottom";
import AuthForm from "@/components/auth/auth-form";
import SocialConnect from "@/components/auth/social-connect";
import BackButton from "@/components/common/buttons/back-button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          isSignIn ? "py-[120px]" : "py-16"
        )}
      >
        {!isSignIn && <BackButton />}
        <h1 className="mb-8 self-start text-2xl font-bold">{TITLE}</h1>

        <div className="flex w-full flex-col gap-4">
          <AuthForm type={type} />
          <Component.Action
            submit
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "rounded-[100px]",
              isReset ? "mt-2" : !isReset && !isSignIn ? "mt-6" : ""
            )}
          >
            Continue
          </Component.Action>
          {!isReset && <AuthBottom isSignIn={isSignIn} />}
        </div>
        <SocialConnect />
      </Component.Step>
    </Component.Root>
  );
}

import ResetPasswordForm from "@/components/forms/clerk-forms/reset-pass-form";
import SignInForm from "@/components/forms/clerk-forms/sign-in-form";
import SignUpForm from "@/components/forms/clerk-forms/sign-up-form";

export default function AuthForm({
  type,
}: {
  type: "sign-in" | "sign-up" | "password-reset";
}) {
  switch (type) {
    case "sign-in":
      return <SignInForm />;
    case "sign-up":
      return <SignUpForm />;
    case "password-reset":
      return <ResetPasswordForm />;
    default:
      return null;
  }
}

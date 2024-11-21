import ClerkInput from "@/components/common/forms/clerk-input";

export default function ResetPasswordForm() {
  return (
    <ClerkInput
      name="emailAddress"
      type="email"
      placeholder="Enter Email Address"
    />
  );
}

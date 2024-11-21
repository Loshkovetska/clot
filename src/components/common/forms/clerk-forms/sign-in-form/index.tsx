import ClerkInput from "@/components/common/forms/clerk-input";

export default function SignInForm() {
  return (
    <>
      <ClerkInput
        name="emailAddress"
        type="email"
        placeholder="Email Address"
      />
      <ClerkInput
        name="password"
        type="password"
        placeholder="Password"
      />
    </>
  );
}

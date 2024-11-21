import SignInForm from "@/components/common/forms/clerk-forms/sign-in-form";
import ClerkInput from "@/components/common/forms/clerk-input";

export default function SignUpForm() {
  return (
    <>
      <ClerkInput
        name="firstName"
        placeholder="FirstName"
      />
      <ClerkInput
        name="lastName"
        placeholder="LastName"
      />
      <SignInForm />
    </>
  );
}

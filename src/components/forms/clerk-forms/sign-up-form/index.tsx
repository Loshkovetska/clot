import SignInForm from "@/components/forms/clerk-forms/sign-in-form";
import ClerkInput from "@/components/forms/clerk-input";

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

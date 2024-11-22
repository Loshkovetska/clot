import * as Clerk from "@clerk/elements/common";

type ClerkInputPropType = {
  name: string;
  type?: "email" | "password";
  placeholder: string;
};

export default function ClerkInput({
  name,
  type,
  placeholder,
}: ClerkInputPropType) {
  return (
    <Clerk.Field name={name}>
      <Clerk.Input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg bg-light-100 px-3 py-4 dark:bg-dark-100"
      />
      <Clerk.FieldError className="mt-1 flex text-destructive" />
    </Clerk.Field>
  );
}

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
        className="bg-light-100 dark:bg-dark-100 px-3 py-4 w-full rounded-md"
      />
      <Clerk.FieldError className="text-destructive mt-1 flex" />
    </Clerk.Field>
  );
}

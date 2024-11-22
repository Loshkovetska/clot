import { SignOutButton } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function ProfileSignOut() {
  return (
    <SignOutButton
      signOutOptions={{
        redirectUrl: "/",
      }}
    >
      <Button
        className="mx-auto font-bold text-destructive"
        variant="transparent"
      >
        Sign Out
      </Button>
    </SignOutButton>
  );
}

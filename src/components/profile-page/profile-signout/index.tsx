import { useClerk } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export default function ProfileSignOut() {
  const { signOut } = useClerk();
  return (
    <Button
      className="mx-auto font-bold text-destructive"
      variant="transparent"
      onClick={() =>
        signOut({
          redirectUrl: "/",
        })
      }
    >
      Sign Out
    </Button>
  );
}

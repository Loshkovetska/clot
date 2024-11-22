import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { ChevronLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BackButton({
  className,
  action,
}: {
  className?: string;
  action?: () => void;
}) {
  const router = useRouter();

  const goBack = useCallback(() => router.back(), [router]);
  return (
    <Button
      onClick={action ?? goBack}
      variant="light"
      size="icon"
      className={cn("self-start mb-5", className)}
    >
      <ChevronLeftIcon />
    </Button>
  );
}

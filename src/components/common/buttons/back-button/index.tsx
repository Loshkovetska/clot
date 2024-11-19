import ChevronLeftIcon from "@/components/icons/chevron";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();

  const goBack = useCallback(() => router.back(), []);
  return (
    <Button
      onClick={goBack}
      variant="light"
      size="icon"
      className={cn("self-start mb-5", className)}
    >
      <ChevronLeftIcon />
    </Button>
  );
}

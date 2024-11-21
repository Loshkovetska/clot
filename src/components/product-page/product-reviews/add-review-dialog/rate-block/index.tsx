import { StarIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export default function RateBlock({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) {
  const stars = Array(5).fill("star");

  return (
    <div className="flex items-center gap-3 justify-center">
      {stars.map((_, ind) => (
        <Button
          key={ind}
          variant="transparent"
          onClick={() => onChange(ind + 1)}
        >
          <StarIcon
            className="size-10 transition-all duration-300"
            fill={value >= ind + 1 ? "#8E6CEF" : undefined}
          />
        </Button>
      ))}
    </div>
  );
}

import { CustomIconType } from "@/types/custom-icon";

export function CheckIcon(props: CustomIconType) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 12.1515L8.81818 16.8182L19 6.63635"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

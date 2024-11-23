import { CustomIconType } from "@/types/custom-icon";

export function PlusIcon(props: CustomIconType) {
  return (
    <svg
      width="12"
      height="13"
      viewBox="0 0 12 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 9.5V3.5M8 6.5H9M3 6.5H5.83"
        stroke="#F4F4F4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

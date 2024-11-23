import { CustomIconType } from "@/types/custom-icon";

export function SearchIcon(props: CustomIconType) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_0_396)">
        <path
          d="M7.66683 1.33325C11.1668 1.33325 14.0002 4.16659 14.0002 7.66658C14.0002 11.1666 11.1668 13.9999 7.66683 13.9999C4.16683 13.9999 1.3335 11.1666 1.3335 7.66658C1.3335 5.19992 2.74016 3.06659 4.80016 2.01992M14.6668 14.6666L13.3335 13.3333"
          stroke="#272727"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_396">
          <rect
            width="16"
            height="16"
            fill="white"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

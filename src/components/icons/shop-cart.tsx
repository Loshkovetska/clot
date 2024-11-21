export default function ShoppingCartIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M4.99988 5.11324V4.46658C4.99988 2.96658 6.20655 1.49324 7.70655 1.35324C8.12333 1.31229 8.54407 1.35906 8.94169 1.49053C9.33931 1.62201 9.70499 1.83527 10.0152 2.11661C10.3254 2.39794 10.5733 2.74111 10.7429 3.12402C10.9125 3.50694 11 3.92112 10.9999 4.33991V5.25991M2.53988 11.0399L2.69322 12.2866C2.83988 13.5932 3.31988 14.6666 5.99988 14.6666H9.99988C12.6799 14.6666 13.1599 13.5932 13.2999 12.2866L13.7999 8.28658C13.9799 6.65991 13.5132 5.33324 10.6666 5.33324H5.33322C2.48655 5.33324 2.01988 6.65991 2.19988 8.28658"
        stroke="white"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3302 8H10.3362M5.66357 8H5.66891"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

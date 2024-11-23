import { CustomIconType } from "@/types/custom-icon";

export function FilterIcon(props: CustomIconType) {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.3999 1.90137C13.1333 1.90137 13.7333 2.50137 13.7333 3.2347V4.70137C13.7333 5.2347 13.3999 5.90137 13.0666 6.2347L10.1999 8.76803C9.79993 9.10137 9.53327 9.76803 9.53327 10.3014V13.168C9.53327 13.568 9.2666 14.1014 8.93327 14.3014L7.99994 14.9014C7.13327 15.4347 5.93327 14.8347 5.93327 13.768V10.2347C5.93327 9.76803 5.6666 9.16803 5.39994 8.8347L2.8666 6.16803C2.53327 5.8347 2.2666 5.2347 2.2666 4.8347V3.30137C2.2666 2.50137 2.8666 1.90137 3.59993 1.90137H9.59994M7.2866 1.90137L3.99993 7.16803"
        stroke="cure"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

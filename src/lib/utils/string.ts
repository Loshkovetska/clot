export const formatePhoneNumber = (str: string) => {
  return str.replace(/(\d{3})-(\d{3})-(\d{4})/, "$1-$2-$3");
};

export const initials = (fname?: string | null, lname?: string | null) =>
  `${fname?.[0] || ""}${lname?.[0] || ""}`;

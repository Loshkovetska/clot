export const formatePhoneNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  return !match ? value : `${match[1]}-${match[2]}-${match[3]}`;
};

export const formateCardNumber = (value: string) => {
  const cleaned = value.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{4})(\d{4})?(\d{4})?(\d{4})?$/);

  if (!match) return value.trim().slice(0, 19);

  return match
    .slice(1, 5)
    .filter((s) => s)
    .join("-");
};

export const formateExpiredDate = (value: string) => {
  const limitedValue = value.trim().replace("/", "").slice(0, 4);
  const month = Number(limitedValue.slice(0, 2));

  if (month > 12) return 12;

  return limitedValue.length > 1
    ? `${limitedValue.slice(0, 2)}/${limitedValue.slice(2)}`
    : limitedValue;
};

export const handleInputValue = (value: string, type: "string" | "number") => {
  const isNumeric = typeof Number(value.replaceAll(/[-\/]/g, "")) === "number";
  const isNumberInside = /\d+/g.test(value);

  return (
    !value.length ||
    (isNumeric && type === "number") ||
    (!isNumberInside && type === "string")
  );
};

export const formateCCV = (value: string) =>
  value.replaceAll(/[-/]/g, "").trim().slice(0, 4);

export const initials = (fname?: string | null, lname?: string | null) =>
  `${fname?.[0] || ""}${lname?.[0] || ""}`;

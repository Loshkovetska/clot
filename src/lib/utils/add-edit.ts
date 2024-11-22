import {
  ADDRESS_FIELDS,
  CARD_FIELDS,
  PROFILE_FIELDS,
} from "@/lib/constants/add-edit-dialog";
import { addressScheme, cardScheme, profileInfoScheme } from "@/lib/scheme";

export const generateAEConstants = (
  type: "address" | "card" | "profile",
  action: "add" | "edit"
) => {
  const SUBTITLE =
    type === "address"
      ? "Address"
      : type === "card"
        ? "Payment Card"
        : "Main Info";
  const TITLE = `${action[0].toUpperCase()}${action.slice(1)} ${SUBTITLE}`;

  const scheme =
    type === "address"
      ? addressScheme
      : type === "card"
        ? cardScheme
        : profileInfoScheme;

  const defaultFields =
    type === "address"
      ? ADDRESS_FIELDS
      : type === "card"
        ? CARD_FIELDS
        : PROFILE_FIELDS;

  return { TITLE, scheme, defaultFields };
};

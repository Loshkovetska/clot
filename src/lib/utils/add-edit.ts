import { QueryClient } from "@tanstack/react-query";

import {
  ADDRESS_FIELDS,
  CARD_FIELDS,
  PROFILE_FIELDS,
} from "@/lib/constants/add-edit-dialog";
import { addressScheme, cardScheme, profileInfoScheme } from "@/lib/scheme";
import { AddressType } from "@/types/address";
import { PaymentCardType } from "@/types/card";

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

export const setQueryData = (
  queryClient: QueryClient,
  queryKey: string,
  action: "add" | "update" | "delete",
  data?: PaymentCardType | AddressType,
  vars?: PaymentCardType | AddressType | string
) => {
  if (action === "add") {
    queryClient.setQueryData(
      [queryKey],
      (oldData: Array<PaymentCardType | AddressType>) => [
        ...oldData
          .filter((dt) => dt.id !== data?.id)
          .map((item: PaymentCardType | AddressType) => ({
            ...item,
            is_primary: false,
          })),
        data,
      ]
    );
  }

  if (action === "update") {
    queryClient.setQueryData(
      [queryKey],
      (oldData: Array<PaymentCardType | AddressType>) =>
        oldData.map((item) => {
          if (item.id === (vars as PaymentCardType | AddressType).id)
            return data;
          return {
            ...item,
            is_primary: !(vars as PaymentCardType | AddressType).is_primary,
          };
        })
    );
  }

  if (action === "delete") {
    queryClient.setQueryData(
      [queryKey],
      (oldData: Array<PaymentCardType | AddressType>) =>
        oldData
          .filter((card) => card.id !== vars)
          .map((card, ind) => {
            return {
              ...card,
              is_primary: !ind,
            };
          })
    );
  }
};

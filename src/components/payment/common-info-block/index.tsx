import React, { useMemo } from "react";

import { ChevronLeftIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { RadioGroupItem } from "@/components/ui/radiogroup";
import { CARD_TYPES } from "@/lib/constants/cardtypes";
import { getPaymentCardOutput } from "@/lib/utils/card";
import { AddressType } from "@/types/address";
import { PaymentCardType } from "@/types/card";

type CommonInfoBlockPropType = {
  type: "address" | "card";
  variant: "profile" | "payment";
  item: AddressType | PaymentCardType;
  onUpdate?: () => void;
  onDelete?: () => void;
};

export default function CommonInfoBlock({
  type,
  item,
  variant,
  onUpdate,
  onDelete,
}: CommonInfoBlockPropType) {
  const cardData = useMemo(
    () =>
      "card_number" in item ? getPaymentCardOutput(item.card_number) : null,
    [item]
  );

  const cardTypeImage = useMemo(
    () => (cardData ? CARD_TYPES[cardData.cardType as "Visa"] : null),
    [cardData]
  );
  return (
    <div className="flex w-full items-center gap-4 rounded-lg bg-light-100 p-3">
      {variant === "profile" && <RadioGroupItem value={item.id} />}
      <div className="flex grow flex-col items-start gap-1">
        {variant === "payment" && (
          <span className="text-sm text-black-50">
            {type === "address" ? "Shipping Address" : "Payment Card"}
          </span>
        )}
        {type === "address" && "street" in item && (
          <span className="line-clamp-1 text-sm">
            {item?.street}, {item?.city}, {item?.state},{item?.post_code}
          </span>
        )}
        {type === "card" && (
          <div className="flex items-center gap-1">
            {cardData?.securedCardNumber}{" "}
            {cardTypeImage &&
              React.cloneElement(cardTypeImage, {
                className: "size-6",
              })}
          </div>
        )}
        {variant === "profile" && (
          <div className="flex w-full items-center justify-end gap-1">
            <Button
              size="sm"
              className="h-6"
              variant="outline"
              onClick={onUpdate}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-6 text-destructive"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
      {variant === "payment" && (
        <div className="flex -rotate-90 items-center justify-center">
          <ChevronLeftIcon />
        </div>
      )}
    </div>
  );
}

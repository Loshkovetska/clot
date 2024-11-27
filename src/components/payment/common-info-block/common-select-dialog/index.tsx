import React, { useCallback, useMemo } from "react";

import CommonInfoBlock from "@/components/payment/common-info-block";
import MobileDialog from "@/components/ui/mobile-dialog";
import { RadioGroup } from "@/components/ui/radiogroup";
import { useAddress } from "@/lib/hooks/useAddress";
import { usePaymentCard } from "@/lib/hooks/usePaymentCard";

type CommonSelectDialogPropType = {
  trigger: React.ReactNode;
  type: "card" | "address";
};

export default function CommonSelectDialog({
  trigger,
  type,
}: CommonSelectDialogPropType) {
  const { addresses, selectedAddress, updateAddress } = useAddress({
    enabled: false,
  });

  const { cards, selectedCard, updateCard } = usePaymentCard({
    enabled: false,
  });

  const data = useMemo(
    () => (type === "address" ? addresses : cards),
    [type, addresses, cards]
  );

  const selectedItem = useMemo(
    () => (type === "address" ? selectedAddress : selectedCard),
    [type, selectedAddress, selectedCard]
  );

  const onItemSelect = useCallback(
    (id: string) => {
      type === "address"
        ? updateAddress({ id, is_primary: true })
        : updateCard({ id, is_primary: true });
    },
    [type, updateAddress, updateCard]
  );

  const TITLE = type === "address" ? "Addresses" : "Payment Cards";

  return (
    <MobileDialog
      trigger={trigger}
      title={TITLE}
    >
      <RadioGroup
        value={selectedItem?.id}
        onValueChange={onItemSelect}
      >
        <div className="flex flex-col gap-3">
          {data?.map((item) => (
            <CommonInfoBlock
              key={item.id}
              variant="profile"
              item={item}
              type={type}
            />
          ))}
        </div>
      </RadioGroup>
    </MobileDialog>
  );
}

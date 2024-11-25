import { useCallback, useState } from "react";

import AddEditDialog from "@/components/common/add-edit-dialog";
import EmptyList from "@/components/common/empty-list";
import CommonInfoBlock from "@/components/payment/common-info-block";
import ProfileWrapper from "@/components/profile-page/profile-wrapper";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radiogroup";
import { AddressType } from "@/types/address";
import { PaymentCardType } from "@/types/card";

type AddressCardsContentPropType = {
  type: "card" | "address";
  data: Array<AddressType | PaymentCardType>;
  isLoading: boolean;
  selectedItem?: AddressType | PaymentCardType;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function AddressCardsContent({
  type,
  isLoading,
  data,
  selectedItem,
  onSelect,
  onDelete,
}: AddressCardsContentPropType) {
  const [isOpen, setOpen] = useState<"add" | "edit" | null>(null);
  const [itemToEdit, setItemToEdit] = useState<
    AddressType | PaymentCardType | null
  >(null);

  const handleDialogClose = useCallback(() => {
    setOpen(null);
    setItemToEdit(null);
  }, []);

  const handleOnUpdate = useCallback((item: AddressType | PaymentCardType) => {
    setOpen("edit");
    setItemToEdit(item);
  }, []);
  return (
    <>
      <ProfileWrapper title={type === "address" ? "Address" : "Payment"}>
        {!isLoading && !data?.length && (
          <EmptyList
            type={type}
            className="pt-16"
            buttonAction={() => setOpen("add")}
          />
        )}
        {data.length > 0 && (
          <RadioGroup
            value={selectedItem?.id}
            onValueChange={onSelect}
          >
            {data?.map((item) => (
              <CommonInfoBlock
                key={item.id}
                type={type}
                item={item}
                variant="profile"
                onDelete={() => onDelete(item.id)}
                onUpdate={() => handleOnUpdate(item)}
              />
            ))}
          </RadioGroup>
        )}

        {!!data.length && data.length < 5 && (
          <Button
            className="mt-2"
            onClick={() => setOpen("add")}
          >
            Add New {type === "address" ? "Address" : "Card"}
          </Button>
        )}
      </ProfileWrapper>
      <AddEditDialog
        action={isOpen || undefined}
        type={type}
        open={!!isOpen}
        onOpenChange={handleDialogClose}
        defaultValues={itemToEdit}
      />
    </>
  );
}

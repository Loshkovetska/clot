import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import AddressForm from "@/components/common/forms/address-form";
import PaymentCardForm from "@/components/common/forms/payment-card-form";
import ProfileInfoForm from "@/components/common/forms/profile-info-form";
import ScreenDialog from "@/components/common/screen-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAddress } from "@/lib/hooks/useAddress";
import { usePaymentCard } from "@/lib/hooks/usePaymentCard";
import { generateAEConstants } from "@/lib/utils/add-edit";
import { UpdateUserParams } from "@/lib/utils/user";
import UserService from "@/services/user.service";
import {
  AddressFormType,
  CardFormType,
  MainInfoFormType,
} from "@/types/add-edit-dialog";

type AddEditDialogPropType = {
  type: "address" | "profile" | "card";
  action?: "add" | "edit";
  trigger?: ReactNode;
  defaultValues?: any;
  open?: boolean;
  onOpenChange?: () => void;
  onSuccess?: () => void;
};

export default function AddEditDialog({
  type,
  action = "edit",
  trigger,
  defaultValues,
  open,
  onOpenChange,
  onSuccess,
}: AddEditDialogPropType) {
  const [isOpen, setOpen] = useState(false);

  const { defaultFields, scheme, TITLE } = useMemo(
    () => generateAEConstants(type, action),
    [type, action]
  );

  const form = useForm({
    defaultValues: {
      ...defaultFields,
    },
    resolver: zodResolver(scheme),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { formState } = form;

  const { addCard, updateCard, addCardPending, updateCardPending } =
    usePaymentCard({
      enabled: false,
      onAddSuccess: () => handleDialogState(false),
      onUpdateSuccess: () => handleDialogState(false),
    });

  const { updateAddress, addAddress, addAddressPending, updateAddressPending } =
    useAddress({
      enabled: false,
      onAddSuccess: () => handleDialogState(false),
      onUpdateSuccess: () => handleDialogState(false),
    });

  const { mutate: updateUser, isPending: isUserPending } = useMutation({
    mutationFn: (params: UpdateUserParams) => UserService.updateUser(params),
    onSuccess: () => {
      toast.success("Profile was successfully updated!");
      onSuccess?.();
      handleDialogState(false);
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const onSubmit = useCallback(
    (values: any) => {
      if (type === "profile") {
        updateUser(values);
      }

      if (type === "card") {
        const [month, year] = values["expired_date"].split("/");
        const today = new Date();
        const expiredDate = new Date(Number("20" + year), Number(month) - 1, 1);

        if (expiredDate.getTime() < today.getTime()) {
          form.setError("expired_date", {
            message: "Invalid Expired date",
          });
          return;
        }
        form.clearErrors("expired_date");
        (action === "add" ? addCard : updateCard)({
          ...defaultValues,
          ...values,
        });
      }

      if (type === "address") {
        (action === "add" ? addAddress : updateAddress)({
          ...defaultValues,
          ...values,
        });
      }
    },
    [
      type,
      action,
      form,
      defaultValues,
      updateUser,
      addCard,
      updateCard,
      addAddress,
      updateAddress,
    ]
  );

  const isLoading = useMemo(
    () =>
      isUserPending ||
      addCardPending ||
      updateCardPending ||
      addAddressPending ||
      updateAddressPending,
    [
      isUserPending,
      addCardPending,
      updateCardPending,
      addAddressPending,
      updateAddressPending,
    ]
  );

  function handleDialogState(flag: boolean) {
    !flag && onOpenChange?.();
    setOpen(flag);
    !flag && form.reset(defaultFields);
  }

  useEffect(() => {
    (open || isOpen) && form.reset(defaultValues || {});
  }, [open, isOpen, defaultValues, form]);

  return (
    <ScreenDialog
      open={open || isOpen}
      onOpenChange={handleDialogState}
      trigger={trigger}
      title={TITLE}
      buttonsBlock={
        <Button
          className="w-full"
          size="lg"
          disabled={!formState.isValid || !formState.isDirty || isLoading}
          loading={isLoading}
          onClick={form.handleSubmit(onSubmit)}
        >
          {action === "add" ? "Confirm" : "Save"}
        </Button>
      }
    >
      <Form {...form}>
        <div className="mx-auto flex w-full max-w-[550px] flex-col gap-6">
          {type === "profile" && (
            <ProfileInfoForm form={form as MainInfoFormType} />
          )}
          {type === "address" && <AddressForm form={form as AddressFormType} />}
          {type === "card" && <PaymentCardForm form={form as CardFormType} />}
        </div>
      </Form>
    </ScreenDialog>
  );
}

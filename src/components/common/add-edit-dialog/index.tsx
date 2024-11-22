import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import AddressForm from "@/components/common/forms/address-form";
import PaymentCardForm from "@/components/common/forms/payment-card-form";
import ProfileInfoForm from "@/components/common/forms/profile-info-form";
import ScreenDialog from "@/components/common/screen-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { generateAEConstants } from "@/lib/utils/add-edit";

type AddEditDialogPropType = {
  type: "address" | "profile" | "card";
  action?: "add" | "edit";
  trigger: ReactNode;
  defaultValues?: any;
};

export default function AddEditDialog({
  type,
  action = "edit",
  trigger,
  defaultValues,
}: AddEditDialogPropType) {
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
  });

  const onSubmit = useCallback((values: any) => {}, []);

  useEffect(() => {
    defaultValues && form.reset(defaultValues);
  }, [form, defaultValues]);

  return (
    <ScreenDialog
      trigger={trigger}
      title={TITLE}
      buttonsBlock={
        <Button
          className="w-full"
          size="lg"
          disabled={!form.formState.isValid}
          onClick={form.handleSubmit(onSubmit)}
        >
          {action === "add" ? "Confirm" : "Save"}
        </Button>
      }
    >
      <Form {...form}>
        <div className="flex w-full flex-col gap-3">
          {type === "profile" && <ProfileInfoForm form={form} />}
          {type === "address" && <AddressForm form={form} />}
          {type === "card" && <PaymentCardForm form={form} />}
        </div>
      </Form>
    </ScreenDialog>
  );
}

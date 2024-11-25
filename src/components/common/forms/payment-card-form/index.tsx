import { FormElement } from "@/components/ui/form";
import { AddEditDialogFormType } from "@/types/add-edit-dialog";

export default function PaymentCardForm({ form }: AddEditDialogFormType) {
  return (
    <>
      <FormElement
        form={form}
        name="card_number"
        placeholder="Card Number"
        type="number"
      />
      <div className="flex w-full items-center gap-5">
        <FormElement
          form={form}
          name="ccv"
          placeholder="CCV"
          type="number"
          itemClassName="grow"
        />
        <FormElement
          form={form}
          name="expired_date"
          placeholder="Exp"
          type="number"
          itemClassName="grow"
        />
      </div>
      <FormElement
        form={form}
        name="cardholder_name"
        placeholder="Cardholder Name"
        type="string"
      />
    </>
  );
}

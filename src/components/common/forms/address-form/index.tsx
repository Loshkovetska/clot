import { FormElement } from "@/components/ui/form";
import { AddEditDialogFormType } from "@/types/add-edit-dialog";

export default function AddressForm({ form }: AddEditDialogFormType) {
  return (
    <>
      <FormElement
        form={form}
        name="street"
        placeholder="Street Address"
      />
      <FormElement
        form={form}
        name="city"
        placeholder="City"
        type="string"
      />
      <div className="flex w-full items-center gap-5">
        <FormElement
          form={form}
          name="state"
          placeholder="State"
          itemClassName="grow"
          type="string"
        />
        <FormElement
          form={form}
          name="post_code"
          placeholder="Zip Code"
          itemClassName="grow"
        />
      </div>
    </>
  );
}

import { FormElement } from "@/components/ui/form";
import { AddEditDialogFormType } from "@/types/add-edit-dialog";

export default function ProfileInfoForm({ form }: AddEditDialogFormType) {
  return (
    <>
      <div className="flex w-full items-center gap-4">
        <FormElement
          form={form}
          name="firstname"
          itemClassName="grow"
          placeholder="Firstname"
          type="string"
        />
        <FormElement
          form={form}
          name="lastname"
          itemClassName="grow"
          placeholder="Lastname"
          type="string"
        />
      </div>
      <FormElement
        form={form}
        name="email"
        placeholder="Email"
        type="string"
        disabled
      />
      <FormElement
        form={form}
        name="phonenumber"
        placeholder="Phone number"
        type="number"
      />
    </>
  );
}

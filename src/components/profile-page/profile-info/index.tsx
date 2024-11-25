import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

import AddEditDialog from "@/components/common/add-edit-dialog";
import { Button } from "@/components/ui/button";

export default function ProfileInfo() {
  const { user } = useUser();

  const primaryAddress = useMemo(
    () => user?.emailAddresses.find((email) => email.emailAddress),
    [user]
  );

  const primaryPhone = useMemo(
    () => user?.phoneNumbers.find((phone) => phone.phoneNumber),
    [user]
  );

  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-light-100 px-4 py-3">
      <div className="flex max-w-[80%] grow flex-col gap-2">
        <span className="text-md font-bold">
          {user?.firstName} {user?.lastName}
        </span>
        <span className="text-md text-black-50">
          {primaryAddress?.emailAddress}
        </span>
        {primaryPhone?.phoneNumber && (
          <span className="text-md text-black-50">
            {primaryPhone?.phoneNumber}
          </span>
        )}
      </div>
      <AddEditDialog
        type="profile"
        defaultValues={{
          firstname: user?.firstName || "",
          lastname: user?.lastName || "",
          email: primaryAddress?.emailAddress,
          phonenumber: primaryPhone?.phoneNumber,
        }}
        trigger={
          <Button
            variant="transparent"
            className="text-sm text-primary"
          >
            Edit
          </Button>
        }
        onSuccess={() => user?.reload()}
      />
    </div>
  );
}

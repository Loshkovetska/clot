import { useUser } from "@clerk/nextjs";

import AddEditDialog from "@/components/common/add-edit-dialog";
import { Button } from "@/components/ui/button";

export default function ProfileInfo() {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-light-100 px-4 py-3">
      <div className="flex max-w-[80%] grow flex-col gap-2">
        <span className="text-md font-bold">
          {user?.firstName} {user?.lastName}
        </span>
        <span className="text-md text-black-50">
          {user?.emailAddresses?.[0]?.emailAddress}
        </span>
        {user?.phoneNumbers?.[0]?.phoneNumber && (
          <span className="text-md text-black-50">
            {user?.phoneNumbers?.[0]?.phoneNumber}
          </span>
        )}
      </div>
      <AddEditDialog
        type="profile"
        defaultValues={{
          firstname: user?.firstName || "",
          lastname: user?.lastName || "",
          email: user?.emailAddresses?.[0]?.emailAddress,
          phonenumber: user?.phoneNumbers?.[0]?.phoneNumber,
        }}
        trigger={
          <Button
            variant="transparent"
            className="text-sm text-primary"
          >
            Edit
          </Button>
        }
      />
    </div>
  );
}

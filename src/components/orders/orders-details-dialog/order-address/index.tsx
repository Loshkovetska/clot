import { useUser } from "@clerk/nextjs";

import { getFullAddress } from "@/lib/utils/string";
import { AddressType } from "@/types/address";

export default function OrderAddress({ address }: { address: AddressType }) {
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-4">
      <span className="text-md font-bold">Order Items</span>
      <div className="flex w-full flex-col gap-1 rounded-lg bg-light-100 px-3 py-4">
        <span>{getFullAddress(address)}</span>
        {user?.phoneNumbers?.[0]?.phoneNumber && (
          <span>{user?.phoneNumbers?.[0]?.phoneNumber}</span>
        )}
      </div>
    </div>
  );
}

"use client";

import AddressCardsContent from "@/components/address-cards-content";
import { useAddress } from "@/lib/hooks/useAddress";

export default function AddressesContent() {
  const {
    addresses,
    isLoading,
    selectedAddress,
    updateAddress,
    deleteAddress,
  } = useAddress({
    enabled: true,
  });

  return (
    <AddressCardsContent
      type="address"
      data={addresses || []}
      isLoading={isLoading}
      selectedItem={selectedAddress}
      onSelect={(id) => updateAddress({ id, is_primary: true })}
      onDelete={deleteAddress}
    />
  );
}

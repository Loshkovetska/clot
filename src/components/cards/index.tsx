"use client";

import AddressCardsContent from "@/components/address-cards-content";
import { usePaymentCard } from "@/lib/hooks/usePaymentCard";

export default function CardsContent() {
  const { cards, isLoading, selectedCard, updateCard, deleteCard } =
    usePaymentCard({ enabled: true });

  return (
    <AddressCardsContent
      type="card"
      data={cards || []}
      isLoading={isLoading}
      selectedItem={selectedCard}
      onSelect={(id) => updateCard({ id, is_primary: true })}
      onDelete={deleteCard}
    />
  );
}

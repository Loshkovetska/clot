import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { setQueryData } from "@/lib/utils/add-edit";
import PaymentCardService from "@/services/payment-card.service";
import { PaymentCardType } from "@/types/card";

type usePaymentCardParams = {
  enabled?: boolean;
  onAddSuccess?: () => void;
  onUpdateSuccess?: () => void;
};

export const usePaymentCard = ({
  enabled,
  onAddSuccess,
  onUpdateSuccess,
}: usePaymentCardParams) => {
  const queryClient = useQueryClient();

  const { data: cards, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CARDS],
    queryFn: () => PaymentCardService.getCards(),
    enabled,
  });

  const { mutate: addCard, isPending: addCardPending } = useMutation({
    mutationFn: (params: Partial<PaymentCardType>) =>
      PaymentCardService.addCard(params),
    onSuccess: (data) => {
      queryClient.setQueryData(
        [QUERY_KEYS.CARDS],
        (oldData: PaymentCardType[]) => [...oldData, data]
      );
      setQueryData(queryClient, QUERY_KEYS.CARDS, "add", data);
      toast.success("Payment card was successfully added.");
      onAddSuccess?.();
    },
    onError: () => toast.error("Something went wrong"),
  });

  const { mutate: updateCard, isPending: updateCardPending } = useMutation({
    mutationFn: (params: Partial<PaymentCardType>) =>
      PaymentCardService.updateCard(params),
    onSuccess: (data, vars) => {
      setQueryData(
        queryClient,
        QUERY_KEYS.CARDS,
        "update",
        data,
        vars as PaymentCardType
      );
      toast.success("Payment card was successfully updated.");
      onUpdateSuccess?.();
    },
    onError: () => toast.error("Something went wrong"),
  });

  const { mutate: deleteCard, isPending: deleteCardPending } = useMutation({
    mutationFn: (params: string) => PaymentCardService.deleteCard(params),
    onSuccess: (_, vars) => {
      setQueryData(queryClient, QUERY_KEYS.CARDS, "delete", undefined, vars);
      toast.success("Payment card was successfully deleted.");
    },
    onError: () => toast.error("Something went wrong"),
  });

  const selectedCard = useMemo(
    () => cards?.find((card) => card.is_primary),
    [cards]
  );

  return {
    cards,
    selectedCard,
    isLoading,
    addCardPending,
    updateCardPending,
    deleteCardPending,
    addCard,
    updateCard,
    deleteCard,
  };
};

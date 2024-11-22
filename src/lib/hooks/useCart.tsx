import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { getCartSummary } from "@/lib/utils/cart";
import CartService from "@/services/cart.service";
import { DeleteCartParams, UpdateCartParams } from "@/types/cart";

const useCart = (enabled = true) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: () => CartService.getCart(),
    enabled,
  });

  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: (params: UpdateCartParams) => CartService.updateCart(params),
    onSuccess: () => {
      toast.success("Cart was successfully updated");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
    },
  });

  const { mutate: deleteCartItems, isPending: isDeletePending } = useMutation({
    mutationFn: (params: DeleteCartParams) =>
      CartService.deleteCartItems(params),
    onSuccess: () => {
      toast.success("Cart was successfully updated");
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CART],
      });
    },
  });

  const cartSummary = useMemo(() => getCartSummary(data), [data]);

  return {
    cartItems: data || [],
    isLoading,
    cartSummary,
    isPending,
    isDeletePending,
    updateCart,
    deleteCartItems,
  };
};
export default useCart;

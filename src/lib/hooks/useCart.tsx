import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/querykeys";
import CartService from "@/services/cart.service";
import {
  ApplyCouponParams,
  DeleteCartParams,
  UpdateCartParams,
} from "@/types/cart";

type UseCartProps =
  | {
      enabled?: boolean;
      onApplySuccess?: () => void;
    }
  | { enabled: true; onApplySuccess?: () => void };

const useCart = ({ enabled, onApplySuccess }: UseCartProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.CART],
    queryFn: () => CartService.getCart(),
    enabled,
  });

  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: (params: UpdateCartParams) => CartService.updateCart(params),
    onSuccess: () => invalidateCart("Cart was successfully updated"),
  });

  const { mutate: deleteCartItems, isPending: isDeletePending } = useMutation({
    mutationFn: (params: DeleteCartParams) =>
      CartService.deleteCartItems(params),
    onSuccess: () => invalidateCart("Cart was successfully updated"),
  });

  const { mutate: applyCoupon, isPending: isDiscountPending } = useMutation({
    mutationFn: (params: ApplyCouponParams) => CartService.applyCoupon(params),
    onSuccess: () => {
      invalidateCart("Discount was successfully applied!");
      onApplySuccess?.();
    },
    onError: () => toast.error("Discount wasn't applied! Maybe it's expired."),
  });

  function invalidateCart(message: string) {
    toast.success(message);
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.CART],
    });
  }

  return {
    cartItems: data?.cartItems || [],
    cartSummary: data?.cartSummary,
    isLoading,
    isPending,
    isDeletePending,
    isDiscountPending,
    updateCart,
    deleteCartItems,
    applyCoupon,
  };
};
export default useCart;

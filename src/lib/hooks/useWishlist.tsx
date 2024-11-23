import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { QUERY_KEYS } from "@/lib/constants/querykeys";
import FavService from "@/services/fav.service";
import { WishlistParams } from "@/types/fav";
import { CombinationType, ProductType } from "@/types/product";

type UseWishlistParams = {
  isFavorite: boolean;
  invalidate?: boolean;
  product_id: string;
  combinations: CombinationType[];
};

export const useWishlist = ({
  isFavorite,
  invalidate,
  product_id,
  combinations,
}: UseWishlistParams) => {
  const [isFav, setFav] = useState(isFavorite);

  const queryClient = useQueryClient();

  const { mutate: doWishlistAction } = useMutation({
    mutationFn: (params: WishlistParams) => FavService.doWishlistAction(params),
    onSuccess: (_, vars) => {
      toast.success(
        `Product was successfully ${vars.type === "remove" ? "removed from " : "added to "} Wishlist`
      );
      setFav(vars.type === "add");
      if (invalidate && vars.type === "remove") {
        queryClient.setQueryData(
          [QUERY_KEYS.WISHLIST],
          (oldData: ProductType[]) =>
            oldData.filter((prod) => prod.id !== product_id)
        );
      }
    },
    onError: () => toast.error("Something went wrong!"),
  });

  const addProductToFav = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();

      doWishlistAction({
        product_id: product_id,
        combination: JSON.stringify(combinations?.[0]),
        type: isFav ? "remove" : "add",
      });
    },
    [product_id, isFav, combinations, doWishlistAction]
  );
  return { isFav, addProductToFav };
};

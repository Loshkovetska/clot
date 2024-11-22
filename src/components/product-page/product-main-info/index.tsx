import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import BottomBar from "@/components/common/bottom-bar";
import Counter from "@/components/common/counter";
import ProductPrice from "@/components/home-page/products-list/product-price";
import ProductVariants from "@/components/product-page/product-main-info/product-variants";
import { getProductCombination } from "@/lib/utils/product";
import CartService from "@/services/cart.service";
import { AddToCartParams } from "@/types/cart";
import { ProductType, ProductVariantType } from "@/types/product";

export default function ProductMainInfo({ product }: { product: ProductType }) {
  const [amount, setAmount] = useState(1);

  const [currentCombination, setCombination] = useState(
    product.combinations?.[0]
  );

  const { mutate, isPending } = useMutation({
    mutationFn: (params: AddToCartParams) =>
      CartService.addProductToCart(params),
    onSuccess: () => toast.success("Product was successfully added to cart!"),
    onError: () => toast.error("Something went wrong!"),
  });

  const price = useMemo(() => {
    const initPrice = currentCombination?.price as number;
    return (
      initPrice * ((currentCombination?.discount as number) / 100 || 1) * amount
    );
  }, [currentCombination?.price, currentCombination?.discount, amount]);

  const handleCountChange = useCallback(
    (num: number) => {
      if (
        typeof currentCombination === "object" &&
        "amount" in currentCombination
      ) {
        if (amount + num > (currentCombination?.amount as number)) {
          return toast.error("Chosen amount is unavailable!");
        }
      }

      setAmount(amount + num);
    },
    [amount, currentCombination]
  );

  const handleCombinationChange = useCallback(
    (val: ProductVariantType["attr_list"][0], id: string) => {
      const combination = getProductCombination(
        val,
        id,
        currentCombination,
        product.combinations
      );
      if (combination) {
        setCombination(combination);
      }
    },
    [product.combinations, currentCombination]
  );

  const addToCart = useCallback(() => {
    mutate({
      amount,
      product_id: product.id,
      combination: JSON.stringify(currentCombination),
    });
  }, [currentCombination, amount, product]);
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="max-lg:text-md text-3xl">{product.title}</h1>
          <ProductPrice
            price={currentCombination.price as number}
            discount={currentCombination.discount as number}
            priceClassName="lg:text-xl"
            mainPriceClassName="text-primary"
          />
        </div>
        <p className="text-sm  text-black-50 max-lg:hidden">
          {product.description}
        </p>
        <div className="flex flex-col gap-3">
          <ProductVariants
            currentCombination={currentCombination}
            variants={product.variants}
            onChange={handleCombinationChange}
          />
          <div className="flex items-center justify-between rounded-[24px] bg-light-100 px-4 py-2">
            <span className="text-md">Quantity</span>
            <Counter
              count={amount}
              variant="icon"
              className="gap-5"
              disabledMinus={amount === 1}
              disabledPlus={amount === 5}
              handleCountChange={handleCountChange}
            />
          </div>
        </div>
      </div>
      <BottomBar
        loading={isPending}
        price={price}
        action={addToCart}
        actionTitle="Add to Bag"
      />
    </>
  );
}

import BottomBar from "@/components/bottom-bar";
import Counter from "@/components/counter";
import ProductPrice from "@/components/home-page/products-list/product-price";
import ProductVariants from "@/components/product-page/product-main-info/product-variants";
import { getProductCombination } from "@/lib/utils/product";
import { ProductType, ProductVariantType } from "@/types/product";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

export default function ProductMainInfo({ product }: { product: ProductType }) {
  const [amount, setAmount] = useState(1);

  const [currentCombination, setCombination] = useState(
    product.combinations?.[0]
  );

  const price = useMemo(() => {
    const initPrice = currentCombination?.price as number;
    return (
      initPrice * ((currentCombination?.discount as number) / 100 || 1) * amount
    );
  }, [currentCombination?.price, currentCombination?.dicount, amount]);

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
    //todo: add functionality for adding to cart
  }, []);
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl max-lg:text-md">{product.title}</h1>
          <ProductPrice
            price={currentCombination.price as number}
            discount={currentCombination.discount as number}
            priceClassName="lg:text-xl"
            mainPriceClassName="text-primary"
          />
        </div>
        <div className="flex flex-col gap-3">
          <ProductVariants
            currentCombination={currentCombination}
            onChange={handleCombinationChange}
            variants={product.variants}
          />
          <div className="px-4 py-2 bg-light-100 rounded-[24px] flex items-center justify-between">
            <span className="text-md">Quantity</span>
            <Counter
              count={amount}
              handleCountChange={handleCountChange}
              variant="icon"
              className="gap-5"
              disabledMinus={amount === 1}
              disabledPlus={amount === 5}
            />
          </div>
        </div>
      </div>
      <BottomBar
        price={price}
        action={addToCart}
        actionTitle="Add to Bag"
      />
    </>
  );
}

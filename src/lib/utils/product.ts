import { CombinationType, ProductVariantType } from "@/types/product";

export const getProductCombination = (
  variant: ProductVariantType["attr_list"][0],
  id: string,
  currentCombination: CombinationType,
  allCombinations: CombinationType[]
) => {
  const combinations = allCombinations.filter((comb) => {
    const compareValue =
      typeof variant === "string"
        ? variant
        : typeof variant === "object" && "name" in variant
          ? variant.name
          : null;

    if (compareValue && comb[id] === compareValue) {
      return true;
    }

    return false;
  });

  if (combinations.length === 1) {
    return combinations[0];
  }
  if (combinations.length > 1) {
    const excludeKeys = [id, "amount", "price", "discount"];
    const updatedCombination = Object.entries(currentCombination).filter(
      ([key]) => !excludeKeys.includes(key)
    );
    const combination = combinations.find((comb) => {
      const updatedComb = Object.entries(comb).filter(
        ([key]) => !excludeKeys.includes(key)
      );
      return JSON.stringify(updatedComb) === JSON.stringify(updatedCombination);
    });

    return combination;
  }
};

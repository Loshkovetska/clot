import ProductVariant from "@/components/product-page/product-main-info/product-variants/product-variant";
import { CombinationType, ProductVariantType } from "@/types/product";

type ProductVariantsPropType = {
  currentCombination: CombinationType;
  variants: ProductVariantType[];
  onChange: (val: ProductVariantType["attr_list"][0], id: string) => void;
};

export default function ProductVariants({
  variants,
  currentCombination,
  onChange,
}: ProductVariantsPropType) {
  return variants.map((variant) => (
    <ProductVariant
      key={variant.attr_name}
      name={variant.attr_name}
      id={variant.attr_id}
      values={variant.attr_list}
      currentCombination={currentCombination}
      handleVariantChange={(val) => onChange(val, variant.attr_id)}
    />
  ));
}

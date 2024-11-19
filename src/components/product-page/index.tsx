import ProductCarousel from "@/components/product-page/product-carousel";
import ProductInfo from "@/components/product-page/product-info";
import ProductVariants from "@/components/product-page/product-variants";
import { ProductType } from "@/types/product";

export default function ProductContent({ product }: { product: ProductType }) {
  console.log(Object.entries(product));
  return (
    <>
      <ProductCarousel />
      <ProductVariants />
      <ProductInfo description={product.description} />
    </>
  );
}

"use client";
import ProductCarousel from "@/components/product-page/product-carousel";
import ProductInfo from "@/components/product-page/product-info";
import ProductMainInfo from "@/components/product-page/product-main-info";
import { ProductType } from "@/types/product";

export default function ProductContent({ product }: { product: ProductType }) {
  return (
    <>
      <div className="w-full flex gap-14 max-lg:flex-col">
        <ProductCarousel images={product?.imageUrls} />
        <ProductMainInfo product={product} />
      </div>
      <ProductInfo description={product.description} />
    </>
  );
}

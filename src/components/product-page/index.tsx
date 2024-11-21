"use client";
import ProductCarousel from "@/components/product-page/product-carousel";
import ProductInfo from "@/components/product-page/product-info";
import ProductMainInfo from "@/components/product-page/product-main-info";
import ProductReviews from "@/components/product-page/product-reviews";
import { ProductType } from "@/types/product";

export default function ProductContent({ product }: { product: ProductType }) {
  return (
    <div className="flex flex-col gap-6 lg:gap-10 max-w-[1024px] mx-auto pb-20">
      <div className="w-full flex gap-6 lg:gap-14 max-lg:flex-col">
        <ProductCarousel images={product?.imageUrls} />
        <ProductMainInfo product={product} />
      </div>
      <ProductInfo description={product.description} />
      <ProductReviews
        id={product.id}
        rating={product.rate}
        totalReviews={product.totalReviews}
      />
    </div>
  );
}

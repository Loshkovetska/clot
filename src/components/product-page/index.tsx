"use client";
import Header from "@/components/common/header";
import ProductCarousel from "@/components/product-page/product-carousel";
import ProductInfo from "@/components/product-page/product-info";
import ProductMainInfo from "@/components/product-page/product-main-info";
import ProductReviews from "@/components/product-page/product-reviews";
import { ROUTES } from "@/lib/constants/routes";
import { useWishlist } from "@/lib/hooks/useWishlist";
import { ProductType } from "@/types/product";

export default function ProductContent({ product }: { product: ProductType }) {
  const { addProductToFav, isFav } = useWishlist({
    isFavorite: product.isFavorite,
    product_id: product.id,
    combinations: product.combinations,
  });
  return (
    <>
      <Header
        funcButtons={[
          {
            type: "fav",
            href: ROUTES.favs,
            variant: "light",
            iconClassName: isFav
              ? "[&>*]:fill-destructive [&>*]:stroke-destructive"
              : "",
            action: addProductToFav,
          },
          {
            type: "cart",
            href: ROUTES.cart,
          },
        ]}
      />
      <div className="mx-auto flex max-w-screen-lg flex-col gap-6 pb-20 pt-6 lg:gap-10">
        <div className="flex w-full gap-6 max-lg:flex-col lg:gap-14">
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
    </>
  );
}

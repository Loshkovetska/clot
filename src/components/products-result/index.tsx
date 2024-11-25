import EmptyList from "@/components/common/empty-list";
import ProductCard from "@/components/home-page/products-list/product-card";
import { ProductType } from "@/types/product";

type ProductsResultPropType = {
  data: ProductType[];
  isLoading: boolean;
  type: "search" | "wishlist";
};

export default function ProductsResult({
  isLoading,
  data,
  type,
}: ProductsResultPropType) {
  return !isLoading && !data?.length ? (
    <EmptyList type={type} />
  ) : (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
      {data?.map((item) => (
        <ProductCard
          key={item.id}
          {...item}
          isFavorite
          className="max-w-none"
          invalidate
        />
      ))}
    </div>
  );
}

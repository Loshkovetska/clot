import CommonListWrapper from "@/components/home-page/common-list-wrapper";
import ProductCard from "@/components/home-page/products-list/product-card";
import { CommonListPropType } from "@/components/home-page/type";
import { useMemo } from "react";

export default function ProductsList({ title, href }: CommonListPropType) {
  const list = useMemo(
    () =>
      [
        { id: "1", title: "Bsms", price: 200, discount: 20 },
        { id: "1", title: "Bsms", price: 200, discount: 0 },
        { id: "1", title: "Bsms", price: 200, discount: 20 },
        { id: "1", title: "Bsms", price: 200, discount: 20 },
        { id: "1", title: "Bsms", price: 200, discount: 20 },
        { id: "1", title: "Bsms", price: 200, discount: 0 },
        { id: "1", title: "Bsms", price: 200, discount: 20 },
        { id: "1", title: "Bsms", price: 200, discount: 20 },
        { id: "1", title: "Bsms", price: 200, discount: 0 },
      ].map((item) => (
        <ProductCard
          key={item.id}
          {...(item as any)}
          className="min-w-[156px]"
        />
      )),
    []
  );
  return (
    <CommonListWrapper
      title={title}
      href={href}
      data={list}
      listClassName="snap-start overflow-hidden scroll-smooth snap-mandatory select-none"
    />
  );
}

import CatItem from "@/components/home-page/cats-list/cat-item";
import CommonListWrapper from "@/components/home-page/common-list-wrapper";
import { ROUTES } from "@/lib/constants/routes";
import { useMemo } from "react";

export default function CatsList() {
  const list = useMemo(
    () =>
      [{ id: 1, title: "", imageUrl: "" }].map((item) => (
        <CatItem
          key={item.id}
          {...item}
        />
      )),
    []
  );
  return (
    <CommonListWrapper
      title="Categories"
      href={ROUTES.categories}
      data={list}
    />
  );
}

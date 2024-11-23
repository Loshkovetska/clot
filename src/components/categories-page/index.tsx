"use client";
import { useMemo, useState } from "react";

import EmptyList from "@/components/common/empty-list";
import Header from "@/components/common/header";
import SearchBar from "@/components/common/searchbar";
import CatItem from "@/components/home-page/cats-list/cat-item";
import { CategoryType } from "@/types/category";

export default function CategoriesMenuContent({
  items,
}: {
  items: CategoryType[];
}) {
  const [searchValue, setSearchValue] = useState("");

  const categories = useMemo(
    () =>
      items.filter((item) =>
        item.title
          .toLocaleLowerCase()
          .slice(0, searchValue.length)
          .includes(searchValue.toLocaleLowerCase())
      ),
    [items, searchValue]
  );

  return (
    <>
      <Header>
        <SearchBar
          formClassName="ml-[50px]"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          navigateOnSubmit={false}
        />
      </Header>
      {categories?.length > 0 && (
        <div className="mt-4 flex flex-col gap-3">
          <h1 className="text-xl font-bold">Shop by Categories</h1>
          <div className="flex flex-col gap-2">
            {categories?.map((item) => (
              <CatItem
                variant="full"
                key={item.id}
                {...item}
              />
            ))}
          </div>
        </div>
      )}
      {!categories.length && (
        <EmptyList
          type="search"
          className="grow justify-center"
        />
      )}
    </>
  );
}

import SearchBar from "@/components/common/searchbar";
import CatsList from "@/components/home-page/cats-list";
import ProductsList from "@/components/home-page/products-list";

export default function Home() {
  return (
    <div className="flex flex-col gap-6 pt-[127px] px-6 pb-[100px]">
      <SearchBar />
      <CatsList />
      <ProductsList
        title="Top Selling"
        href=""
      />
      <ProductsList
        title="New In"
        href=""
      />
    </div>
  );
}

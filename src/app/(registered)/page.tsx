import Header from "@/components/common/header";
import NavBar from "@/components/common/navbar";
import SearchBar from "@/components/common/searchbar";
import CatsList from "@/components/home-page/cats-list";
import ProductsList from "@/components/home-page/products-list";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { ROUTES } from "@/lib/constants/routes";

export default async function Home() {
  return (
    <>
      <Header
        showUser
        funcButton={{ type: "cart", href: ROUTES.cart }}
        title="Clot"
      />

      <div className="flex flex-col gap-6 pt-[127px] px-6 pb-[100px]">
        <SearchBar />
        <CatsList />
        <ProductsList
          title="Top Selling"
          href={`${ROUTES.products}?top_selling`}
          queryKey={QUERY_KEYS.TOP_PRODUCTS}
          params={{ top_selling: true }}
        />
        <ProductsList
          title="New In"
          href={`${ROUTES.products}?new`}
          queryKey={QUERY_KEYS.NEW_PRODUCTS}
          params={{ new: true }}
        />
      </div>
      <NavBar />
    </>
  );
}

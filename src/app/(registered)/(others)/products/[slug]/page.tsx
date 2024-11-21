import { QueryClient, dehydrate } from "@tanstack/react-query";

import Header from "@/components/common/header";
import ProductContent from "@/components/product-page";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import { ROUTES } from "@/lib/constants/routes";
import ProductService from "@/services/product.service";
import { ProductType } from "@/types/product";

export default async function Page({ params }: { params: any }) {
  const queryClient = new QueryClient();
  const { slug } = await params;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.PRODUCT, slug],
    queryFn: () => ProductService.getProductBySlug(slug),
  });

  const state = dehydrate(queryClient);
  const product = state.queries.find(
    (query) => query.queryHash === JSON.stringify([QUERY_KEYS.PRODUCT, slug])
  );

  return (
    <>
      <Header
        funcButton={{ type: "fav", href: ROUTES.favs, variant: "light" }}
      />
      {product?.state?.data && (
        <ProductContent product={product?.state?.data as ProductType} />
      )}
    </>
  );
}

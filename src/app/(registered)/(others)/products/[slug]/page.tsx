import { auth } from "@clerk/nextjs/server";
import { QueryClient, dehydrate } from "@tanstack/react-query";

import ProductContent from "@/components/product-page";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import ProductService from "@/services/product.service";
import { ProductType } from "@/types/product";

export default async function Page({ params }: { params: any }) {
  const queryClient = new QueryClient();
  const authClerk = await auth();
  const { slug } = await params;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.PRODUCT, slug, authClerk.userId],
    queryFn: () =>
      ProductService.getProductBySlug(slug, authClerk.userId || undefined),
  });

  const state = dehydrate(queryClient);
  const product = state.queries.find(
    (query) =>
      query.queryHash ===
      JSON.stringify([QUERY_KEYS.PRODUCT, slug, authClerk.userId])
  );

  return (
    product?.state?.data && (
      <ProductContent product={product?.state?.data as ProductType} />
    )
  );
}

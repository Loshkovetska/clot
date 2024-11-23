import { QueryClient, dehydrate } from "@tanstack/react-query";

import CategoriesMenuContent from "@/components/categories-page";
import { QUERY_KEYS } from "@/lib/constants/querykeys";
import CategoryService from "@/services/category.service";
import { CategoryType } from "@/types/category";

export default async function CategoriesMenu() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => CategoryService.getCategories(),
  });

  const state = dehydrate(queryClient);

  const categories = state.queries.find(
    (query) => query.queryHash === JSON.stringify([QUERY_KEYS.CATEGORIES])
  );

  return (
    <CategoriesMenuContent
      items={(categories?.state?.data as CategoryType[]) || []}
    />
  );
}

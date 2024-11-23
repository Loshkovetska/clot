import SearchContent from "@/components/search-content";

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;

  return (
    <SearchContent
      slug={slug}
      type="category"
    />
  );
}

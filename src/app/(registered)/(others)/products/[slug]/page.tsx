import Header from "@/components/common/header";
import { ROUTES } from "@/lib/constants/routes";

export default async function Page({
  params,
  seachParams,
}: {
  params: any;
  seachParams: any;
}) {
  return (
    <>
      <Header funcButton={{ type: "fav", href: ROUTES.favs }} />
    </>
  );
}

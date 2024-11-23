import Link from "next/link";

type CommonListHeaderPropType = {
  title: string;
  href: string;
};

export default function CommonListHeader({
  title,
  href,
}: CommonListHeaderPropType) {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="text-md font-bold lg:text-2xl">{title}</h2>
      <Link
        href={href}
        className="text-md hover:text-primary"
      >
        See All
      </Link>
    </div>
  );
}

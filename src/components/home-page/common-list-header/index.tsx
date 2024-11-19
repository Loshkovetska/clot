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
    <div className="flex items-center justify-between w-full">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link
        href={href}
        className="text-md hover:text-primary"
      >
        See All
      </Link>
    </div>
  );
}

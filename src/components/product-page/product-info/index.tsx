export default function ProductInfo({ description }: { description?: string }) {
  return (
    <>
      <p className="text-sm text-black-50 max-w-[600px]">{description}</p>
      <div className="flex flex-col gap-3 w-full">
        <h2 className="font-bold text-md">Shipping & Returns</h2>
        <p className="text-sm text-black-50 max-w-[600px]">
          Free standard shipping and free 60-day returns
        </p>
      </div>
    </>
  );
}

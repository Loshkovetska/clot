export default function ProductInfo({ description }: { description?: string }) {
  return (
    <>
      <p className="max-w-[600px] text-sm text-black-50">{description}</p>
      <div className="flex w-full flex-col gap-3">
        <h2 className="text-md font-bold">Shipping & Returns</h2>
        <p className="max-w-[600px] text-sm text-black-50">
          Free standard shipping and free 60-day returns
        </p>
      </div>
    </>
  );
}

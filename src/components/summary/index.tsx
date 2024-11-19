type SummaryType = {
  discount?: number;
  subTotal: number;
  shippingCost: number;
  taxCost: number;
  totalPrice: number;
};

export default function Summary({
  discount,
  subTotal,
  shippingCost,
  taxCost,
  totalPrice,
}: SummaryType) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Subtotal</span>
        <span className="text-md text-black-100 text-right">
          ${subTotal.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Shipping Cost</span>
        <span className="text-md text-black-100 text-right">
          ${shippingCost.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Tax</span>
        <span className="text-md text-black-100 text-right">
          ${taxCost.toFixed(2)}
        </span>
      </div>
      {discount && (
        <div className="flex items-center justify-between">
          <span className="text-md text-black-50">Discount</span>
          <span className="text-md text-black-100 text-right">
            ${discount.toFixed(2)}
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Total</span>
        <span className="text-md text-black-100 text-right font-bold">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

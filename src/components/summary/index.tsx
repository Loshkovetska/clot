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
    <div className="flex grow flex-col justify-end gap-3">
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Subtotal</span>
        <span className="text-right text-md text-black-100">
          ${subTotal.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Shipping Cost</span>
        <span className="text-right text-md text-black-100">
          ${shippingCost.toFixed(2)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Tax</span>
        <span className="text-right text-md text-black-100">
          ${taxCost.toFixed(2)}
        </span>
      </div>
      {discount && (
        <div className="flex items-center justify-between">
          <span className="text-md text-black-50">Discount</span>
          <span className="text-right text-md text-black-100">
            -{discount.toFixed(2)}$
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Total</span>
        <span className="text-right text-md font-bold text-black-100">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

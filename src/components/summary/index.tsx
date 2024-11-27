import { CartSummaryType } from "@/types/cart";

export default function Summary({
  discount,
  subTotal,
  shippingCost,
  taxCost,
  totalPrice,
}: CartSummaryType) {
  return (
    <div className="flex grow flex-col justify-end gap-3">
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Subtotal</span>
        <span className="text-right text-md ">${subTotal.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Shipping Cost</span>
        <span className="text-right text-md ">${shippingCost.toFixed(2)}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Tax</span>
        <span className="text-right text-md ">${taxCost.toFixed(2)}</span>
      </div>
      {(discount || 0) > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-md text-black-50">Discount</span>
          <span className="text-right text-md text-success-light">
            -{discount?.toFixed(2)}$
          </span>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-md text-black-50">Total</span>
        <span className="text-right text-md font-bold ">
          ${totalPrice.toFixed(2)}
        </span>
      </div>
    </div>
  );
}

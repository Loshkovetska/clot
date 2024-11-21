import Counter from "@/components/common/counter";
import Image from "next/image";

export default function CartItem() {
  return (
    <div className="w-full bg-light-100 p-2 rounded-lg flex items-center gap-3">
      <div className="min-w-16 max-w-16 h-16 relative overflow-hidden rounded-sm">
        <Image
          src=""
          alt="cat-item"
          fill
        />
      </div>
      <div className="grow flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm"></span>
          <span className="text-sm font-bold">${}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-sm text-black-50"></span>-
              <span className="text-sm font-bold text-black-100"></span>
            </div>
          </div>
          <Counter
            count={0}
            handleCountChange={() => {}}
            variant="icon-sm"
          />
        </div>
      </div>
    </div>
  );
}

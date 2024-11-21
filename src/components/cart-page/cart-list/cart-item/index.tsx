import Image from "next/image";

import Counter from "@/components/common/counter";

export default function CartItem() {
  return (
    <div className="flex w-full items-center gap-3 rounded-lg bg-light-100 p-2">
      <div className="relative h-16 min-w-16 max-w-16 overflow-hidden rounded-sm">
        <Image
          src=""
          alt="cat-item"
          fill
        />
      </div>
      <div className="flex grow flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-sm"></span>
          <span className="text-sm font-bold">${}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-4">
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

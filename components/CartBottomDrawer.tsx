"use client";

import { useMemo, useState } from "react";
import { Drawer } from "vaul";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartBottomDrawerProps {
  items: CartItem[];
}

// const SNAP_POINTS = ["40%", "80%"] as const;

export const CartBottomDrawer = ({ items }: CartBottomDrawerProps) => {
  // const [activeSnapPoint, setActiveSnapPoint] = useState<number | string>(
  //   SNAP_POINTS[0],
  // );

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  return (
    <Drawer.Root
      modal={false}
      dismissible={false}
      open
      // snapPoints={[SNAP_POINTS[0], SNAP_POINTS[1]]}
      // activeSnapPoint={activeSnapPoint}
      // setActiveSnapPoint={(snapPoint) =>
      //   setActiveSnapPoint(snapPoint ?? SNAP_POINTS[0])
      // }
    >
      <Drawer.Portal>
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[80vh] rounded-t-3xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-t border-gray-200 dark:border-zinc-800 shadow-2xl pointer-events-auto">
          <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-gray-300 dark:bg-zinc-700" />
          <div className="px-6 py-4 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                追加したアイテム
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                合計 ${totalPrice.toFixed(2)}
              </p>
            </div>

            {items.length === 0 ? (
              <p className="text-sm text-gray-500">まだアイテムがありません</p>
            ) : (
              <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-2xl bg-gray-100 dark:bg-zinc-800 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-300">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

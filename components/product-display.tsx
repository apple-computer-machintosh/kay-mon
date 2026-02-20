"use client";

import { Product } from "@/lib/products";
import { Drawer } from "vaul";

interface ProductDisplayProps {
  product: Product | null;
  barcode: string;
  onAddToCart: (product: Product) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showPreview?: boolean;
}

export const ProductDisplay = ({
  product,
  barcode,
  onAddToCart,
  isOpen,
  onOpenChange,
  showPreview = true,
}: ProductDisplayProps) => {
  const FX_RATE_JPY = 155;

  if (!barcode) {
    return (
      <div className="text-center text-sm text-gray-400 py-2 italic">
        カメラをバーコードに向けてください
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg border border-red-200 dark:border-red-900 text-center">
        <p className="text-red-600 dark:text-red-400 font-bold mb-1">
          未登録の商品です
        </p>
        <p className="text-xs text-red-500">コード: {barcode}</p>
      </div>
    );
  }

  const yenPrice = Math.round(product.price * FX_RATE_JPY);
  const coinCount = Math.max(1, Math.round(product.price));
  const billCount = Math.max(1, Math.round(product.price));
  const reviews = [
    {
      name: "私はダミーデータです",
      location: "東京都、日本",
      text: "とってもこのオレンジジュースは美味しいね、みんなにもおすすめ",
    },
    {
      name: "私はダミーデータです",
      location: "東京都、日本",
      text: "とってもこのオレンジジュースは美味しいね、みんなにもおすすめ",
    },
  ];

  return (
    <Drawer.Root
      key={barcode}
      open={isOpen}
      onOpenChange={onOpenChange}
      defaultOpen={isOpen === undefined}
    >
      {showPreview && (
        <div className="flex items-center justify-between rounded-2xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            {product.imageUrl && (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {product.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                {yenPrice.toLocaleString()} 円
              </p>
            </div>
          </div>
          <Drawer.Trigger className="text-xs font-semibold px-3 py-2 rounded-full bg-black text-white">
            詳細を見る
          </Drawer.Trigger>
        </div>
      )}

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/30" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 max-h-[90vh] overflow-auto rounded-t-4xl bg-white dark:bg-zinc-900 shadow-2xl">
          <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-gray-300 dark:bg-zinc-700" />
          <div className="p-6 space-y-6">
            <div className="flex flex-col items-center text-center gap-3">
              {product.imageUrl && (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />
              )}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {product.name}
              </h3>
              <span className="inline-flex items-center px-4 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold">
                {product.category}
              </span>
            </div>

            <div className="bg-gray-100 dark:bg-zinc-700/60 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {yenPrice.toLocaleString()} 円
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300">
                  {product.price.toFixed(2)} ドル
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
                  <span className="w-5 h-5 rounded-full bg-amber-300 border border-amber-400 shadow-sm" />
                  {coinCount}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-zinc-800 px-2.5 py-1 text-xs font-semibold text-gray-700 dark:text-gray-200">
                  <span className="w-6 h-4 rounded-sm bg-emerald-200 border border-emerald-400 shadow-sm" />
                  {billCount}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-zinc-700/60 rounded-2xl p-4 space-y-2">
              <p className="text-sm font-bold text-gray-900 dark:text-white">
                説明
              </p>
              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-200">
                {product.description || "説明がありません"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {reviews.map((review, index) => (
                <div
                  key={`${review.name}-${index}`}
                  className="bg-gray-100 dark:bg-zinc-700/60 rounded-2xl p-4 space-y-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-zinc-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white">
                        {review.name}
                      </p>
                      <p className="text-[10px] text-gray-500 dark:text-gray-300">
                        {review.location}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-200">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-black rounded-full text-white font-bold py-4 text-sm"
            >
              カートに追加
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

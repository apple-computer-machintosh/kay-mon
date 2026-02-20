"use client";

import { Product } from "@/lib/products";

interface ProductDisplayProps {
  product: Product | null;
  barcode: string;
  onAddToCart: (product: Product) => void;
}

export const ProductDisplay = ({
  product,
  barcode,
  onAddToCart,
}: ProductDisplayProps) => {
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

  return (
    <div className="bg-white dark:bg-zinc-800 p-5 rounded-lg border border-blue-200 dark:border-blue-900 shadow-md space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.category}
            </span>
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white leading-tight">
            {product.name}
          </h3>
        </div>
        {product.imageUrl && (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-20 h-20 rounded object-cover border border-gray-300 dark:border-gray-600"
          />
        )}
      </div>
      {product.description && (
        <p className="text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-zinc-700 p-2 rounded">
          {product.description}
        </p>
      )}
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition"
      >
        カートに追加
      </button>
    </div>
  );
};

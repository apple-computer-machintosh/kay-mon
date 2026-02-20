"use client";

import { useMemo, useState } from "react";
import { getSimilarProducts, Product } from "@/lib/products";

interface ProductComparisonProps {
  baseProduct: Product | null;
  onAddToCart: (product: Product) => void;
}

export const ProductComparison = ({
  baseProduct,
  onAddToCart,
}: ProductComparisonProps) => {
  const similarProducts = useMemo(() => {
    if (!baseProduct) {
      return [];
    }
    return getSimilarProducts(baseProduct, 3);
  }, [baseProduct]);

  const [selectedProductId, setSelectedProductId] = useState<string>("");

  const selectedProduct = useMemo(() => {
    if (!similarProducts.length) {
      return null;
    }

    const manuallySelected = similarProducts.find(
      (product) => product.id === selectedProductId,
    );

    return manuallySelected ?? similarProducts[0];
  }, [similarProducts, selectedProductId]);

  if (!baseProduct) {
    return null;
  }

  if (!similarProducts.length) {
    return (
      <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500">比較できる類似商品がありません</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-3">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">
        似た商品と比較
      </h3>

      <div className="flex flex-wrap gap-2">
        {similarProducts.map((product) => (
          <button
            key={product.id}
            onClick={() => setSelectedProductId(product.id)}
            className={`px-3 py-1.5 rounded text-xs font-semibold border transition ${
              (selectedProduct?.id ?? "") === product.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 border-gray-300 dark:bg-zinc-700 dark:text-gray-200 dark:border-zinc-600"
            }`}
          >
            {product.name}
          </button>
        ))}
      </div>

      {selectedProduct && (
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10">
            <p className="text-xs text-gray-500 mb-1">スキャン商品</p>
            <p className="font-semibold text-gray-900 dark:text-white leading-tight">
              {baseProduct.name}
            </p>
            <p className="mt-2 font-bold text-blue-700 dark:text-blue-300">
              ${baseProduct.price.toLocaleString()}
            </p>
          </div>

          <div className="p-3 rounded border border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 mb-1">比較商品</p>
            <p className="font-semibold text-gray-900 dark:text-white leading-tight">
              {selectedProduct.name}
            </p>
            <p className="mt-2 font-bold text-gray-900 dark:text-white">
              ${selectedProduct.price.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
          <p>
            価格差: $
            {Math.abs(baseProduct.price - selectedProduct.price).toFixed(2)}
          </p>
          <button
            onClick={() => onAddToCart(selectedProduct)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded font-semibold transition"
          >
            比較商品をカートに追加
          </button>
        </div>
      )}
    </div>
  );
};

import { Product } from "@/lib/products";
import { CompareProductDetails } from "./CompareProductDetails";

interface CompareProductCardProps {
  title: string;
  barcode: string;
  product: Product | null;
  isActive: boolean;
  onSelect: () => void;
}

export const CompareProductCard = ({
  title,
  barcode,
  product,
  isActive,
  onSelect,
}: CompareProductCardProps) => {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-4 rounded-lg border space-y-2 transition ${
        isActive
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
          : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800"
      }`}
    >
      <p className="text-xs font-bold text-gray-500">{title}</p>
      <p className="font-mono text-xs text-gray-500 dark:text-gray-400 min-h-5">
        {barcode || "未スキャン"}
      </p>
      {product ? (
        <div className="space-y-2">
          <p className="font-semibold text-sm text-gray-900 dark:text-white leading-tight">
            {product.name}
          </p>
          <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
            ${product.price.toLocaleString()}
          </p>
          <CompareProductDetails product={product} barcode={barcode} />
        </div>
      ) : (
        <p className="text-sm text-gray-400">商品が見つかりません</p>
      )}
    </button>
  );
};

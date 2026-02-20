import { Product } from "@/lib/products";

interface CompareProductDetailsProps {
  product: Product;
  barcode: string;
}

export const CompareProductDetails = ({
  product,
  barcode,
}: CompareProductDetailsProps) => {
  return (
    <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
      <p>
        <span className="font-semibold">カテゴリ:</span> {product.category}
      </p>
      <p>
        <span className="font-semibold">バーコード:</span> {barcode || "-"}
      </p>
      <p className="leading-relaxed text-gray-500 dark:text-gray-400">
        {product.description || "説明はありません"}
      </p>
    </div>
  );
};

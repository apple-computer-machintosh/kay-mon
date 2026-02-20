"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getProductByBarcode, Product } from "@/lib/products";
import { Scanner } from "./Scanner";
import { CompareProductCard } from "./CompareProductCard";

type Slot = "left" | "right";

interface CompareState {
  activeSlot: Slot;
  leftBarcode: string;
  rightBarcode: string;
  leftProduct: Product | null;
  rightProduct: Product | null;
}

const STORAGE_KEY = "compare-mode-state";
const DUPLICATE_SCAN_GUARD_MS = 1800;

const getInitialCompareState = (): CompareState => {
  if (typeof window === "undefined") {
    return {
      activeSlot: "left",
      leftBarcode: "",
      rightBarcode: "",
      leftProduct: null,
      rightProduct: null,
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      activeSlot: "left",
      leftBarcode: "",
      rightBarcode: "",
      leftProduct: null,
      rightProduct: null,
    };
  }

  try {
    const parsed = JSON.parse(raw) as CompareState;
    return {
      activeSlot: parsed.activeSlot ?? "left",
      leftBarcode: parsed.leftBarcode ?? "",
      rightBarcode: parsed.rightBarcode ?? "",
      leftProduct: parsed.leftProduct ?? null,
      rightProduct: parsed.rightProduct ?? null,
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return {
      activeSlot: "left",
      leftBarcode: "",
      rightBarcode: "",
      leftProduct: null,
      rightProduct: null,
    };
  }
};

export const BarcodeCompareScanner = () => {
  const [initialState] = useState<CompareState>(() => getInitialCompareState());
  const [activeSlot, setActiveSlot] = useState<Slot>(initialState.activeSlot);
  const [leftBarcode, setLeftBarcode] = useState(initialState.leftBarcode);
  const [rightBarcode, setRightBarcode] = useState(initialState.rightBarcode);
  const [leftProduct, setLeftProduct] = useState<Product | null>(
    initialState.leftProduct,
  );
  const [rightProduct, setRightProduct] = useState<Product | null>(
    initialState.rightProduct,
  );
  const [scanNotice, setScanNotice] = useState("");
  const lastScanRef = useRef<{ barcode: string; timestamp: number }>({
    barcode: "",
    timestamp: 0,
  });

  useEffect(() => {
    const nextState: CompareState = {
      activeSlot,
      leftBarcode,
      rightBarcode,
      leftProduct,
      rightProduct,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }, [activeSlot, leftBarcode, rightBarcode, leftProduct, rightProduct]);

  const handleScan = (_product: Product | null, barcode: string) => {
    const now = Date.now();
    const isRapidDuplicate =
      lastScanRef.current.barcode === barcode &&
      now - lastScanRef.current.timestamp < DUPLICATE_SCAN_GUARD_MS;

    if (isRapidDuplicate) {
      setScanNotice("同じバーコードの連続読み取りをスキップしました");
      return;
    }

    lastScanRef.current = { barcode, timestamp: now };
    setScanNotice("");

    const foundProduct = getProductByBarcode(barcode);

    if (activeSlot === "left") {
      setLeftBarcode(barcode);
      setLeftProduct(foundProduct);
      setActiveSlot("right");
      return;
    }

    setRightBarcode(barcode);
    setRightProduct(foundProduct);
    setActiveSlot("left");
  };

  const priceDiff = useMemo(() => {
    if (!leftProduct || !rightProduct) {
      return null;
    }

    return Math.abs(leftProduct.price - rightProduct.price);
  }, [leftProduct, rightProduct]);

  const recommendedProduct = useMemo(() => {
    if (!leftProduct || !rightProduct) {
      return null;
    }

    return leftProduct.price <= rightProduct.price ? leftProduct : rightProduct;
  }, [leftProduct, rightProduct]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-6 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-zinc-900 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          2商品バーコード比較
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          先にスキャン先を選んで、2つの商品を読み取ってください
        </p>

        {scanNotice && (
          <p className="text-xs text-amber-600 dark:text-amber-400">
            {scanNotice}
          </p>
        )}

        <Scanner onScan={handleScan} />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CompareProductCard
            title="商品A"
            barcode={leftBarcode}
            product={leftProduct}
            isActive={activeSlot === "left"}
            onSelect={() => setActiveSlot("left")}
          />
          <CompareProductCard
            title="商品B"
            barcode={rightBarcode}
            product={rightProduct}
            isActive={activeSlot === "right"}
            onSelect={() => setActiveSlot("right")}
          />
        </div>

        {leftProduct && rightProduct && (
          <div className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 space-y-2">
            <p className="text-sm text-gray-500">比較結果</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">価格差</span>
              <span className="font-bold text-gray-900 dark:text-white">
                ${priceDiff?.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-300">おすすめ</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {recommendedProduct?.name}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

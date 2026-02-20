"use client";

import { useZxing } from "react-zxing";
import { Product } from "@/lib/products";

interface ScannerProps {
  onScan: (product: Product | null, barcode: string) => void;
  fullHeight?: boolean;
}

const normalizeBarcode = (value: string) => value.replace(/\D/g, "");

export const Scanner = ({ onScan, fullHeight = false }: ScannerProps) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      const rawText = result.getText().trim();
      const normalized = normalizeBarcode(rawText);
      onScan(null, normalized || rawText);
    },
  });

  return (
    <div
      className={`relative w-full bg-black overflow-hidden ${
        fullHeight
          ? "h-full pointer-events-none"
          : "aspect-video rounded-lg shadow-inner border-2 border-gray-300 dark:border-gray-700"
      }`}
    >
      <video ref={ref} className="w-full h-full object-cover" />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-3/4 h-1/2 border-2 border-white/70 rounded-md box-border animate-pulse"></div>
      </div>
    </div>
  );
};

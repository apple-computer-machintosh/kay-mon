"use client";

import { useZxing } from "react-zxing";
import { Product } from "@/lib/products";

interface ScannerProps {
  onScan: (product: Product | null, barcode: string) => void;
}

const normalizeBarcode = (value: string) => value.replace(/\D/g, "");

export const Scanner = ({ onScan }: ScannerProps) => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      const rawText = result.getText().trim();
      const normalized = normalizeBarcode(rawText);
      onScan(null, normalized || rawText);
    },
  });

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      <video ref={ref} className="w-full h-full object-cover" />
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-3/4 h-1/2 border-2 border-white/70 rounded-md box-border animate-pulse"></div>
      </div>
    </div>
  );
};

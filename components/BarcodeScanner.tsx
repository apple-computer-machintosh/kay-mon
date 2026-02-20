"use client";

import { useState } from "react";
import { getProductByBarcode, Product } from "@/lib/products";
import { Scanner } from "./Scanner";
import { ProductDisplay } from "./product-display";

const CART_STORAGE_KEY = "cart-items";
const CART_UPDATE_EVENT = "cart-items-updated";

type CartItem = Product & { quantity: number };

export const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState("");
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleScan = (_product: Product | null, code: string) => {
    const foundProduct = getProductByBarcode(code);
    setBarcode(code);
    setScannedProduct(foundProduct);
    setIsDrawerOpen(true);
  };

  const handleAddToCart = (product: Product) => {
    if (!product) {
      return;
    }

    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const existingCart = raw ? (JSON.parse(raw) as CartItem[]) : [];
    const existingItem = existingCart.find((item) => item.id === product.id);
    const nextCart = existingItem
      ? existingCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      : [...existingCart, { ...product, quantity: 1 }];

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));
    window.dispatchEvent(new Event(CART_UPDATE_EVENT));
    setIsDrawerOpen(false);
    setBarcode("");
    setScannedProduct(null);
  };

  return (
    <div className="w-full h-full relative">
      <Scanner onScan={handleScan} />
      {(barcode || scannedProduct) && (
        <div className="absolute inset-x-0 bottom-6 px-6">
          <ProductDisplay
            product={scannedProduct}
            barcode={barcode}
            onAddToCart={handleAddToCart}
            isOpen={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
            showPreview={false}
          />
        </div>
      )}
    </div>
  );
};

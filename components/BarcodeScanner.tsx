"use client";

import { useEffect, useState } from "react";
import { getProductByBarcode, Product } from "@/lib/products";
import { Scanner } from "./Scanner";
import { ProductDisplay } from "./product-display";
import { ProductComparison } from "./ProductComparison";
import { Cart } from "./Cart";

interface CartItem extends Product {
  quantity: number;
}

interface ScannerState {
  resultText: string;
  scannedProduct: Product | null;
  cart: CartItem[];
}

const STORAGE_KEY = "scanner-mode-state";

const getInitialScannerState = (): ScannerState => {
  if (typeof window === "undefined") {
    return {
      resultText: "",
      scannedProduct: null,
      cart: [],
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      resultText: "",
      scannedProduct: null,
      cart: [],
    };
  }

  try {
    const parsed = JSON.parse(raw) as ScannerState;
    return {
      resultText: parsed.resultText ?? "",
      scannedProduct: parsed.scannedProduct ?? null,
      cart: parsed.cart ?? [],
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return {
      resultText: "",
      scannedProduct: null,
      cart: [],
    };
  }
};

export const BarcodeScanner = () => {
  const [initialState] = useState<ScannerState>(() => getInitialScannerState());
  const [resultText, setResultText] = useState(initialState.resultText);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(
    initialState.scannedProduct,
  );
  const [cart, setCart] = useState<CartItem[]>(initialState.cart);

  useEffect(() => {
    const nextState: ScannerState = {
      resultText,
      scannedProduct,
      cart,
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  }, [resultText, scannedProduct, cart]);

  const handleScan = (product: Product | null, barcode: string) => {
    setResultText(barcode);
    const foundProduct = getProductByBarcode(barcode);
    setScannedProduct(foundProduct);
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setResultText("");
    setScannedProduct(null);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const addQuantity = (productId: string) => {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      {/* スキャナー */}
      <div className="flex flex-col items-center gap-6 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-zinc-900 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          商品スキャナー
        </h2>

        <Scanner onScan={handleScan} />

        <div className="w-full space-y-4">
          <div className="text-center pb-2 border-b border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              スキャンコード
            </p>
            <div className="font-mono text-lg bg-white dark:bg-zinc-800 px-3 py-2 rounded border border-gray-300 dark:border-zinc-700 min-h-10 flex items-center justify-center text-gray-800 dark:text-gray-200">
              {resultText || "待機中..."}
            </div>
          </div>

          <ProductDisplay
            product={scannedProduct}
            barcode={resultText}
            onAddToCart={addToCart}
          />

          <ProductComparison
            baseProduct={scannedProduct}
            onAddToCart={addToCart}
          />
        </div>
      </div>

      {/* カート */}
      <Cart items={cart} onRemove={removeFromCart} onAdd={addQuantity} />
    </div>
  );
};

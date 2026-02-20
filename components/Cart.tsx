"use client";

import { useState } from "react";
import { ExchangeRateTotal } from "./ExchangeRateTotal";
import { CoinPaymentSuggestion } from "./CoinPaymentSuggestion";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onRemove: (productId: string) => void;
  onAdd: (productId: string) => void;
}

export const Cart = ({ items, onRemove, onAdd }: CartProps) => {
  const [showCoinSuggestion, setShowCoinSuggestion] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="flex flex-col gap-6 p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-zinc-900 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        カート
      </h2>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-8">
            商品がありません
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-800 p-3 rounded border border-gray-200 dark:border-gray-700 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    ${item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toLocaleString()}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onRemove(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition"
                  >
                    −
                  </button>
                  <button
                    onClick={() => onAdd(item.id)}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs transition"
                  >
                    ＋
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-2">
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
          <span>合計</span>
          <span>${totalPrice.toLocaleString()}</span>
        </div>
        <ExchangeRateTotal usdAmount={totalPrice} />
        <button
          disabled={items.length === 0}
          onClick={() => setShowCoinSuggestion(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 rounded transition"
        >
          会計
        </button>
        {showCoinSuggestion && totalPrice > 0 && (
          <CoinPaymentSuggestion
            amount={totalPrice}
            label="合計金額の硬貨支払い例"
          />
        )}
      </div>
    </div>
  );
};

"use client";

import { useEffect, useMemo, useState } from "react";

interface ExchangeRateTotalProps {
  usdAmount: number;
}

interface ExchangeRateResponse {
  rates?: {
    JPY?: number;
  };
}

export const ExchangeRateTotal = ({ usdAmount }: ExchangeRateTotalProps) => {
  const [usdToJpyRate, setUsdToJpyRate] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const response = await fetch("https://open.er-api.com/v6/latest/USD", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }

        const data: ExchangeRateResponse = await response.json();
        const rate = data.rates?.JPY;

        if (!rate) {
          throw new Error("JPY rate not found");
        }

        setUsdToJpyRate(rate);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRate();
  }, []);

  const convertedTotal = useMemo(() => {
    if (!usdToJpyRate) {
      return null;
    }
    return usdAmount * usdToJpyRate;
  }, [usdAmount, usdToJpyRate]);

  if (isLoading) {
    return <p className="text-sm text-gray-500">円換算を取得中...</p>;
  }

  if (hasError || !usdToJpyRate || convertedTotal === null) {
    return <p className="text-sm text-red-500">円換算を取得できませんでした</p>;
  }

  return (
    <div className="space-y-1 text-sm">
      <p className="text-gray-500">
        1 USD = ¥
        {usdToJpyRate.toLocaleString("ja-JP", { maximumFractionDigits: 2 })}
      </p>
      <p className="font-semibold text-gray-900 dark:text-white">
        円換算:{" "}
        {new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
          maximumFractionDigits: 0,
        }).format(convertedTotal)}
      </p>
    </div>
  );
};

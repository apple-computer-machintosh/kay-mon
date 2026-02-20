import { CoinIllustration } from "./CoinIllustration";

interface CoinPaymentSuggestionProps {
  amount: number;
  label?: string;
}

interface CoinDenomination {
  value: number;
  label: string;
}

const COIN_DENOMINATIONS: CoinDenomination[] = [
  { value: 100, label: "$1" },
  { value: 50, label: "50¢" },
  { value: 25, label: "25¢" },
  { value: 10, label: "10¢" },
  { value: 5, label: "5¢" },
  { value: 1, label: "1¢" },
];

const getCoinBreakdown = (amount: number) => {
  let remainingCents = Math.round(amount * 100);

  return COIN_DENOMINATIONS.map((coin) => {
    const count = Math.floor(remainingCents / coin.value);
    remainingCents -= count * coin.value;
    return {
      ...coin,
      count,
    };
  }).filter((coin) => coin.count > 0);
};

export const CoinPaymentSuggestion = ({
  amount,
  label = "この金額の支払い例",
}: CoinPaymentSuggestionProps) => {
  const breakdown = getCoinBreakdown(amount);

  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-4 space-y-2">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        合計: ${amount.toFixed(2)}
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {breakdown.map((coin) => (
          <CoinIllustration
            key={coin.label}
            label={coin.label}
            count={coin.count}
          />
        ))}
      </div>
    </div>
  );
};

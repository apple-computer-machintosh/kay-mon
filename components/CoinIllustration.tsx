interface CoinIllustrationProps {
  label: string;
  count: number;
}

export const CoinIllustration = ({ label, count }: CoinIllustrationProps) => {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 px-2.5 py-2">
      <div className="w-9 h-9 rounded-full border-2 border-amber-400 bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-[11px] font-bold text-amber-700 dark:text-amber-300">
        {label}
      </div>
      <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">
        × {count}
      </p>
    </div>
  );
};

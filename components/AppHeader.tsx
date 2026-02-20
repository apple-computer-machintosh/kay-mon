"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowsRightLeftIcon, CameraIcon } from "@heroicons/react/24/solid";

interface AppHeaderProps {
  storeName: string;
}

export const AppHeader = ({ storeName }: AppHeaderProps) => {
  const pathname = usePathname();
  const isScanner = pathname === "/";
  const isCompare = pathname === "/compare";

  return (
    <header className="w-full bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,0.95)_50%,rgba(255,255,255,0.7)_100%)] dark:bg-[linear-gradient(180deg,rgba(24,24,27,0.98)_0%,rgba(24,24,27,0.98)_50%,rgba(24,24,27,0)_100%)] px-6 py-5 pb-18">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs text-gray-400">今いるスーパーマーケット</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {storeName}
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-gray-100 dark:bg-zinc-800 p-1">
          <Link
            href="/"
            aria-label="スキャナー"
            className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
              isScanner
                ? "bg-black text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            <CameraIcon className="w-5 h-5" />
          </Link>
          <Link
            href="/compare"
            aria-label="比較"
            className={`flex items-center justify-center w-12 h-12 rounded-full transition ${
              isCompare
                ? "bg-black text-white"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white"
            }`}
          >
            <ArrowsRightLeftIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

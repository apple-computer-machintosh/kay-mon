"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const modes = [
  { href: "/", label: "スキャナー" },
  { href: "/compare", label: "比較モード" },
];

export const ModeSegment = () => {
  const pathname = usePathname();

  return (
    <div className="inline-flex rounded-lg border border-gray-300 dark:border-zinc-700 p-1 bg-white dark:bg-zinc-900">
      {modes.map((mode) => {
        const isActive = pathname === mode.href;

        return (
          <Link
            key={mode.href}
            href={mode.href}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800"
            }`}
          >
            {mode.label}
          </Link>
        );
      })}
    </div>
  );
};

"use client";

import { USER_SETUP_STORAGE_KEY, UserSetup } from "@/lib/user-setup";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const InitialSetupForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [memo, setMemo] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const setupData: UserSetup = {
      name: name.trim(),
      allergies: allergies.trim(),
      memo: memo.trim(),
      completedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      USER_SETUP_STORAGE_KEY,
      JSON.stringify(setupData),
    );
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          名前（任意）
        </label>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
          placeholder="例: ひと"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          アレルギー情報（必須）
        </label>
        <textarea
          required
          value={allergies}
          onChange={(event) => setAllergies(event.target.value)}
          className="w-full min-h-24 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
          placeholder="例: 卵、乳、小麦"
        />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
          メモ（任意）
        </label>
        <textarea
          value={memo}
          onChange={(event) => setMemo(event.target.value)}
          className="w-full min-h-20 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-sm"
          placeholder="例: ピーナッツは避けたい"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 transition"
      >
        初期設定を保存してはじめる
      </button>
    </form>
  );
};

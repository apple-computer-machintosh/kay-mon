import { InitialSetupForm } from "@/components/InitialSetupForm";

export default function SetupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-zinc-50 dark:bg-black font-sans">
      <main className="w-full max-w-3xl flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-teal-400">
          はじめての設定
        </h1>

        <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            初回利用時の設定です。アレルギー情報を入力しておくと、今後の機能拡張で活用できます。
          </p>
          <InitialSetupForm />
        </div>
      </main>
    </div>
  );
}

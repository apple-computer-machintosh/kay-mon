import { BarcodeCompareScanner } from "@/components/BarcodeCompareScanner";
import { AppHeader } from "@/components/AppHeader";
import { SetupGate } from "@/components/SetupGate";

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-black font-sans">
      <SetupGate>
        <div className="w-full">
          <AppHeader storeName="Hankook" />
        </div>

        <main className="w-full max-w-3xl flex flex-col items-center gap-8 px-6 py-8">
          <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6">
            <BarcodeCompareScanner />
          </div>
        </main>
      </SetupGate>
    </div>
  );
}

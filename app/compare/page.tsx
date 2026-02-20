import { BarcodeCompareScanner } from "@/components/BarcodeCompareScanner";
import { ModeSegment } from "@/components/ModeSegment";
import { SetupGate } from "@/components/SetupGate";

export default function ComparePage() {
  return (
    <div className="flex min-h-screen flex-col items-center p-8 bg-zinc-50 dark:bg-black font-sans">
      <main className="w-full max-w-3xl flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-teal-400">
          Compare Products
        </h1>

        <SetupGate>
          <ModeSegment />

          <div className="w-full bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6">
            <BarcodeCompareScanner />
          </div>
        </SetupGate>
      </main>
    </div>
  );
}

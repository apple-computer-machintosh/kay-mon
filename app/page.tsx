import { BarcodeScanner } from "@/components/BarcodeScanner";
import { AppHeader } from "@/components/AppHeader";
import { CartBottomDrawerContainer } from "@/components/CartBottomDrawerContainer";
import { SetupGate } from "@/components/SetupGate";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black font-sans">
      <SetupGate>
        <main className="relative w-full h-svh">
          <div className="absolute inset-x-0 top-0 z-20 pointer-events-auto">
            <AppHeader storeName="Hankook" />
          </div>
          <div className="absolute inset-0 z-0">
            <BarcodeScanner />
          </div>
          <div className="absolute bottom-0 z-20">
            <CartBottomDrawerContainer />
          </div>
        </main>
      </SetupGate>
    </div>
  );
}

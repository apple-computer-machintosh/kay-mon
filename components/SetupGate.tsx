"use client";

import { USER_SETUP_STORAGE_KEY } from "@/lib/user-setup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface SetupGateProps {
  children: React.ReactNode;
}

export const SetupGate = ({ children }: SetupGateProps) => {
  const router = useRouter();

  const hasSetup =
    typeof window !== "undefined" &&
    Boolean(window.localStorage.getItem(USER_SETUP_STORAGE_KEY));

  useEffect(() => {
    if (!hasSetup) {
      router.replace("/setup");
    }
  }, [hasSetup, router]);

  if (!hasSetup) {
    return null;
  }

  return <>{children}</>;
};

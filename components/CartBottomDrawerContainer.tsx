"use client";

import { useEffect, useState } from "react";
import { CartBottomDrawer } from "./CartBottomDrawer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const CART_STORAGE_KEY = "cart-items";
const CART_UPDATE_EVENT = "cart-items-updated";

const getCartItems = (): CartItem[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const raw = window.localStorage.getItem(CART_STORAGE_KEY);
  return raw ? (JSON.parse(raw) as CartItem[]) : [];
};

export const CartBottomDrawerContainer = () => {
  const [items, setItems] = useState<CartItem[]>(() => getCartItems());

  useEffect(() => {
    const refresh = () => setItems(getCartItems());
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== CART_STORAGE_KEY) {
        return;
      }
      refresh();
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(CART_UPDATE_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CART_UPDATE_EVENT, refresh);
    };
  }, []);

  return <CartBottomDrawer items={items} />;
};

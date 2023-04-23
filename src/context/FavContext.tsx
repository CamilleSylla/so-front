import React, { useState, createContext, ReactNode } from "react";
import Stripe from "stripe";

type FavContextType = {
    items: Stripe.Product[];
    setItems: React.Dispatch<React.SetStateAction<Stripe.Product[]>>;
}

export const FavContext = createContext<FavContextType>({} as FavContextType);

export function FavProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Stripe.Product[]>([]);
  return (
    <FavContext.Provider value={{ items, setItems }}>{children}</FavContext.Provider>
  );
}
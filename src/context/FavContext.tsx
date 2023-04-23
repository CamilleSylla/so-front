import React, { useState, createContext, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";

type FavContextType = [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>
];

export const FavContext = createContext<FavContextType>({} as FavContextType);

export function FavProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["fav_products"]);
  const favCookies = cookies.fav_products;
  useEffect(() => {
    setItems(favCookies)
  }, [favCookies])
  
  return (
    <FavContext.Provider value={[items, setItems]}>
      {children}
    </FavContext.Provider>
  );
}

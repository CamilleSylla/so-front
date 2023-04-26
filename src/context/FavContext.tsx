import React, { useState, createContext, ReactNode, useEffect } from "react";
import { useCookies } from "react-cookie";
import Stripe from "stripe";

type FavContextType = [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>,
  {product: Stripe.Product, price : any}[]
];

export const FavContext = createContext<FavContextType>({} as FavContextType);

export function FavProvider({ children }: { children: ReactNode }) {
  const [favIds, setFavIds] = useState<string[]>([]);
  const [products, setProducts] = useState<{product: Stripe.Product, price : any}[]>([]);
  const [cookies, setCookie, removeCookie] = useCookies(["fav_products"]);
  const favCookies = cookies.fav_products;
  useEffect(() => {
    setFavIds(favCookies);
  }, [favCookies]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
          favIds.map(async (id) => {
            const res = await fetch(`/api/stripe/products/${id}`);
            const product = await res.json();
            return { product, price: null };
          })
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [favIds]);

  return (
    <FavContext.Provider value={[favIds, setFavIds, products]}>
      {children}
    </FavContext.Provider>
  );
}

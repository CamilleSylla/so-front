import Nav from "@/components/Nav";
import { FavProvider } from "@/context/FavContext";
import { FilterProvider } from "@/context/ProductsFiltersContext";
import "@/styles/globals.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  },[])
  return (
    <FavProvider>
      <FilterProvider>
        <Nav />
        <main className="w-full">
          <Component {...pageProps} />
        </main>
      </FilterProvider>
    </FavProvider>
  );
}

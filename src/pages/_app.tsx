import Nav from "@/components/Nav";
import { FavProvider } from "@/context/FavContext";
import { FilterProvider } from "@/context/ProductsFiltersContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
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

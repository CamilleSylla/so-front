import Stripe from "stripe";
import { Prices } from "../../types";
import ProductCard from "./ProductCard";
import { useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ProductListRow({
  title,
  data,
}: {
  title: string;
  data: { products: Stripe.Product[]; prices: Prices[]; next_page: string };
}) {
  const { products, prices } = data;
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTo, setScrollTo] = useState(0);
  const [divs, setDivs] = useState<Element[] | null>(null);

  useEffect(() => {
    const divsToArray = Array.from(itemsContainerRef.current?.children ?? []);
    setDivs(divsToArray);
  }, [itemsContainerRef]);

  useEffect(() => {
    if (itemsContainerRef.current && divs?.length) {
            const next =
              divs[scrollTo].getBoundingClientRect().left -
              itemsContainerRef.current.getBoundingClientRect().left +
              itemsContainerRef.current.scrollLeft;
            itemsContainerRef.current.scrollTo({ left: next, behavior: "smooth" });
        
    }
  }, [scrollTo]);

  const handleNext = () => {
    if (divs) {
          if (scrollTo + 2 > Math.round(products.length / 2)) {
            setScrollTo(0);
          } else {
            setScrollTo(scrollTo + 1);
          }
      
    }
  };
  return (
    <div className="space-y-5">
    <section className="w-full flex pt-10">
      <div className="pl-28 pr-10 inline-block">
        <h3
          className="uppercase font-semibold text-3xl rotate-180"
          style={{ writingMode: "vertical-lr" }}
        >
          {title}
        </h3>
      </div>
      <div
        ref={itemsContainerRef}
        className={`flex-grow space-x-5 relative flex overflow-hidden ${products.length < 6 ? "justify-end" : "justify-start"}`}
      >
        
        {products.map((product, index) => {
          const price = prices.find((price) => price.id === product.id);
          return (
            <div className="w-1/4 flex-shrink-0">
              <ProductCard
                product={product}
                price={price as Prices}
                height="650px"
              />
            </div>
          );
        })}
      </div>
    </section>
    <div className=" space-x-5 ml-auto float-right">
          <button onClick={handleNext}>
            <ChevronRightIcon className="w-12 h-12 p-3 rounded-full border border-black hover:border-orange-300 stroke-black hover:stroke-white mr-5 hover:scale-90 duration-300 hover:bg-orange-300" />
          </button>
        </div>
    </div>
  );
}

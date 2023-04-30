import ProductCard from "@/components/ProductCard";
import Stripe from "stripe";
import { Prices } from "../../../types";
import { NextApiResponse } from "next";
import { Listbox, Popover } from "@headlessui/react";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FilterContext } from "@/context/ProductsFiltersContext";
import CatalogueFilter from "@/components/CatalogueFilter";
import filterConfig from "../../../config/filters.json";

export default function Catalogue({
  data,
}: {
  data: { products: Stripe.Product[]; prices: Prices[] };
}) {
  const [items, setItems] = useState<{
    products: Stripe.Product[];
    prices: Prices[];
  }>({ products: data.products || [], prices: data.prices || [] });
  const [next_page, setNextPage] = useState<string>();
  const [has_more, setHasMore] = useState<boolean>(false);
  const { products, prices } = items;
  const [filters] = useContext(FilterContext);
  const [sort, setSort] = useState<
    | "asc"
    | "desc"
    | "createdAtAsc"
    | "createdAtDesc"
    | "priceAsc"
    | "priceAsc"
    | null
  >(null);
  const sorts = [
    {
      label: "Nom A-Z",
      value: "asc",
    },
    {
      label: "Nom Z-A",
      value: "desc",
    },
    {
      label: "Plus récents",
      value: "createdAtDesc",
    },
    {
      label: "Plus anciens",
      value: "createdAtAsc",
    },
    {
      label: "Price croissant",
      value: "priceAsc",
    },
    // {
    //   label: "Price Z-A",
    //   value: "priceAsc",
    // },
  ];

  useEffect(() => {
    let sortedPrices: Prices[] = [];

    if (sort === "priceAsc") {      
      sortedPrices = [...prices].sort((a, b) => a.value *100 - b.value*100);
      
    }
    products.sort((a, b) => {
      if (sort === "asc") return a.name.localeCompare(b.name);
      if (sort === "desc") return b.name.localeCompare(a.name);
      if (sort === "createdAtAsc") return a.created - b.created;
      if (sort === "createdAtDesc") return b.created - a.created;
      if (sort === "priceAsc") {
        const indexA = sortedPrices.findIndex((p) => p.id === a.id);
        const indexB = sortedPrices.findIndex((p) => p.id === b.id);
        console.log(products, sortedPrices, sort);
        
        return indexA - indexB;
      }

      // if (sort === "priceAsc") return b.price - a.price;
    });
  }, [products, sort]);
  const fetchNextPage = () => {
    if (
      filters?.category?.length ||
      filters?.material?.length ||
      filters?.color?.length
    ) {
      fetch(`/api/stripe/products/list?next=${next_page}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...filters }),
      })
        .then((res) => res.json())
        .then((data) => {
          setItems({
            products: [...items.products, ...data?.products] || [],
            prices: [...items.prices, ...data?.prices] || [],
          });
          setNextPage(data.next_page);
          setHasMore(data.has_more);
        });
    } else {
      fetch(`/api/stripe/products/list?next=${next_page}`)
        .then((res) => res.json())
        .then((data) => {
          setItems({
            products: [...items.products, ...data?.products] || [],
            prices: [...items.prices, ...data?.prices] || [],
          });
          setNextPage(data.next_page);
          setHasMore(data.has_more);
        });
    }
  };

  useEffect(() => {
    setNextPage(data.next_page);
  }, []);

  useEffect(() => {
    if (
      filters?.category?.length ||
      filters?.material?.length ||
      filters?.color?.length
    ) {
      fetch("/api/stripe/products/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filters),
      })
        .then((res) => res.json())
        .then((data) => {
          setItems({
            products: data.products || [],
            prices: data.prices || [],
          });
          setNextPage(data.next_page);
          setHasMore(data.has_more);
        });
    } else {
      fetch(`/api/stripe/products/list`)
        .then((res) => res.json())
        .then((data) => {
          setItems({
            products: data.products || [],
            prices: data.prices || [],
          });
          setNextPage(data.next_page);
          setHasMore(data.has_more);
        });
    }
  }, [filters]);

  return (
    <div className="w-[90%] pb-20 mx-auto py-10 space-y-10">
      <div className="w-2/4 mx-auto">
        <h1 className="text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
          imperdiet elit
        </h1>
      </div>
      <div className="flex justify-between w-full relative">
        <FilterMenu />
        <Listbox value={sort} onChange={setSort}>
          <Listbox.Button className="relative cursor-default rounded-lg ring-gray-300 ring-1 bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            {sorts.find((type) => type.value === sort)?.label || "Trier"}
          </Listbox.Button>
          <Listbox.Options className="absolute right-0 top-full w-52 z-50 mt-2 shadow-md max-h-60 overflow-auto bg-white py-1 text-base ring-2 ring-gray-300 ring-opacity-5 focus:outline-none sm:text-sm">
            {sorts.map((type) => (
              <Listbox.Option key={type.label} value={type.value}>
                {({ selected }) => (
                  <>
                    <div className="flex p-3 gap-2 hover:bg-gray-300 duration-300 cursor-pointer">
                      <span className="text-amber-600 w-5">
                        {selected && (
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        )}
                      </span>
                      <span
                        className={`block truncate line-clamp-1 ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {type.label}
                      </span>
                    </div>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
      </div>
      <ProductList products={products} prices={prices} />
    </div>
  );
}

function FilterMenu() {
  const [_, setFilters] = useContext(FilterContext);

  const removeFilters = () => {
    setFilters({
      category: [],
      material: [],
      color: [],
    });
  };
  return (
    <Popover>
      <Popover.Button className="text-4xl font-semibold uppercase block">
        Filtres +
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-40 z-20" />
      <Popover.Panel className="fixed z-20 top-0 left-0 w-1/6 h-screen bg-gray-50">
        {({ close }) => (
          <div className=" w-4/6 mx-auto mb-5 space-y-2">
            <button
              onClick={() => close()}
              className="group p-1 rounded-full border-2 absolute top-0 right-0 mt-5 mr-5 border-gray-400 hover:border-red-500 duration-300"
            >
              <XMarkIcon className=" w-7 h-7 group-hover:stroke-red-500 duration-300" />
            </button>
            <span className="text-4xl font-semibold uppercase py-10 block">
              Filtres
            </span>
            <CatalogueFilter
              values={filterConfig.categories}
              type={"category"}
              label="Catégories"
            />
            <CatalogueFilter
              values={filterConfig.materials}
              type={"material"}
              label="Matériaux"
            />
            <CatalogueFilter
              values={filterConfig.colors}
              type={"color"}
              label="Couleurs"
            />
            <button
              onClick={removeFilters}
              className="w-full py-3 text-xs mx-auto rounded-md border border-black hover:bg-black hover:text-white duration-300 block uppercase"
            >
              Réinistialiser les filtres
            </button>
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
}

function ProductList({
  products,
  prices,
}: {
  products: Stripe.Product[];
  prices: Prices[];
}) {
  return (
    <div className=" w-full grid grid-cols-3 gap-x-5 gap-y-20">
      {products.map((product, index) => {
        const price = prices.find((price: Prices) => price.id === product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            price={price as Prices}
            height={"750px"}
          />
        );
      })}
    </div>
  );
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=3540'
  );
  
  const data = await fetch(
    `${process.env.BASE_FETCH_URL}/api/stripe/products/list`
  );

  return {
    props: {
      data: await data.json(),
    },
  };
}

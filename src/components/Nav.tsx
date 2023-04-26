import Image from "next/image";
import Link from "next/link";
import Icons from "@heroicons/react/24/outline";
import { useCookies } from "react-cookie";
import { Popover } from "@headlessui/react";
import ProductCardHorizontal from "./ProductCardHorizontal";
import Stripe from "stripe";
import { useContext, useEffect, useMemo, useState } from "react";
import { FavContext } from "@/context/FavContext";

export default function Nav() {
  return (
      <nav className="py-5 px-20 flex-1 mx-auto flex items-center gap-10 bg-amber-50">
        <Logo />
        <Links />
        <Action />
      </nav>
  );
}

function Action() {
    const [products, setProducts] = useState<{product : Stripe.Product, price: any}[]>([]);
  const [_,_f, productsFromContext] = useContext(FavContext);

  useEffect(() => {
    setProducts(productsFromContext);
  }, [productsFromContext]);
    

  return (
    <div className="">
      <Popover className="relative ">
        <Popover.Button>
          <div className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-slate-300 duration-300 bg-slate-100 bottom-2 right-2">
            <Icons.HeartIcon
              className={`${
                products.length ? " fill-red-800 stroke-red-800" : ""
              } w-3/5 h-3/5 duration-300`}
            />
          </div>
        </Popover.Button>
        <Popover.Panel className="absolute right-0 mt-5 z-50 max-h-[50vh] rounded-md bg-gray-100 overflow-y-auto  ring-2 ring-gray-300">
         {products?.map((product) => (
            <ProductCardHorizontal key={product.product.id} product={product} />
         ))}
        </Popover.Panel>
      </Popover>
    </div>
  );
}

function Logo() {
  return (
    <div className="relative h-10">
      <Image className=" object-cover" src="/images/logo.png" alt="logo" fill />
    </div>
  );
}

function Links() {
  return (
    <div className=" flex flex-grow  gap-4 font-medium uppercase text-sm">
      <Link href="/">Accueil</Link>
      <Link href="/catalogue">catalogue</Link>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>
  );
}

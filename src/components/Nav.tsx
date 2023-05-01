import Image from "next/image";
import Link from "next/link";
import Icons, { XMarkIcon } from "@heroicons/react/24/outline";
import { Popover, Transition } from "@headlessui/react";
import ProductCardHorizontal from "./ProductCardHorizontal";
import Stripe from "stripe";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { FavContext } from "@/context/FavContext";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  const [transparent, setTransparent] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  function handleScroll() {
    if (window.scrollY > 0) {
      setTransparent(false);
    }
    if (window.scrollY === 0) {
      setTransparent(true);
    }
  }

  useEffect(() => {
    if (router.pathname === "/") {
      setTransparent(true);
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      setTransparent(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.pathname]);

  return (
    <nav
      ref={navRef}
      className={`${
        !transparent ? "bg-gray-50" : ""
      } fixed top-0 left-0 z-50 w-full duration-300`}
    >
      <div className="flex w-[90%] mx-auto items-center justify-between py-3">
        <Links transparent={transparent} />
        <Logo transparent={transparent} />
        <Action />
      </div>
    </nav>
  );
}

function Action() {
  const [products, setProducts] = useState<
    { product: Stripe.Product; price: any }[]
  >([]);
  const [_, _f, productsFromContext] = useContext(FavContext);

  useEffect(() => {
    setProducts(productsFromContext);
  }, [productsFromContext]);

  return (
    <div className="w-1/3 flex justify-end">
      <Popover className="">
        <Popover.Button>
          <div className="w-10 h-10 flex justify-center items-center rounded-full hover:bg-slate-300 duration-300 bg-slate-100 bottom-2 right-2">
            <Icons.HeartIcon
              className={`${
                products.length ? " fill-red-800 stroke-red-800" : ""
              } w-3/5 h-3/5 duration-300`}
            />
          </div>
        </Popover.Button>
        <Transition
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        >
        <Popover.Overlay className="fixed inset-0 bg-black opacity-40" />
        <Popover.Panel className=" h-screen  absolute top-0 right-0 bg-gray-50 overflow-y-auto">
          {({ close }) => (
            <div className="flex flex-col">
              <div className="flex justify-between items-center mx-5 py-5">
                <span className="block text-xl font-medium">Mes favoris</span>
                <button
                  onClick={() => close()}
                  className="group p-1 rounded-full border-2 border-gray-400 hover:border-red-500 duration-300 bg-gray-50"
                >
                  <XMarkIcon className=" w-7 h-7 group-hover:stroke-red-500  duration-300" />
                </button>
              </div>
              <div className="flex-grow flex-shrink-0">
                {products?.map((product) => (
                  <ProductCardHorizontal
                    key={product.product.id}
                    product={product}
                  />
                ))}
              </div>
            </div>
          )}
        </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}

function Logo({ transparent }: { transparent: boolean }) {
  const textLogo = "sosaintquentin".split("");
  return (
    <Link href="/" className="w-1/3">
      <div
        className={`${
          transparent ? "text-white" : "text-black"
        } flex justify-center text-3xl font-medium uppercase gap-1 duration-300`}
      >
        {textLogo.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </Link>
  );
}

function Links({ transparent }: { transparent: boolean }) {
  const nav = [
    {
      label: "Accueil",
      href: "/",
    },
    {
      label: "Catalogue",
      href: "/catalogue",
    },
    {
      label: "About",
      href: "/a-propos",
    },
    {
      label: "Contact",
      href: "mailto:carmelosylla@gmail.com",
    },
  ];
  return (
    <div
      className={`${
        transparent ? "text-white" : "text-black"
      } flex w-1/3 gap-10 tracking-wider uppercase text-medium duration-300`}
    >
      {nav.map((link, index) => (
        <Link key={index} href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

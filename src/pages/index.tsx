import Image from "next/image";
import { Inter } from "next/font/google";
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useContext, useEffect, useRef, useState } from "react";
import Stripe from "stripe";
import { Prices } from "../../types";
import { NextApiResponse } from "next";
import ProductListRow from "@/components/ProductListRow";
import { useRouter } from "next/router";
import { FilterContext } from "@/context/ProductsFiltersContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  data,
  categoryProducts,
  categoryProductsName,
}: {
  data: { products: Stripe.Product[]; prices: Prices[]; next_page: string };
  categoryProducts: {
    products: Stripe.Product[];
    prices: Prices[];
    next_page: string;
  };
  categoryProductsName: string;
}) {
const router = useRouter();
const [_, setFiler] = useContext(FilterContext)
  const handleCategoryClick = (value : "Pull" | "T-Shirt") => {
    setFiler({ category: [value as string], material: [], color: [], sort: "" });
    router.push("/catalogue");
  }

  return (
    <div>
      <HomeHeroBanner />
      <Slogan />
        <ProductListRow title="Derniers produits" data={data} />
        <section className="flex justify-center py-32 px-20 w-full gap-5 bg-gray-100">
          <div
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(https://images.unsplash.com/photo-1495494527480-87e8644f0d99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80)`,
            }}
            className="flex-1 h-screen cursor-pointer"
            onClick={() => handleCategoryClick("Pull")}
          >
            <div className="w-full h-full bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center text-white space-y-10 text-center">
              <h3 className="text-6xl font-semibold">Pull SO'</h3>
              <p className="text-xl"><span className="block ">Ou le porter ?</span><span className="block">Partout</span></p>
            </div>
          </div>
          <div
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(https://images.unsplash.com/photo-1495494527480-87e8644f0d99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=683&q=80)`,
            }}
            className="flex-1 h-screen cursor-pointer"
            onClick={() => handleCategoryClick("Pull")}
          >
            <div className="w-full h-full bg-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center text-white space-y-10 text-center">
              <h3 className="text-6xl font-semibold">Pull SO'</h3>
              <p className="text-xl"><span className="block ">Ou le porter ?</span><span className="block">Partout</span></p>
            </div>
          </div>
        </section>
        <ProductListRow title={categoryProductsName} data={categoryProducts} />
    </div>
  );
}

function Slogan() {
  const [letterWidth, setLetterWidth] = useState<number>();
  const titleArray = "sosaintquentin".split("");
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (sectionRef.current) {
      const width = sectionRef.current.offsetWidth;
      const division = titleArray.length;
      setLetterWidth(Math.round((width / division) * 1.25));
    }
  }, [sectionRef, sectionRef?.current?.offsetWidth]);

  return (
    <section ref={sectionRef} className="relative w-full pt-44 pb-10 space-y-1">
      <h1
        style={{ fontSize: `${letterWidth}px` }}
        className="absolute z-10 w-full top-0 -translate-y-1/2 flex justify-between uppercase font-semibold text-orange-300"
      >
        {titleArray.map((letter, index) => (
          <span key={`${letter}-${index}`}>{letter}</span>
        ))}
      </h1>
      <figure className="mx-auto w-fit relative">
        <blockquote className=" font-Handwright text-8xl">
          <p className="">
            <span className="absolute -left-8 top-0">"</span>L'art de la mode
            <span className="absolute -right-8 top-0">"</span>
          </p>
        </blockquote>
      </figure>
      <div className=" w-48 h-48 mx-auto relative">
        <Image
          fill
          src="/static/assets/img/logo.png"
          alt="sosaintquentin-logo"
          className="object-contain"
        />
      </div>
    </section>
  );
}

function HomeHeroBanner() {
  return (
    <section className=" relative h-screen w-full">
      <Carousel />
    </section>
  );
}

function Carousel() {
  const [active, setActive] = useState(0);
  const carouselData = [
    {
      label:
        "Ceci est une evenement ou autre chose qui peux correspondre a n'importe quoi.",
      imgSrc:
        "https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
    {
      label: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      imgSrc:
        "https://images.unsplash.com/photo-1499781267481-c08f58e58be4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const handleNext = (side: "right" | "left") => {
    switch (side) {
      case "right":
        if (carouselData.length < active + 2) {
          setActive(0);
        } else {
          setActive(active + 1);
        }
        break;
      case "left":
        if (active === 0) {
          setActive(carouselData.length - 1);
        } else {
          setActive(active - 1);
        }
        break;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (carouselData.length < active + 2) {
        setActive(0);
      } else {
        setActive(active + 1);
      }
    }, 3000);
  }, [active]);
  return (
    <div className="absolute  top-0 left-0 h-full w-full">
      <div className="w-full flex justify-between absolute top-1/2 -translate-y-1/2 z-30">
        <button onClick={() => handleNext("left")}>
          <ChevronLeftIcon className=" w-16 h-16 p-5 rounded-full border border-white hover:border-orange-300 stroke-white ml-5 hover:scale-90 duration-300 hover:bg-orange-300 " />
        </button>
        <button onClick={() => handleNext("right")}>
          <ChevronRightIcon className="w-16 h-16 p-5 rounded-full border border-white hover:border-orange-300 stroke-white mr-5 hover:scale-90 duration-300 hover:bg-orange-300" />
        </button>
      </div>
      {carouselData.map((item, index) => (
        <div
          className={`${
            index === active ? "" : "opacity-0"
          } duration-300 ease-in`}
        >
          <div className="w-full h-full bg-black absolute z-10 opacity-5" />
          <Image
            fill
            className=" object-cover"
            alt="CarouselA"
            src={item.imgSrc}
          />
          <div className=" absolute bottom-0 z-20 w-2/5 left-1/2 -translate-x-1/2 mt-auto text-center space-y-10 pb-40">
            <span className="block text-white text-4xl font-semibold">
              {item.label}
            </span>
            <button className=" text-white font-medium text-large py-4 px-20 border-white  border rounded-md inline-block hover:bg-orange-300 duration-300">
              Consulter{" "}
              <span>
                <ArrowUpRightIcon className="ml-2 inline w-5" />
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps({ res }: { res: NextApiResponse }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3540"
  );

  const category = ["Robe"];

  const latestProducts = await fetch(
    `${process.env.BASE_FETCH_URL}/api/stripe/products/list/home`
  );

  const categoryProducts = await fetch(
    `${process.env.BASE_FETCH_URL}/api/stripe/products/list`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category }),
    }
  );

  return {
    props: {
      data: await latestProducts.json(),
      categoryProducts: await categoryProducts.json(),
      categoryProductsName: category[0],
    },
  };
}

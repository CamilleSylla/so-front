import { useState } from "react";
import Stripe from "stripe";
import { Prices } from "../../../../types";
import useCurrency from "@/composable/useCurrency";
import Image from "next/image";
import { NextApiResponse } from "next";
import ProductFavBtn from "@/components/ProductFavBtn";

export default function ProductPage({
  data,
}: {
  data: { product: Stripe.Product; price: Prices };
}) {
  const { product, price } = data;
  return (
    <section className="mt-5 py-20">
      <Presentation product={product} price={price} />
    </section>
  );
}

function Presentation({
  product,
  price,
}: {
  product: Stripe.Product;
  price: Prices;
}) {
  const [activeImg, setActiveImg] = useState<number>(0);

  return (
    <div className="w-full flex gap-12">
      <div className="w-[57.5%] grid grid-cols-2 gap-1">
        {product.images.map((image, index) => {
          if (index < 4) {
            return (
              <div className="w-full h-[750px] relative">
                <Image
                  fill
                  className=" object-cover"
                  src={image}
                  alt={product.name}
                />
              </div>
            );
          }
        })}
      </div>
      <PresentationContent product={product} price={price} />
    </div>
  );
}

function PresentationContent({
  product,
  price,
}: {
  product: Stripe.Product;
  price: Prices;
}) {
  return (
    <div className="flex-1 space-y-8 mr-40">
      <div>
        <div className="flex justify-between items-end h-fit">
          <h1>{product.name}</h1>
          <div className=" self-stretch flex flex-col justify-between text-right ">
            <p className=" text-xs">{product.id}</p>
            <span className=" font-semibold text-2xl">
              {useCurrency().formatCurrency(price.value, "fr-FR", price.cur)}
            </span>
          </div>
        </div>
        <h2 className=" text-2xl font-medium">{product.metadata?.category}</h2>
      </div>
      <ProductFavBtn sideSizes={50} productId={product.id} />

      <div className=" space-y-3">
        <h3 className="font-semibold text-xl">Description du produit</h3>
        <p className=" w-4/5">{product.description}</p>
      </div>
      <div className=" space-y-3">
        <h3 className=" font-semibold text-xl">Informations</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(product.metadata).map((key: string) => {
            const i18n = {
              category: "Catégorie",
              material: "Matériaux",
              color: "Couleur",
            };
            return (
              <p className=" text-sm bg-gray-100 rounded-md w-full py-3 px-4">
                {i18n[key]} :{" "}
                <span className=" font-semibold">{product.metadata[key]}</span>
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps({
  params,
  res,
}: {
  params: { id: string };
  res: NextApiResponse;
}) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=1800, stale-while-revalidate=3540"
  );
  const { id } = params;
  const data = await fetch(
    `${process.env.BASE_FETCH_URL}/api/stripe/products/${id}`
  );
  return {
    props: {
      data: await data.json(),
    },
  };
}

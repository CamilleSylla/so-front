import useCurrency from "@/composable/useCurrency";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Stripe from "stripe";
import ProductFavBtn from "./ProductFavBtn";

export default function ProductCardHorizontal({
  product,
}: {
  product: { product: { product: Stripe.Product; price: any } };
}) {
  const item = product.product.product;
  const { formatCurrency } = useCurrency();
  const price = product.product.price;

  return (
    <Link href={`/catalogue/${item.id}`}>
      <article className="flex gap-5 p-5 h-fit hover:bg-gray-300 duration-300">
        <div className="relative w-[100px] h-[150px]">
          <Image
            fill
            src={item?.images[0]}
            alt={item.name}
            className="object-cover"
          />
        </div>
        <div className=" w-[285px]  text-xs flex flex-col">
          <span className="block">{item.metadata.category}</span>
          <h2 className=" text-base">{item.name}</h2>
          <p className=" line-clamp-2 text-sm my-3">{item.description}</p>
          <div className="flex justify-between w-full self-center flex-grow">
            <h3 className="text-base font-semibold mt-auto">
              {formatCurrency(price.value, "fr-FR", price.cur)}
            </h3>
            <div className=" self-end">

            <ProductFavBtn sideSizes={25} productId={item.id} />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

import Link from "next/link";
import Stripe from "stripe";
import { Prices } from "../../types";
import useCurrency from "@/composable/useCurrency";
import Image from "next/image";
import Icons from "@heroicons/react/24/outline";
import ProductFavBtn from "./ProductFavBtn";

export default function ProductCard({
  product,
  price,
  height,
}: {
  product: Stripe.Product;
  price: Prices;
  height?: string;
}) {
  const locale = "fr-FR";
  const priceIntl = useCurrency().formatCurrency(
    price.value,
    locale,
    price.cur
  );
  return (
    <div className="flex h-full justify-center">
      <Link href={`/catalogue/${product.id}`} className="w-full">
        <article className=" w-full h-full bg-white  flex flex-col gap-2 cursor-pointer">
          <div style={{ height: height }} className="group w-full  relative overflow-hidden">
            <Image
              fill
              className={`object-cover ${!product.images[1] ? " group-hover:scale-125" : " group-hover:opacity-0"} z-10 duration-300`}
              src={product.images[0]}
              alt={product.name}
            />
            {product.images[1] && (
              <Image
                fill
                className=" object-cover"
                src={product.images[1]}
                alt={product.name}
              />
            )}
            <ProductFavBtn productId={product.id} absolute sideSizes={40} />
          </div>
          <div className="w-full">
            <h3 className=" text-sm font-light line-clamp-2 text-gray-800">
              {product.name.toUpperCase() + " - " + product.description}
            </h3>
          </div>
          <h5 className=" mt-auto">{priceIntl}</h5>
        </article>
      </Link>
    </div>
  );
}

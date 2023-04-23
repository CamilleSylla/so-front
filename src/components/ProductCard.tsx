import Link from "next/link";
import Stripe from "stripe";
import { Prices } from "../../types";
import useCurrency from "@/composable/useCurrency";
import Image from "next/image";

export default function ProductCard({
  product,
  price,
}: {
  product: Stripe.Product;
  price: Prices;
}) {
  const locale = "fr-FR";
  const priceIntl = useCurrency().formatCurrency(
    price.value,
    locale,
    price.cur
  );
  return (
    <div className="flex h-full  justify-center">
      <Link href={`/catalogue/${product.id}`}>
        <article className=" w-[325px] h-full bg-white  flex flex-col gap-2 cursor-pointer">
          <div className="w-full h-[400px] hover:opacity-70 duration-300 relative">
            <Image fill className=" object-cover" src={product.images[0]} alt={product.images[0]} />
          </div>
          <div>
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

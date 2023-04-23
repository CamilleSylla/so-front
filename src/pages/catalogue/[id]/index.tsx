import { useState } from "react";
import Stripe from "stripe";
import { RadioGroup } from "@headlessui/react";
import { Prices } from "../../../../types";
import useCurrency from "@/composable/useCurrency";

export default function ProductPage({
  data,
}: {
  data: { product: Stripe.Product; price: Prices };
}) {
  const { product, price } = data;
  return (
    <section className="mt-5 py-20 mx-auto max-w-[1366px]">
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
    <div className="w-full flex gap-8">
      <div className="w-[515px] flex flex-col gap-3">
        <img
          src={product.images[activeImg]}
          className=" w-full h-[650px] object-cover"
        />
        <RadioGroup value={activeImg} onChange={setActiveImg}>
          <RadioGroup.Label className="sr-only">
            Images Selector
          </RadioGroup.Label>
          <div className=" max-w-full overflow-x-auto whitespace-nowrap">
            {product.images.map((image, index) => (
              <RadioGroup.Option
                className={`${
                  index === product.images.length - 1 ? "" : " mr-3"
                } inline-block cursor-pointer`}
                key={image}
                value={index}
              >
                {({ checked }) => (
                  <img
                    src={image}
                    alt={product.name}
                    className={`${
                      checked ? " opacity-40" : ""
                    } w-20 h-20 object-cover`}
                  />
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
      <PresentationContent product={product} price={price} />
    </div>
  );
}

function PresentationContent({ product, price }: { product: Stripe.Product, price: Prices }) {
  return (
    <div className="flex-1 flex flex-col gap-5">
      <h1>{product.name}</h1>
      <p className=" w-4/5">{product.description}</p>
      <p>{"Référence Produit".toUpperCase() + " : " + product.id}</p>
      <h5 className=" font-semibold text-2xl">{useCurrency().formatCurrency(price.value, 'fr-FR', price.cur)}</h5>
    </div>
  );
}
export async function getServerSideProps({ params }:any) {
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

import ProductCard from "@/components/ProductCard";
import Stripe from "stripe";
import { Prices } from "../../../types";
import { NextApiResponse } from "next";

export default function Catalogue({
  data,
}: {
  data: { products: Stripe.Product[]; prices: Prices[] };
}) {
  const { products, prices } = data;
  return (
    <div className=" w-[90%] mt-5 py-20 mx-auto">
      <div className="">{/* @todo filter here */}</div>
      <ProductList products={products} prices={prices} />
    </div>
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

export async function getServerSideProps({res}: {res: NextApiResponse}) {
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

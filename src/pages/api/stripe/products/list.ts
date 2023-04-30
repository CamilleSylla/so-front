import Stripe from "stripe";

// Initialize the Stripe client with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export default async function handler(req, res) {
  let data: Stripe.Product[] = [];
  let next_page: string = "";
  let more = false;
  const { next: nextPageParam } = req.query;

  if (req.method === "POST") {
    const filters = req.body;
    const queryParts = Object.keys(filters)
      .filter((key) => filters[key].length > 0)
      .map((key) =>
        filters[key]
          .map((value: string) => `metadata['${key}']:'${value}'`)
          .join(" AND ")
      );
    
    const { data: products, next_page: next, has_more } = await stripe.products.search({
      query:  `active:'true'${
        queryParts.length > 0 ? " AND " : ""
      }${queryParts.join(" AND ")}`,
      limit: 9,
      page: nextPageParam,
    });
    more = has_more;
    next_page = next as string;
    data = products;
  }

  if (req.method === "GET") {
    try {
      const { data: products, next_page: next, has_more } = await stripe.products.search({
        query: `active:'true'`,
        limit: 9,
        page: nextPageParam,
      });

      more = has_more;
      next_page = next as string;
      data = products;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch products from Stripe" });
    }
  }
  const prices = await getPrices(data);
  res.status(200).json({ products: data, prices, next_page, has_more: more });
}

async function getPrices(data: Stripe.Product[]) {
  try {
    return await Promise.all(
      data.map(async (product) => {
        const price = await stripe.prices.list({ product: product.id });
        return {
          id: product.id,
          value: (Number(price.data[0].unit_amount) / 100).toFixed(2),
          cur: price.data[0].currency,
        };
      })
    );
  } catch (error) {
    console.log(error);
  }
}

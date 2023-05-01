import Stripe from "stripe";
import { getPrices } from ".";

// Initialize the Stripe client with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {});

export default async function handler(req, res) {
  let data: Stripe.Product[] = [];

  if (req.method === "GET") {
    try {
      const {
        data: products,
        next_page: next,
        has_more,
      } = await stripe.products.search({
        query: `active:'true'`,
        limit: 6,
      });
      data = products;
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch products from Stripe" });
    }
  }

  const prices = await getPrices(data);
  res.status(200).json({ products: data, prices });
}

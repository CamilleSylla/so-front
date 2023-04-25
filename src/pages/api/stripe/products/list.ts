import Stripe from "stripe";

// Initialize the Stripe client with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // Add any additional configuration options here, if needed
});

export default async function handler(req, res) {
  try {
    const { data } = await stripe.products.list({ active: true });
    const prices = await Promise.all(
      data.map(async (product) => {
          const price = await stripe.prices.list({product: product.id});
        return {
          id: product.id,
          value: (Number(price.data[0].unit_amount)/100).toFixed(2),
          cur: price.data[0].currency
        }
          
      })
    );
    res.status(200).json({ products: data, prices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products from Stripe" });
  }
}

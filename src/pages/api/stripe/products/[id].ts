import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // Add any additional configuration options here, if needed
  });

export default async function handler(req, res) {
    const { id } = req.query
    try {
        const product = await stripe.products.retrieve(id)
        const price = await stripe.prices.list({product: product.id});
        
        res.status(200).json({product, price : {
          id: product.id,
          value: (Number(price.data[0].unit_amount)/100).toFixed(2),
          cur: price.data[0].currency
        }})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch products from Stripe' })
    }
  }
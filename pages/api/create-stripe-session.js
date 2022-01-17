const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed" });
  }
  const { item, token } = req.body;

  const redirectURL = req.headers.origin;

  const transformedItem = {
    price_data: {
      currency: "eur",
      product_data: {
        images: [item.image],
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    description: item.description,
    quantity: item.quantity,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    mode: "payment",
    success_url: redirectURL + `?status=success&item=${item.label}&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: item.image,
      name: item.name,
      token: token,
    },
  });

  console.log("session", session);

  res.json({ id: session.id });
}

export default CreateStripeSession;

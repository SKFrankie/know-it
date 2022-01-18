const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getCustomer = async (req, res) => {
  const id = req.query.session_id;
  let customer = null;
  try {
    if (!id.startsWith("cs_")) {
      throw Error("Incorrect CheckoutSession ID.");
    }
    const session = await stripe.checkout.sessions.retrieve(id);
    customer = await stripe.customers.retrieve(session.customer);
  } catch (error) {
    console.log("error", error);
  }
  res.json({ customer: customer });
};

export default getCustomer;

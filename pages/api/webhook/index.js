import Stripe from "stripe";
import { buffer } from "micro";
import { gql } from "@apollo/client";
import {getSSRClient} from "../../../apollo-client";

const GET_PREMIUM = gql`
  mutation getPremium($years: Int, $months: Int, $days: Int, $hours: Int) {
    getPremium(years: $years, months: $months, days: $days, hours: $hours)
  }
`;


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    try {
      const signature = req.headers["stripe-signature"];
      const rawBody = await buffer(req);
      event = stripe.webhooks.constructEvent(
        rawBody.toString(),
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`❌ Error message: ${err.message}`);
      res.status(400).json({ message: `Webhook Error: ${err.message}` });
      return;
    }
    // Successfully constructed event
    console.log("✅ Success:", event.id);
    const session_id = event.data.object.id;
    console.log("session_id?", session_id);
    const { name, token } = event.data.object?.metadata;
    const payment_intent = event.data.object?.payment_intent;
    switch (event.type) {
      case "checkout.session.completed":
      // payment has been done
        getSSRClient(token)
          .then((client) => {
            return client.mutate({ mutation: GET_PREMIUM, variables: { years: 2 } });
          })
          .then((data) => {
            // customer gets his item
            console.log("data of curent suser", data);
          })
          .catch((err) => {
            console.log("error of current user", err);
            // something went wrong, we refund the customer
            stripe.refunds.create({
              payment_intent,
            }).then((refund) => {
              console.log("refund", refund, payment_intent);
            });
          });
        break;
      case "payment_intent.succeeded":
        console.log("PaymentIntent was successful!");
        break;
      case "payment_method.attached":
        console.log("PaymentMethod was attached to a Customer!");
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event.
    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ message: "Method not allowed" });
  }
}
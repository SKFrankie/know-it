import Stripe from "stripe";
import { buffer } from "micro";
import { gql } from "@apollo/client";
import {getSSRClient} from "../../../apollo-client";
import { PURCHASE_TYPES } from "../../../constants";

const GET_PREMIUM = gql`
  mutation getPremium($years: Int, $months: Int, $days: Int, $hours: Int) {
    getPremium(years: $years, months: $months, days: $days, hours: $hours)
  }
`;

const REWARD_USER = gql`
  mutation RewardUser($coins: Int, $stars: Int, $starPercentage: Int) {
    updateCurrentUser(coins: $coins, stars: $stars, starPercentage: $starPercentage) {
      coins
      stars
      starPercentage
    }
  }
`;


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getPurchase = async (item, token, payment_intent) => {
  let variables = {};
  let QUERY = GET_PREMIUM;
  switch (item.label) {
    case PURCHASE_TYPES.RECOVER_DOUBLE_GIFTS:
      variables = {
        coins: parseInt(item?.coins) || undefined,
        stars: parseInt(item?.stars) || undefined,
        starPercentage: parseInt(item?.starPercentage) || undefined,
      };
      QUERY = REWARD_USER;
      break;

    default:
      break;
  }
  getSSRClient(token)
    .then((client) => {
      console.log("variables", variables);
      console.log("QUERY", QUERY);
      return client.mutate({ mutation: QUERY, variables });
    })
    .then((data) => {
      // customer gets his item
      console.log("data of curent suser", data);
    })
    .catch((err) => {
      console.log("error of current user", err);
      // something went wrong, we refund the customer
      stripe.refunds
        .create({
          payment_intent,
        })
        .then((refund) => {
          console.log("refund", refund, payment_intent);
        });
    });
};

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
    const { name, token, label, coins, stars, starPercentage } = event.data.object?.metadata;
    const item = { name, label, coins, stars, starPercentage };
    const payment_intent = event.data.object?.payment_intent;
    switch (event.type) {
      case "checkout.session.completed":
        // payment has been done
        getPurchase(item,token, payment_intent);
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
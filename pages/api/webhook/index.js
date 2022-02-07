import Stripe from "stripe";
import { buffer } from "micro";
import { gql } from "@apollo/client";
import { getSSRClient } from "../../../apollo-client";

const GET_PREMIUM = gql`
  mutation GetPremium($years: Int, $months: Int, $days: Int, $hours: Int, $coins: Int) {
    getPremium(years: $years, months: $months, days: $days, hours: $hours)
    updateCurrentUser(coins: $coins) {
      coins
    }
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
  let variables = {
    coins: parseInt(item?.coins) || undefined,
    stars: parseInt(item?.stars) || undefined,
    starPercentage: parseInt(item?.starPercentage) || undefined,
  };
  let QUERY = REWARD_USER;
  if (item?.premium) {
    variables = {
      years: parseInt(item?.years) || undefined,
      months: parseInt(item?.months) || undefined,
      hours: parseInt(item?.hours) || undefined,
      ...variables,
    };
    QUERY = GET_PREMIUM;
  }

  getSSRClient(token)
    .then((client) => {
      return client.mutate({ mutation: QUERY, variables });
    })
    // .then((data) => {
    //   // customer gets his item
    //   console.log("data of curent suser", data);
    // })
    .catch((err) => {
      console.log("error of current user", err);
      // something went wrong, we refund the customer
      stripe.refunds.create({
        payment_intent,
      });
      // .then((refund) => {
      //   console.log("refund", refund, payment_intent);
      // });
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
    // const session_id = event.data.object.id;
    const item = event.data.object?.metadata;
    const payment_intent = event.data.object?.payment_intent;
    console.log("event", event)
    switch (event.type) {
      case "checkout.session.completed":
        // payment has been done
        console.log("purchase done")
        getPurchase(item, item.token, payment_intent);
        break;
      // case "payment_intent.succeeded":
      //   console.log("PaymentIntent was successful!");
      //   break;
      // case "payment_method.attached":
      //   console.log("PaymentMethod was attached to a Customer!");
      //   break;
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

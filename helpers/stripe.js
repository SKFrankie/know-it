import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

const createCheckOutSession = async (item) => {
  const stripe = await stripePromise;
  const checkoutSession = await axios.post('/api/create-stripe-session', {
    item: item,
  });
  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });
  if (result.error) {
    alert(result.error.message);
  }
};

const createCheckOutSessionForPremium = async () => {
  const item = {
    name: "Premium",
    quantity: 1,
    price: process.env.NEXT_PUBLIC_PREMIUM_PRICE,
    image: "https://i.imgur.com/2YqQ7Xb.png",
  };
  createCheckOutSession(item);
};

export { createCheckOutSessionForPremium };
export default createCheckOutSession;
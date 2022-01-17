import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(publishableKey);

const createCheckOutSession = async ( item, setLoading = (foo) => {}) => {
  setLoading(true);
  item.quantity = 1;
  const stripe = await stripePromise;
  const checkoutSession = await axios.post("/api/create-stripe-session", {
    item: item,
    token: localStorage.getItem("token"),
  });
  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });
  if (result.error) {
    alert(result.error.message);
  }
  setLoading(false);
};

const createCheckOutSessionForPremium = async (
  setLoading = (foo) => {},
  itemInfo = { name: "Test", price: "0.50" }
) => {
  const item = {
    ...itemInfo,
    quantity: 1,
  };
  console.log("item", item)
  createCheckOutSession(item, setLoading);
};

const getCustomer = async (setCustomer, id) => {
  const stripe = await stripePromise;
  console.log("get", id);
  const customer = await axios.get(`/api/get-stripe-customer?session_id=${id}`);
  console.log("vsomter", customer);
  setCustomer(customer);
};

export { createCheckOutSessionForPremium, getCustomer };
export default createCheckOutSession;
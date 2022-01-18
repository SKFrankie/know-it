import ShopContainer from "../../features/shop/ShopContainer";
import MoneyItems from "../../features/shop/MoneyItems";
import {PURCHASE_TYPES} from "../../constants";
import {useState} from "react"
const Money = () => {
  const sellingStars = [PURCHASE_TYPES.STARS_5, PURCHASE_TYPES.STARS_10, PURCHASE_TYPES.STARS_15];
  const sellingCoins = [PURCHASE_TYPES.COINS_250, PURCHASE_TYPES.COINS_500, PURCHASE_TYPES.COINS_750, PURCHASE_TYPES.COINS_1000];
  const [stripeLoading, setStripeLoading] = useState(false);
  return (
    <ShopContainer>
      <MoneyItems stripeLoading={stripeLoading} setStripeLoading={setStripeLoading} sellingItems={sellingStars} image="/images/star.png" title="Stars"/>
      <MoneyItems stripeLoading={stripeLoading} setStripeLoading={setStripeLoading} sellingItems={sellingCoins} image="/images/coin.png" title="Coins"/>
    </ShopContainer>
  );
};

export default Money;

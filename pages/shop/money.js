import ShopContainer from "../../features/shop/ShopContainer";
import MoneyItems from "../../features/shop/MoneyItems";
import {PURCHASE_TYPES} from "../../constants";
const Money = () => {
  const sellingStars = [PURCHASE_TYPES.STARS_5, PURCHASE_TYPES.STARS_10, PURCHASE_TYPES.STARS_15];
  const sellingCoins = [PURCHASE_TYPES.COINS_250, PURCHASE_TYPES.COINS_500, PURCHASE_TYPES.COINS_750, PURCHASE_TYPES.COINS_1000];
  return (
    <ShopContainer>
      <MoneyItems sellingItems={sellingStars} image="/images/star.png" title="Stars"/>
      <MoneyItems sellingItems={sellingCoins} image="/images/coin.png" title="Coins"/>
    </ShopContainer>
  );
};

export default Money;

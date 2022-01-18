import {useState} from "react"
import {Flex, Text} from "@chakra-ui/react";
import ShopContainer from "../../features/shop/ShopContainer";
import MoneyItems from "../../features/shop/MoneyItems";
import PremiumButtons from "../../features/shop/PremiumButtons";
import {PURCHASE_TYPES} from "../../constants";
import Button from "../../ui/Button";
const Money = () => {
  const sellingStars = [PURCHASE_TYPES.STARS_5, PURCHASE_TYPES.STARS_10, PURCHASE_TYPES.STARS_15];
  const sellingCoins = [PURCHASE_TYPES.COINS_250, PURCHASE_TYPES.COINS_500, PURCHASE_TYPES.COINS_750, PURCHASE_TYPES.COINS_1000];
  const [stripeLoading, setStripeLoading] = useState(false);
  return (
    <ShopContainer>
      <Flex direction="column" m={3} bg="deepDarkBlue" p={1} borderRadius={10} textAlign="center" align="center">
        <Text mb={2} fontSize="2xl" fontWeight="bold">
          Premium Plans
        </Text>
        <Text mb={2} fontSize="md" fontWeight="md">
          Get 10% more coins and enjoy playing without any ads!
        </Text>
        <Button mb={2} w="90%" display={{base: "flex", md: "none"}}>See More</Button>
        <PremiumButtons display={{base: "none", md: "flex"}} />
      </Flex>
      <MoneyItems
        stripeLoading={stripeLoading}
        setStripeLoading={setStripeLoading}
        sellingItems={sellingStars}
        image="/images/star.png"
        title="Stars"
      />
      <MoneyItems
        stripeLoading={stripeLoading}
        setStripeLoading={setStripeLoading}
        sellingItems={sellingCoins}
        image="/images/coin.png"
        title="Coins"
      />
    </ShopContainer>
  );
};

export default Money;

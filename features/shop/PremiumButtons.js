import React, {useState, useEffect} from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useUserContext } from "../../context/user";
import { PURCHASE_TYPES, PURCHASES } from "../../constants";
import createCheckOutSession from "../../helpers/stripe";

const PremiumButtons = ({ stripeLoading, setStripeLoading, ...props }) => {
  const packages = [
    PURCHASE_TYPES.HOURS_12_PREMIUM,
    PURCHASE_TYPES.MONTH_1_PREMIUM,
    PURCHASE_TYPES.YEAR_1_PREMIUM,
  ];
  return (
    <Flex justify="space-around" {...props}>
      {packages.map((item) => (
        <PremiumButton
          key={item}
          packageItem={item}
          setStripeLoading={setStripeLoading}
          stripeLoading={stripeLoading}
        />
      ))}
    </Flex>
  );
};

const PremiumButton = ({ packageItem, stripeLoading, setStripeLoading }) => {
  const [item, setItem] = useState(null);
  const [currentUser, setCurrentUser] = useUserContext();
  useEffect(() => {
    const tmpItem = PURCHASES[packageItem];
    const reward = { coins: currentUser.coins + tmpItem.bonusCoins };
    setItem({ reward, [tmpItem.type]: tmpItem.quantity, ...tmpItem });
  }, [packageItem, currentUser]);
  return (
    <Flex
      direction="column"
      bg="darkBlue"
      borderRadius={8}
      m={5}
      cursor="pointer"
      _hover={{ opacity: "0.8" }}
      onClick={
        stripeLoading || !item
          ? null
          : () => {
              createCheckOutSession(item, setStripeLoading);
            }
      }
    >
      <Flex
        direction="column"
        px={3}
        borderRadius={8}
        bg="blueClear.500"
        boxShadow="0px 2.95623px 2.95623px rgba(0, 0, 0, 0.25)"
      >
        <Text fontSize="sm" fontWeight="bold">
          {item?.name}
        </Text>
        <Text color="yellowStar" fontSize="xs">
          (+{item?.bonusCoins} coins)
        </Text>
      </Flex>
      <Text p={1} fontWeight="bold">
        {item?.price}€
      </Text>
    </Flex>
  );
};

export default PremiumButtons;

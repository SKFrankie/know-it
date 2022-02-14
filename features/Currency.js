import React, { useState, useEffect } from "react";
import { Flex, Image, Text, Progress } from "@chakra-ui/react";
import { useUserContext } from "../context/user";
import StarComplete from "./animations/StarComplete";
import { LinkOverlay } from "../ui/Link";

const Currency = ({
  src = "/images/star.png",
  alt = "star",
  quantity = 0,
  color = "yellowStar",
  fontSize = "sm",
  ...props
}) => {
  return (
    <Flex color={color} alignItems="center" mx={2} {...props}>
      <Image boxSize="30px" src={src} alt={alt} />
      <Text mx={1} color={color} fontSize={fontSize}>
        {quantity}
      </Text>
    </Flex>
  );
};

const StarCurrency = ({ quantity = 0, ...props }) => {
  const [currentUser] = useUserContext();
  quantity = currentUser.online && !quantity ? currentUser.stars : quantity;
  return (
    <LinkOverlay href="/knowlympics" alignSelf="center">
      <Currency cursor="pointer" quantity={quantity} {...props} />
    </LinkOverlay>
  );
};

const CoinCurrency = ({ quantity = 0, ...props }) => {
  const [currentUser] = useUserContext();
  quantity = currentUser.online && !quantity ? currentUser.coins : quantity;
  return (
    <LinkOverlay href="/shop/coins" alignSelf="center">
      <CoinCurrencyNoUser cursor="pointer" quantity={quantity} {...props} />
    </LinkOverlay>
  );
};

const CoinCurrencyNoUser = ({ quantity = 0, ...props }) => {
  return (
    <Currency quantity={quantity} color="#06B402" src="/images/coin.png" alt="coin" {...props} />
  );
};

const StarPercentage = ({ quantity = 0, ...props }) => {
  const [previousQuantity, setPreviousQuantity] = useState(quantity);
  const [animateStar, setAnimateStar] = useState(false);
  const [currentUser] = useUserContext();
  useEffect(() => {
    const tmpQuantity = currentUser?.starPercentage;
    if (tmpQuantity < previousQuantity) {
      setAnimateStar(true);
    } else {
      setAnimateStar(false);
    }
    setPreviousQuantity(tmpQuantity);
  }, [currentUser.starPercentage]);
  quantity = currentUser.online && !quantity ? currentUser.starPercentage : quantity;
  return (
    <Flex w="100%" {...props} alignItems="center" placeContent={{ base: "center", md: "initial" }}>
      <Progress
        size="md"
        borderRadius={10}
        w="50%"
        bg="#FCBF4977"
        colorScheme="yellowStarScheme"
        value={quantity}
        max="100"
        hasStripe
        isAnimated
      />
      <StarComplete isActive={animateStar} />
    </Flex>
  );
};

export default Currency;
export { StarCurrency, CoinCurrency, StarPercentage, CoinCurrencyNoUser };

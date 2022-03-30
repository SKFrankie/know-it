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
  rightIcon=false,
  ...props
}) => {
  return (
    <Flex color={color} alignItems="center" mx={2} {...props}>
      {!rightIcon && <Image boxSize="30px" src={src} alt={alt} /> }
      <Text mx={1} color={color} fontSize={fontSize}>
        {quantity}
      </Text>
      {rightIcon && <Image boxSize="30px" src={src} alt={alt} /> }
    </Flex>
  );
};

const StarCurrency = ({ quantity = null, ...props }) => {
  const [currentUser] = useUserContext();
  quantity = currentUser.online && quantity === null ? currentUser.stars : quantity;
  return (
    <LinkOverlay href="/knowlympics" alignSelf="center">
      <Currency cursor="pointer" quantity={quantity} {...props} />
    </LinkOverlay>
  );
};

const CoinCurrency = ({ quantity = null, ...props }) => {
  const [currentUser] = useUserContext();
  quantity = currentUser.online && quantity === null ? currentUser.coins : quantity;
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

const MedalCurrency = ({quantity = null, ...props}) => {
  const [currentUser] = useUserContext();
  quantity = currentUser.online && (quantity ===null) ? currentUser.points : quantity;
  return (
    <Currency rightIcon quantity={quantity} color="white" src="/images/medal.png" alt="medal" {...props} />
  );
}


const StarPercentage = ({ quantity = null, noAnimation=false, ...props }) => {
  const [previousQuantity, setPreviousQuantity] = useState(quantity);
  const [animateStar, setAnimateStar] = useState(false);
  const [currentUser] = useUserContext();
  useEffect(() => {
    if (noAnimation) {
      return;
    }
    const tmpQuantity = currentUser?.starPercentage;
    if (tmpQuantity < previousQuantity) {
      setAnimateStar(true);
    } else {
      setAnimateStar(false);
    }
    setPreviousQuantity(tmpQuantity);
  }, [currentUser.starPercentage]);
  quantity = currentUser.online && quantity === null ? currentUser.starPercentage : quantity;
  return (
    <Flex w="100%" alignItems="center" placeContent={{ base: "center", md: "initial" }}{...props} >
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
export { StarCurrency, CoinCurrency, StarPercentage, CoinCurrencyNoUser, MedalCurrency };

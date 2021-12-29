import { Flex, Image, Text, Progress } from "@chakra-ui/react";
import { useUserContext } from "../context/user";

const Currency = ({
  src = "/images/star.png",
  alt = "star",
  quantity = 0,
  color = "yellowStar",
  ...props
}) => {
  return (
    <Flex color={color} alignItems="center" mx={2} {...props}>
      <Image boxSize="30px" src={src} alt={alt} />
      <Text mx={1} color={color} fontSize="sm">
        {quantity}
      </Text>
    </Flex>
  );
};

const StarCurrency = ({ quantity = 0, ...props }) => {
  const [currentUser] = useUserContext()
  quantity = currentUser.online && !quantity ? currentUser.stars : quantity;
  return <Currency quantity={quantity} {...props} />;
};

const CoinCurrency = ({ quantity = 0, ...props }) => {
  const [currentUser] = useUserContext()
  quantity = currentUser.online && !quantity ? currentUser.coins : quantity;
  return (
    <Currency quantity={quantity} color="#06B402" src="/images/coin.png" alt="coin" {...props} />
  );
};

const StarPercentage = ({ quantity = 0, ...props }) => {
  const [currentUser] = useUserContext()
  quantity = currentUser.online && !quantity ? currentUser.starPercentage : quantity;
  return (
    <Flex w="100%" {...props} alignItems="center" placeContent={{base: "center", md:"initial"}}>
      <Progress size="md" borderRadius={10} w="50%" bg="#FCBF4977" colorScheme="yellowStarScheme" value={quantity} max="100" hasStripe />
      <Image boxSize="30px" src={"/images/star.png"} alt={"star"} />
    </Flex>
  );
};

export default Currency;
export { StarCurrency, CoinCurrency, StarPercentage };

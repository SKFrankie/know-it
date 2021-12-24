import { Flex, Image, Text } from "@chakra-ui/react";

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
  return <Currency quantity={quantity} {...props} />;
};

const CoinCurrency = ({ quantity = 0, ...props }) => {
  return (
    <Currency quantity={quantity} color="#06B402" src="/images/coin.png" alt="coin" {...props} />
  );
};

export default Currency;
export { StarCurrency, CoinCurrency };

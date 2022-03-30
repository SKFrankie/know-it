import React, { useState, useEffect } from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { PURCHASES } from "../../constants";
import Loading from "../Loading";
import createCheckOutSession from "../../helpers/stripe";
import { useUserContext } from "../../context/user";

const MoneyItems = ({ title, sellingItems, image, stripeLoading, setStripeLoading }) => {
  return (
    <Flex my={5} direction="column">
      <Text
        mb={3}
        fontSize={{ base: "xs", md: "3xl" }}
        fontWeight="bold"
        textAlign="center"
        color="yellowStar"
      >
        {title}
      </Text>
      <Flex justify="space-around" alignItems="center" flexWrap="wrap">
        {sellingItems.map((item) => (
          <MoneyItem
            key={item}
            sellingItem={item}
            image={image}
            stripeLoading={stripeLoading}
            setStripeLoading={setStripeLoading}
          />
        ))}
      </Flex>
    </Flex>
  );
};

const MoneyItem = ({ sellingItem, image, stripeLoading, setStripeLoading }) => {
  const [item, setItem] = useState(null);
  const [currentUser, setCurrentUser] = useUserContext();
  useEffect(() => {
    const tmpItem = PURCHASES[sellingItem];
    const reward = { [tmpItem.type]: currentUser[tmpItem.type] + tmpItem.quantity };
    setItem({ reward, ...tmpItem });
  }, [sellingItem, currentUser]);
  return (
    <Flex
      direction="column"
      justify="space-around"
      alignItems="center"
      fontWeight="bold"
      cursor="pointer"
      _hover={{ opacity: "0.8" }}
      mt={3}
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
        justify="space-around"
        alignItems="center"
        background="rgba(123, 148, 151, 0.25)"
        p={2}
        minW="5.5em"
      >
        <Image boxSize={{base: "50px", md:"150px"}} src={image} alt={item?.name} />
        <Text fontSize="xs">{item?.name}</Text>
      </Flex>
      <Text fontSize="sm">{item?.price}€</Text>
    </Flex>
  );
};

export default MoneyItems;

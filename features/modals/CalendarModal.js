import React from 'react'
import { Text, Flex, Image, Box} from "@chakra-ui/react";

import { useQuery, gql } from "@apollo/client";

import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Loading from "../Loading";
import Error from "../Error";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import GiftIcon from "../../ui/icons/GiftIcon";
import {REWARD_TYPES} from "../../constants.js";

const GIFTS = gql`
  query Gifts {
    gifts {
      giftId
      reward
      day
      quantity
    }
  }
`;
const recoverGiftHeight ="15vh"

const CalendarModal = ({isOpen=false, onClose, ...props}) => {
  const {data, loading, error } = useQuery(GIFTS, {
    ...basicQueryResultSupport,
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <Flex direction="column" textAlign="center" alignItems="center">
        <Flex alignItems="center">
          <GiftIcon boxSize="20" display={{ base: "none", md: "flex" }} />{" "}
          <Text fontWeight="bold" fontSize={{ base: "4xl", md: "6xl" }}>
            Daily Gift
          </Text>
        </Flex>
        <GiftIcon boxSize="20" display={{ base: "flex", md: "none" }} />
        <RecoverGifts />
        {loading && <Loading />}
        {error && <Error />}
        {data && (
          <Flex flexWrap="wrap" my={5} mx={{base: 0, md: 6}} p={{base: 0, md: 2}}>
            {data.gifts.map((gift) => (
              <Reward key={gift.giftId} reward={gift.reward} quantity={gift.quantity} />
            ))}
          </Flex>
        )}
        <Box h={{ base: "0", md: recoverGiftHeight }} />
      </Flex>
    </Modal>
  );
}

const RecoverGifts = ({...props}) => {
  return (
    <Flex
      maxH={{ base: "auto", md: recoverGiftHeight }}
      position={{ base: "initial", md: "absolute" }}
      bottom="0"
      borderRadius={{ base: 21, md: 0 }}
      bg="darkBlue"
      m={{ base: 3, md: 0 }}
      p={3}
      w="100%"
      direction="column"
      textAlign="center"
      alignItems="center"
      {...props}
    >
      <Text fontSize={{ base: "md", md: "lg" }}>
        Recover your lost gifts and double the gifts you received!
      </Text>
      <Button w={{ base: "80%", md: "40%" }} m={3}>
        3,99€
      </Button>
    </Flex>
  );
}

const Reward = ({
  reward="COINS",
  quantity = 0,
  color = "#06B402",
  received=false,
  ...props
}) => {
  const {image, name} = REWARD_TYPES[reward]
  return (
    <Flex
      py={2}
      px={4}
      borderRadius={4}
      bg={received ? "orange" : "darkBlue"}
      color={color}
      alignItems="center"
      m={2}
      direction="column"
      {...props}
    >
      <Image boxSize={{base:"30px", md:"55px"}} src={image} alt={name} />
      <Text mx={1} color={color} fontSize="md">
        x{quantity}
      </Text>
    </Flex>
  );
};

export default CalendarModal

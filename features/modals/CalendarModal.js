import React, { useEffect, useState } from "react";
import { Text, Flex, Image, Box, useDisclosure } from "@chakra-ui/react";

import { useQuery, useMutation, gql } from "@apollo/client";
import { createCheckOutSessionForPremium } from "../../helpers/stripe";

import { useUserContext } from "../../context/user";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Loading from "../Loading";
import Error from "../Error";
import Modal, { PopUp } from "../../ui/Modal";
import Button from "../../ui/Button";
import GiftIcon from "../../ui/icons/GiftIcon";
import { REWARD_TYPES } from "../../constants";

const GIFTS = gql`
  query Gifts {
    gifts(options: { sort: { day: ASC } }) {
      giftId
      reward
      day
      quantity
    }
  }
`;

const UPDATE_LAST_SEEN = gql`
  mutation UpdateLastSeen($daysInArow: Int) {
    updateLastSeen(daysInArow: $daysInArow) {
      lastSeen
      daysInArow
    }
  }
`;

const REWARD_USER = gql`
  mutation RewardUser($coins: Int, $stars: Int, $starPercentage: Int) {
    updateCurrentUser(coins: $coins, stars: $stars, starPercentage: $starPercentage) {
      coins
      stars
      starPercentage
    }
  }
`;

const recoverGiftHeight = "15vh";

const CalendarModal = ({ isCalendarOpen = false, onCalendarClose, ...props }) => {
  const [todayGift, setTodayGift] = useState(null);

  const giveGift = () => {
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useQuery(GIFTS, {
    ...basicQueryResultSupport,
  });
  const [UpdateLastSeen] = useMutation(UPDATE_LAST_SEEN, {
    onCompleted(data) {
      setCurrentUser({ ...currentUser, ...data.updateLastSeen });
    },
    ...basicQueryResultSupport,
  });
  const [currentUser, setCurrentUser] = useUserContext();

  useEffect(() => {
    // Check if it's a new day and user deserves his gift!
    if (!data) {
      return;
    }

    if (!currentUser.lastSeen || !currentUser.daysInArow) {
      // first time
      UpdateLastSeen({ variables: { daysInArow: 1 } }).then(() => {
        giveGift();
      });
      return;
    }
    const lastSeenDate = new Date(currentUser.lastSeen);
    const today = new Date();
    if (
      today.getMonth() !== lastSeenDate.getMonth() ||
      today.getYear() !== lastSeenDate.getYear()
    ) {
      // New month!
      UpdateLastSeen({ variables: { daysInArow: 1 } }).then(() => {
        giveGift();
      });
      return;
    }
    const daysInArow = today.getDate() > lastSeenDate.getDate() ? currentUser.daysInArow + 1 : null;
    if (daysInArow) {
      // New day!
      UpdateLastSeen({ variables: { daysInArow } }).then(() => {
        giveGift();
      });
      return;
    }
    // same day, no gifts
    UpdateLastSeen();
  }, [data]);

  useEffect(() => {
    if (currentUser.daysInArow > data?.gifts.length) {
      //no more gift this month for this user
      setTodayGift(null);
      return;
    }
    const tmpGift = data?.gifts.find((gift) => gift.day === currentUser.daysInArow);
    setTodayGift(tmpGift);
  }, [data, currentUser.daysInArow]);

  return (
    <Modal isOpen={isCalendarOpen} onClose={onCalendarClose} {...props}>
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
          <Flex
            flexWrap="wrap"
            my={5}
            mx={{ base: 0, md: 6 }}
            p={{ base: 0, md: 2 }}
            justify="center"
          >
            {data.gifts.map((gift) => (
              <Reward
                key={gift.giftId}
                reward={gift.reward}
                quantity={gift.quantity}
                received={gift.day <= (currentUser?.daysInArow || 0)}
                day={gift.day}
              />
            ))}
          </Flex>
        )}
        <Box h={{ base: "0", md: recoverGiftHeight }} />
        <GiftPopUp gift={todayGift} isOpen={isOpen} onClose={onClose} />
      </Flex>
    </Modal>
  );
};

const GiftPopUp = ({
  isOpen,
  onClose,
  gift = { reward: "STAR_PERCENTAGE", quantity: 0 },
  ...props
}) => {
  const [giftGiven, setGiftGiven] = useState(false);
  const [currentUser, setCurrentUser] = useUserContext();
  const [RewardUser] = useMutation(REWARD_USER, {
    onCompleted(data) {
      setCurrentUser({ ...currentUser, ...data.updateCurrentUser });
    },
    ...basicQueryResultSupport,
  });
  const giveGift = () => {
    setGiftGiven(true);
    const { label } = REWARD_TYPES[gift?.reward || "COINS"];
    if (gift?.reward === "STAR_PERCENTAGE" && currentUser?.starPercentage + gift?.quantity > 100) {
      const tmpStarPercentage = currentUser?.starPercentage + gift?.quantity;
      RewardUser({
        variables: {
          stars: currentUser.stars + parseInt(tmpStarPercentage / 100),
          starPercentage: tmpStarPercentage % 100,
        },
      });
      return;
    }
    const values = { [label]: currentUser[label] + gift?.quantity || 0 };
    RewardUser({ variables: values });
  };

  useEffect(() => {
    if (isOpen && gift?.quantity && !giftGiven) {
      giveGift();
    }
  }, [gift, isOpen]);
  return (
    <PopUp isOpen={isOpen} onClose={onClose} {...props}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={{ base: 5, md: 10 }}
      >
        {gift ? (
          <>
            <Text fontSize="xl" fontWeight="bold">
              You've earned a gift!
            </Text>
            <Reward reward={gift.reward} quantity={gift.quantity} w="fit-content" received />
          </>
        ) : (
          <Text fontSize="xl" fontWeight="bold">
            You got everything, congrats! Wait till next month to get your gift!
          </Text>
        )}
      </Flex>
    </PopUp>
  );
};

const RecoverGifts = ({ ...props }) => {
  const [stripeLoading, setStripeLoading] = useState(false);
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
      <Button isLoading={stripeLoading} onClick={() => {createCheckOutSessionForPremium(setStripeLoading)}} w={{ base: "80%", md: "40%" }} m={3}>
        3,99€
      </Button>
    </Flex>
  );
};

const Reward = ({
  reward = "STARS",
  quantity = 0,
  color = "#06B402",
  received = false,
  day = 0,
  ...props
}) => {
  const { image, name } = REWARD_TYPES[reward];
  return (
    <Flex direction="column" alignItems="center" justify="center">
      <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
        Day {day}
      </Text>
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
        <Image boxSize={{ base: "30px", md: "55px" }} src={image} alt={name} />
        <Text mx={1} color={color} fontSize={{ base: "sm", md: "md" }}>
          x{quantity}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CalendarModal;

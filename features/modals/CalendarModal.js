import React, { useEffect, useState } from "react";
import { Text, Flex, Image, Box, useDisclosure } from "@chakra-ui/react";

import { useQuery, useMutation, gql } from "@apollo/client";
import createCheckOutSession from "../../helpers/stripe";

import { useUserContext } from "../../context/user";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import daysUntilNextMonth from "../../helpers/daysUntilNextMonth";
import Loading from "../Loading";
import Error from "../Error";
import Modal, { PopUp } from "../../ui/Modal";
import Button from "../../ui/Button";
import GiftIcon from "../../ui/icons/GiftIcon";
import { REWARD_TYPES, PURCHASE_TYPES, PURCHASES } from "../../constants";
import Confetti from "../animations/Confetti";

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

const computeTotalGifts = (gifts) => {
  const total = { coins: 0, stars: 0, starPercentage: 0 };
  gifts.forEach((gift) => {
    const label = REWARD_TYPES[gift.reward].label;
    total[label] = total[label] + gift.quantity;
  });
  return total;
};

const CalendarModal = ({ isCalendarOpen = false, onCalendarClose, ...props }) => {
  const [todayGift, setTodayGift] = useState(null);
  const [totalGifts, setTotalGifts] = useState(null);

  const giveGift = () => {
    onOpen();
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useQuery(GIFTS, {
    onCompleted(data) {
      setTotalGifts(computeTotalGifts(data.gifts));
    },
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
    if (!data || !isCalendarOpen) {
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
    if ( today.getMonth() !== lastSeenDate.getMonth() || today.getYear() !== lastSeenDate.getYear() ) {
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
  }, [data, isCalendarOpen]);

  useEffect(() => {
    if (currentUser.daysInArow > data?.gifts.length) {
      //no more gift this month for this user
      // but he gets 5 coins anyway
      setTodayGift({ reward: "COINS", quantity: 5 });
      return;
    }
    const tmpGift = data?.gifts.find((gift) => gift.day === currentUser.daysInArow);
    setTodayGift(tmpGift);
  }, [data, currentUser.daysInArow]);

  // random gift title
  const [randomGiftTitle, setRandomGiftTitle] = useState("Gift of the day!");
  const giftTitles = ["Gift of the day!", "Claim your gift of the day!", "Here's a gift for you!"];
  useEffect(() => {
    setRandomGiftTitle(giftTitles[Math.floor(Math.random() * giftTitles.length)]);
  }, []);
  return (
    <Modal isOpen={isCalendarOpen} onClose={onCalendarClose} {...props}>
      <Text ml="auto" fontSize="md" my={5}>
        Reset in {daysUntilNextMonth()} days
      </Text>
      <Flex p="1rem" direction="column" textAlign="center" alignItems="center">
        <Flex alignItems="center">
          <GiftIcon boxSize="20" display={{ base: "none", lg: "flex" }} />{" "}
          <Text fontWeight="bold" fontSize={{ base: "4xl", lg: "6xl" }}>
            {randomGiftTitle}
          </Text>
        </Flex>
        <GiftIcon boxSize="20" display={{ base: "flex", lg: "none" }} />
        {/* <RecoverGifts totalGifts={totalGifts} /> */}
        {loading && <Loading />}
        {error && <Error />}
        {data && (
          <Flex
            flexWrap="wrap"
            my={5}
            mx={{ base: 0, lg: 6 }}
            p={{ base: 0, lg: 2 }}
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
        <Text fontSize="xs" my={5} color="white" fontWeight="semi-bold">
          5 bonus coins every day after the 25th day until reset
        </Text>
        <Box h={{ base: "0", lg: recoverGiftHeight }} />
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
        p={{ base: 5, lg: 10 }}
      >
        {gift ? (
          <>
            <Text fontSize="xl" fontWeight="bold">
              Here's a gift for you!
            </Text>
            <Reward
              reward={gift.reward}
              quantity={gift.quantity}
              w="auto"
              display="table"
              received
            />
          </>
        ) : (
          <Text fontSize="xl" fontWeight="bold">
            You got everything, congrats! Wait till next month to get your gift!
          </Text>
        )}
      </Flex>
      <Confetti />
    </PopUp>
  );
};

const RecoverGifts = ({ totalGifts, ...props }) => {
  const [currentUser] = useUserContext();
  const [item, setItem] = useState(null);
  useEffect(() => {
    const tmpItem = {
      ...PURCHASES[PURCHASE_TYPES.RECOVER_DOUBLE_GIFTS],
      description: `(${Object.keys(totalGifts)
        .map((key) => `${totalGifts[key]} ${key}`)
        .join(", ")})`,
    };
    const tmpStarPercentage = currentUser?.starPercentage + totalGifts.starPercentage;
    const reward = {
      stars: currentUser.stars + totalGifts?.stars + parseInt(tmpStarPercentage / 100),
      starPercentage: tmpStarPercentage % 100,
      coins: currentUser.coins + totalGifts.coins,
    };
    tmpItem.reward = reward;
    setItem(tmpItem);
  }, []);

  const [stripeLoading, setStripeLoading] = useState(false);
  return (
    <Flex
      maxH={{ base: "auto", lg: recoverGiftHeight }}
      position={{ base: "initial", lg: "absolute" }}
      bottom="0"
      borderRadius={{ base: 21, lg: 0 }}
      bg="darkBlue"
      m={{ base: 3, lg: 0 }}
      p={3}
      w="100%"
      direction="column"
      textAlign="center"
      alignItems="center"
      {...props}
    >
      <Text fontSize={{ base: "md", lg: "lg" }}>
        Purchase unclaimed gifts and double the ones you’ve received!
      </Text>
      <Button
        isLoading={stripeLoading || !item}
        onClick={() => {
          createCheckOutSession(item, setStripeLoading);
        }}
        w={{ base: "80%", lg: "40%" }}
        m={3}
      >
        {parseFloat(item?.price || 0)}€
      </Button>
    </Flex>
  );
};

const Reward = ({
  reward = "STARS",
  quantity = 0,
  color = "white",
  received = false,
  day = 0,
  ...props
}) => {
  const { image, name } = REWARD_TYPES[reward];
  return (
    <Flex direction="column" alignItems="center" justify="center">
      {day ? (
        <Text fontWeight="bold" fontSize={{ base: "sm", lg: "md" }}>
          Day {day}
        </Text>
      ) : null}
      <Flex
        py={2}
        px={4}
        borderRadius={4}
        bg={received ? "orange" : "darkBlue"}
        color={color}
        alignItems="center"
        m={2}
        direction="column"
        boxShadow="dark-lg"
        {...props}
      >
        <Image boxSize={{ base: "30px", lg: "55px" }} src={image} alt={name} />
        <Text mx={1} color={color} fontSize={{ base: "sm", lg: "md" }}>
          {quantity}
          {reward === "STAR_PERCENTAGE" ? "%" : ""}
        </Text>
      </Flex>
    </Flex>
  );
};

export default CalendarModal;

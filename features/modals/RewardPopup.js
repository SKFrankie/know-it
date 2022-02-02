import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { useUserContext } from "../../context/user";
import { AvatarImage } from "../shop/AvatarCollections";
import Modal from "../../ui/Modal";
import { Flex, Text } from "@chakra-ui/react";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Loading from "../Loading";
import Error from "../Error";
import Button from "../../ui/Button";
import Confetti from "../animations/Confetti";

const COLLECTION_DATA = `
      avatarCollectionId
      name
      avatars {
        avatarId
        picture
      }
`;

const GET_RANKING_REWARDS = gql`
  query GetRankingRewards {
    first: avatarCollections(where: { name_CONTAINS: "MONSTARS1" }) {
      ${COLLECTION_DATA}
    }
    second: avatarCollections(where: { name_CONTAINS: "MONSTARS2" }) {
      ${COLLECTION_DATA}
    }
    third: avatarCollections(where: { name_CONTAINS: "MONSTARS3" }) {
      ${COLLECTION_DATA}
    }
  }
`;

const GET_AVATAR_GIFT = gql`
  mutation GetAvatarGift($avatarId: ID!) {
    getAvatarGift(avatarId: $avatarId) {
      rankingGift
      inventory {
        avatarId
        picture
      }
    }
  }
`;

const RewardPopup = ({ isOpen, onClose, rankingGift = 0, ...props }) => {
  const [collection, setCollection] = useState([]);
  const [currentUser] = useUserContext();
  const { data, loading, error } = useQuery(GET_RANKING_REWARDS, {
    onCompleted: (data) => {
      switch (rankingGift) {
        case 1:
          setCollection(data.first[0].avatars);
          break;
        case 2:
          setCollection(data.second[0].avatars);
          break;
        case 3:
          setCollection(data.third[0].avatars);

          break;

        default:
          break;
      }
    },
    ...basicQueryResultSupport,
  });

  const rewardText = () => {
    let text;
    switch (rankingGift) {
      case 1:
        text = "the top";
        break;
      case 2:
        text = "the second place";
        break;
      case 3:
        text = "the third place";
        break;
      default:
        return "No gifts for you this time!";
    }
    return `Congratulations, you've reached ${text} of the ranking last time! Select your Monstar!`;
  };

  const AlreadyGotAllGigils = () => {
    // no need to display the modal if the user already has all the gifts
    for (const avatar of collection) {
      const notInInventory =
        currentUser.inventory.find((i) => i.avatarId === avatar.avatarId) === undefined;
      if (notInInventory) {
        // at least on is not in user inventory so we can display the modal
        return false;
      }
    }
    // all the gifts are in the user inventory so we can't display the modal
    return true;
  };

  return (
    <Modal isOpen={isOpen && !AlreadyGotAllGigils()} onClose={onClose} {...props}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={{ base: 5, md: 10 }}
      >
        <Text fontSize="xl" fontWeight="bold">
          You've earned a gift!
        </Text>
        <Text fontSize="sm">{rewardText()}</Text>
        {loading && <Loading />}
        {error && <Error />}
        <Flex flexWrap="wrap" justify="center">
          {collection.length
            ? collection.map((avatar) => (
                <Monstar key={avatar.avatarId} avatar={avatar} onClose={onClose} />
              ))
            : null}
        </Flex>
      </Flex>
      <Confetti />
    </Modal>
  );
};

const Monstar = ({ avatar, onClose }) => {
  const [currentUser, setCurrentUser, { refetch }] = useUserContext();
  const [canGet, setCanGet] = useState(false);
  useEffect(() => {
    const notInInventory =
      currentUser.inventory.find((i) => i.avatarId === avatar.avatarId) === undefined;
    setCanGet(notInInventory);
  }, [currentUser.inventory, avatar.avatarId]);

  const [getAvatarGift] = useMutation(GET_AVATAR_GIFT, {
    onCompleted: (data) => {
      setCanGet(false);
      setCanGet(false);
      refetch();
      onClose();
    },
    ...basicQueryResultSupport,
  });

  const handleClick = () => {
    if (canGet) {
      getAvatarGift({ variables: { avatarId: avatar.avatarId } });
    }
  };

  return (
    <Flex
      direction="column"
      cursor={canGet ? "pointer" : "initial"}
      m={3}
      bg="blueClear.500"
      p={1}
      filter={canGet ? "none" : "grayscale(100%);"}
      onClick={handleClick}
      _hover={{ bg: "orange" }}
    >
      <AvatarImage picture={avatar.picture} />
    </Flex>
  );
};

export default RewardPopup;

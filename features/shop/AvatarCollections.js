import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, Text, Image, useDisclosure, Box } from "@chakra-ui/react";
import Error from "../Error";
import Loading from "../Loading";
import { useUserContext } from "../../context/user";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import { PopUp } from "../../ui/Modal";
import { SuccessButton, CancelButton } from "../../ui/Button";

const AVATAR_COLLECTIONS = gql`
  query AvatarCollections {
    avatarCollections(options: { sort: { createdAt: DESC } }) {
      avatarCollectionId
      name
      createdAt
      startDate
      endDate
      avatars {
        avatarId
        name
        picture
        coinPrice
      }
    }
  }
`;

const BUY_AVATAR = gql`
  mutation BuyAvatar($avatarId: ID!, $price: Int!) {
    buyAvatar(avatarId: $avatarId, price: $price) {
      coins
      inventory {
        avatarId
      }
    }
  }
`;

const AvatarCollections = () => {
  const { loading, error, data } = useQuery(AVATAR_COLLECTIONS, {...basicQueryResultSupport});
  const now = new Date();
  if (loading) return <Loading />;
  if (error) return <Error />;
  return (
    <>
      {data?.avatarCollections.map((collection) => (
        <AvatarCollection key={collection.avatarCollectionId} now={now} collection={collection} />
      ))}
    </>
  );
};

const AvatarCollection = ({ collection, now }) => {
  const [display, setDisplay] = useState(false);
  useEffect(() => {
    //only display if between start and end date and avatars in the collection

    const superior = !collection.startDate || new Date(collection.startDate) <= now;
    const inferior = !collection.endDate || new Date(collection.endDate) >= now;
    setDisplay(superior && inferior && collection.avatars.length);
  }, []);
  return (
    <Flex my={2} display={display ? "flex" : "none"} direction="column">
      <Text fontSize="2xl" fontWeight="bold">{collection.name}</Text>
      <Flex flexWrap={{base: "nowrap", md: "wrap"}} overflow={{base: "scroll", md: "initial"}} w="100%">
        {collection.avatars.map((avatar) => (
          <Avatar key={avatar.avatarId} avatar={avatar} />
        ))}
      </Flex>
    </Flex>
  );
};

const Avatar = ({ avatar }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useUserContext();
  const [canBuy, setCanBuy] = useState(false)
  const [alreadyBought, setAlreadyBought] = useState(false)
  const [buyAvatar] = useMutation(BUY_AVATAR, {
    variables: { avatarId: avatar.avatarId, price: avatar.coinPrice },
    refetchQueries: [AVATAR_COLLECTIONS],
    onCompleted: (data) => {
      setCurrentUser({ ...currentUser, ...data.buyAvatar });
    },
    ...basicQueryResultSupport,
  });

  useEffect(() => {
    const notInInventory =
      currentUser.inventory.find((i) => i.avatarId === avatar.avatarId) === undefined;
    setCanBuy(currentUser.coins >= avatar.coinPrice && notInInventory);
    setAlreadyBought(!notInInventory);
  }, [currentUser.coins, avatar.coinPrice]);


  const open = () => {
    if (canBuy) {
    onOpen();
    }
  };
  return (
    <Flex
      onClick={open}
      p={1}
      borderRadius="4px"
      bg={alreadyBought ? "orange" : "blueClear.500"}
      mr={3}
      my={3}
      direction="column"
      justify="space-between"
      align="center"
      minW="fit-content"
      cursor={canBuy ? "pointer" : "auto"}
      filter={!canBuy && !alreadyBought && "grayScale(0.8)"}
    >
      <AvatarImage picture={avatar.picture} />
      <Text fontSize="xs">{alreadyBought ? "Purchased" : `${avatar.coinPrice} coins`}</Text>
      <PopUp isOpen={isOpen} onClose={onClose}>
        <Flex
          p={5}
          m={2}
          direction="column"
          textAlign="center"
          justify="space-around"
          alignItems="center"
        >
          <Text m={2}>
            Do you want to buy this Gigil monster for{" "}
            <Box as="span" display="inline" fontWeight="bold">
              {avatar.coinPrice} coins
            </Box>
            ?
          </Text>
          <AvatarImage picture={avatar.picture} />
          <Flex m={3} w="100%" alignItems="center" justify="center">
            <SuccessButton
              onClick={() => {
                buyAvatar();
                onClose();
              }}
              mx={2}
              w="40%"
            >
              Purchase
            </SuccessButton>
            <CancelButton mx={2} onClick={onClose} w="40%">
              Cancel
            </CancelButton>
          </Flex>
        </Flex>
      </PopUp>
    </Flex>
  );
};

const AvatarImage = ({ picture }) => {
  return (
    <Flex  justify="center" p={2} borderRadius="4px" bg="white" boxSize={{ base: "55px", md: "70px" }} >
    <Image src={picture}  maxH={{base: "40px", md: "60px"}}/>
    </Flex>
  );
}

export default AvatarCollections;

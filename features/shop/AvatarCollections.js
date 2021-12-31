import React, { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, Text, Image, Divider } from "@chakra-ui/react";
import Error from "../Error";
import Loading from "../Loading";

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

const AvatarCollections = () => {
  const { loading, error, data } = useQuery(AVATAR_COLLECTIONS);
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
  return (
    <Flex  p={1} borderRadius="4px" bg="blueClear.500" mr={3} my={3} direction="column" justify="space-between" align="center" minW="fit-content">
      <Image p={2} borderRadius="4px" bg="white" src={avatar.picture}  boxSize={{ base: "55px", md: "70px" }} />
      <Text fontSize="xs">{avatar.coinPrice} coins</Text>
    </Flex>
  );
};

export default AvatarCollections;

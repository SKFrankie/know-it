import React from 'react'
import {Text, Flex } from '@chakra-ui/react'
import { useQuery, useMutation, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { useUserContext } from "../context/user";
import {AvatarImage} from "./shop/AvatarCollections"

const AVATAR_COUNT = gql`
  query AvatarsCount {
    avatarsCount
  }
`;

const GigilCollection = () => {
  const [currentUser, setCurrentUser] = useUserContext();
  const { error, data } = useQuery(AVATAR_COUNT, {...basicQueryResultSupport});
  return (
    <>
    {data && (<Text mx={5} alignSelf="flex-end" textAlign="right" fontSize="xs">{currentUser?.inventory?.length} / {data.avatarsCount}</Text>)}
    <Flex flexWrap="wrap" borderRadius="10" placeContent="center" m={2}>
      {currentUser?.inventory?.map((avatar) => <Gigil key={avatar?.avatarId} avatar={avatar}/>)}
    </Flex>
    </>
  )
}

const Gigil = ({ avatar }) => {
  return (
    <Flex borderRadius="4px" p={1} m={1} bg="blueClear.500">
      <AvatarImage picture={avatar?.picture} />
    </Flex>
  );
}

export default GigilCollection

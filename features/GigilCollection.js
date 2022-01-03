import React from 'react'
import {Text, Flex } from '@chakra-ui/react'
import { useUserContext } from "../context/user";
import {AvatarImage} from "./shop/AvatarCollections"

const GigilCollection = () => {
  const [currentUser, setCurrentUser] = useUserContext();
  return (
    <Flex flexWrap="wrap" borderRadius="10" m={2}>
      {currentUser?.inventory?.map((avatar) => <Gigil key={avatar?.avatarId} avatar={avatar}/>)}
    </Flex>
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

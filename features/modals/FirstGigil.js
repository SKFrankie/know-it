import React, {useEffect, useState} from 'react'
import { useUserContext } from "../../context/user";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import Modal from "../../ui/Modal";
import { AvatarImage } from "../shop/AvatarCollections";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Loading from "../Loading";
import Error from "../Error";

const GET_FREE_AVATARS = gql`
  query GetFreeAvatars {
    avatars(where: { coinPrice: 0 }) {
      coinPrice
      avatarId
      picture
      name
      collections {
        name
      }
    }
  }
`;

const CHANGE_AVATAR_AND_ADD_TO_INVETORY = gql`
  mutation ChangeCurrentAvatarAndAddToInventory($avatarId: ID!) {
    changeCurrentAvatar(avatarId: $avatarId) {
      avatarId
      name
      picture
    }
    addAvatarToInventory(avatarId: $avatarId) {
      avatarId
    }
  }
`;

const FirstGigil = () => {
  const isMonstar = (avatar) => {
    if (!avatar?.collections?.length) return false;
    return avatar.collections.find((collection) => collection.name.includes("MONSTARS"));
  };

  const [currentUser, setCurrentUser, { refetch }] = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [preventReopen, setPreventReopen] = useState(false);
  const [freeAvatars, setFreeAvatars] = useState([]);
  const { loading, error, data } = useQuery(GET_FREE_AVATARS, {
    onCompleted: (data) => {
      setFreeAvatars(data.avatars.filter((avatar) => !isMonstar(avatar)));
    },
    ...basicQueryResultSupport,
  });


  useEffect(() => {
    if (currentUser?.inventory?.length || !currentUser?.online) {
      if(isOpen) {
        onClose();
      }
      return;
    }
    if (!isOpen && !preventReopen) {
      onOpen();
    }
  }, [currentUser]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={{ base: 5, md: 10 }}
      >
        <Text fontSize="xl" fontWeight="bold">
          Select your first Gigil Monster!
        </Text>
        {loading && <Loading />}
        {error && <Error />}
        {freeAvatars.length ? (
          <Flex flexWrap="wrap" justify="center">
            {freeAvatars.map((avatar) => (
              <FirstGigilImage setPreventReopen={setPreventReopen} avatar={avatar} onClose={onClose} key={avatar.avatarId} />
            ))}
          </Flex>
        ) : (
          <></>
        )}
      </Flex>
    </Modal>
  );
};

const FirstGigilImage = ({ avatar, onClose, setPreventReopen }) => {
  const [currentUser, setCurrentUser, { refetch }] = useUserContext();
  const [changeCurrentAvatarAndAddToInventory, {loading}] = useMutation(CHANGE_AVATAR_AND_ADD_TO_INVETORY, {
    onCompleted: (data) => {
      if (refetch) {
        refetch();
        setPreventReopen(true);
        onClose();
      }
      setCurrentUser({
        currentAvatar: data.changeCurrentAvatar,
        inventory: [data.addToInventory],
        ...currentUser,
      });
    },
    ...basicQueryResultSupport,
  });


  const handleClick = () => {
    if (!loading) {
      changeCurrentAvatarAndAddToInventory({ variables: { avatarId: avatar.avatarId } });
    }
  };

  return (
    <Flex
      direction="column"
      cursor="pointer"
      m={3}
      bg="blueClear.500"
      p={1}
      onClick={handleClick}
      _hover={{ bg: "orange" }}
    >
      <AvatarImage picture={avatar?.picture} />
    </Flex>
  );
};

export default FirstGigil;

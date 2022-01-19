import React, {useEffect, useState} from 'react'
import { useUserContext } from "../../context/user";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Flex, Image, useDisclosure } from "@chakra-ui/react";
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

const FirstGigil = () => {
  const isMonstar = (avatar) => {
    if (!avatar?.collections?.length) return false;
    return avatar.collections.find((collection) => collection.name.includes("MONSTARS"));
  };

  const [currentUser, setCurrentUser] = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [freeAvatars, setFreeAvatars] = useState([]);
  const { loading, error, data } = useQuery(GET_FREE_AVATARS, {
    onCompleted: (data) => {
      setFreeAvatars(data.avatars.filter((avatar) => !isMonstar(avatar)));
    },
  });

  useEffect(() => {
    if (currentUser?.inventory?.length) {
      return;
    }
    if (!isOpen) {
      onOpen();
      console.log("currentuser", currentUser?.inventory?.length);
    }
  }, [currentUser]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {loading && <Loading />}
      {error && <Error />}
      {freeAvatars.length ? (
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={4}
          maxWidth="500px"
          mx="auto"
        >
          {freeAvatars.map((avatar) => (
            <AvatarImage
              key={avatar.avatarId}
              picture={avatar.picture}
              onClick={() => {
                onClose();
                setCurrentUser((prevState) => ({
                  ...prevState,
                  inventory: [...prevState.inventory, avatar],
                }));
              }}
            />
          ))}
        </Flex>
      ) : (
        <></>
      )}
    </Modal>
  );
};

export default FirstGigil;

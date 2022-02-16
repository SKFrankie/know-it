import React from "react";
import { Text, Flex, useDisclosure } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { useUserContext } from "../context/user";
import { AvatarImage } from "./shop/AvatarCollections";
import { PopUp } from "../ui/Modal";
import { SuccessButton, CancelButton } from "../ui/Button";

const AVATAR_COUNT = gql`
  query AvatarsCount {
    avatarsCount
  }
`;

const CHANGE_AVATAR = gql`
  mutation ChangeCurrentAvatar($avatarId: ID!) {
    changeCurrentAvatar(avatarId: $avatarId) {
      avatarId
      name
      picture
    }
  }
`;

const GigilCollection = () => {
  const [currentUser, setCurrentUser] = useUserContext();
  const { error, data } = useQuery(AVATAR_COUNT, { ...basicQueryResultSupport });
  return (
    <>
      {data && (
        <Text mx={5} alignSelf="flex-end" textAlign="right" fontSize="xs">
          {currentUser?.inventory?.length} / {data.avatarsCount}
        </Text>
      )}
      <Flex flexWrap="wrap" borderRadius="10" placeContent="center" m={2}>
        {currentUser?.inventory?.map((avatar) => (
          <Gigil key={avatar?.avatarId} avatar={avatar} />
        ))}
      </Flex>
    </>
  );
};

const Gigil = ({ avatar }) => {
  const [currentUser, setCurrentUser] = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [changeAvatar] = useMutation(CHANGE_AVATAR, {
    variables: { avatarId: avatar.avatarId },
    refetchQueries: [AVATAR_COUNT],
    onCompleted: (data) => {
      setCurrentUser({ ...currentUser, currentAvatar: data?.changeCurrentAvatar });
    },
    ...basicQueryResultSupport,
  });
  return (
    <Flex
      onClick={onOpen}
      cursor="pointer"
      borderRadius="4px"
      p={1}
      m={1}
      bg={avatar?.avatarId === currentUser?.currentAvatar?.avatarId ? "orange" : "blueClear.500"}
    >
      <AvatarImage picture={avatar?.picture} />
      <PopUp isOpen={isOpen} onClose={onClose}>
        <Flex
          p={5}
          m={2}
          direction="column"
          textAlign="center"
          justify="space-around"
          alignItems="center"
        >
          <Text m={2}>Change avatar?</Text>
          <AvatarImage big picture={avatar?.picture} />
          <Text fontSize="xs" fontWeight="bold">
            {avatar?.name}
          </Text>
          <Flex m={3} w="100%" alignItems="center" justify="center">
            <SuccessButton
              onClick={() => {
                changeAvatar();
                onClose();
              }}
              mx={2}
              w="40%"
            >
              Yes
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

export default GigilCollection;

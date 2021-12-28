import React from "react";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { useUserContext } from "../context/user";

const MyAvatar = ({ ...props }) => {
  const [currentUser] = useUserContext();
  const {
    currentAvatar,
  } = currentUser;
  return (
    <ChakraAvatar
      size="lg"
      name=""
      bg="white"
      src={currentAvatar?.picture ?  currentAvatar?.picture : "https://bit.ly/dan-abramov"}
      {...props}
    />
  );
};

export { MyAvatar };

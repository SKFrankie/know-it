import React from "react";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { useUserContext } from "../context/user";

const MyAvatar = ({ ...props }) => {
  const [currentUser] = useUserContext();
  const {
    currentAvatar: { picture },
  } = currentUser;
  return (
    <ChakraAvatar
      size="lg"
      name=""
      bg="white"
      src={picture ? picture : "https://bit.ly/dan-abramov"}
      {...props}
    />
  );
};

export { MyAvatar };

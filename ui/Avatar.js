import React from "react";
import { Avatar as ChakraAvatar } from "@chakra-ui/react";
import { useUserContext } from "../context/user";

const MyAvatar = ({ ...props }) => {
  const [currentUser] = useUserContext();
  const { currentAvatar } = currentUser;
  return (
    <ChakraAvatar
      size="lg"
      name=""
      bg="white"
      src={currentAvatar?.picture ? currentAvatar?.picture : "https://res.cloudinary.com/dvdqswi8x/image/upload/v1639908743/Avatar%20Picture/wprwgtldhxwx4t3ntdur.png"}
      {...props}
    />
  );
};

export { MyAvatar };

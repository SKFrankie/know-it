import React from "react";
import { Image } from "@chakra-ui/react";

const GiftIcon = ({ ...props }) => {
  return <Image boxSize="30px" src="/images/gift.png" alt="gift" {...props} />
};

export default GiftIcon;

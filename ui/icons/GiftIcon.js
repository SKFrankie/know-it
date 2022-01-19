import React from "react";
import { Image } from "@chakra-ui/react";
import MotionBox from "../../features/MotionBox";

const GiftIcon = ({ ...props }) => {
  return (
    <MotionBox
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping:5,
      }}
    >
      <Image boxSize="30px" src="/images/gift.png" alt="gift" {...props} />
    </MotionBox>
  );
};

export default GiftIcon;

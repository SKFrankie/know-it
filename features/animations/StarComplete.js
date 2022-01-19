import React, {useState} from 'react'
import { Image} from "@chakra-ui/react";
import MotionBox from "../MotionBox";

const StarComplete = ({isActive=false}) => {
  return (
    <MotionBox
      initial={{ scale: 1 }}
      animate={{ scale: isActive ? 1.5 : 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 5,
      }}
    >
      <Image boxSize="30px" src={"/images/star.png"} alt={"star"} />
    </MotionBox>
  );
}

export default StarComplete

import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import MotionBox from "../MotionBox";
import useSound from "../../hooks/useSound";

const StarComplete = ({ isActive = false }) => {
  const [play] = useSound("/sounds/win-star.mp3");
  useEffect(() => {
    if (isActive) {
      play();
    }
  }, [isActive]);

  return (
    <MotionBox
      initial={{ scale: 1 }}
      animate={{ scale: isActive ? 3 : 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 5,
      }}
    >
      <Image boxSize="30px" src={"/images/star.png"} alt={"star"} />
    </MotionBox>
  );
};

export default StarComplete;

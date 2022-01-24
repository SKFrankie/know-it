import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";
import MotionBox from "../../features/MotionBox";
import { useUserContext } from "../../context/user";

const isDateEarlierThanToday = (strDate) => {
  if (!strDate) {
    return true;
  }
  const date = new Date(strDate);
  const today = new Date();
  if (today.getMonth() !== date.getMonth() || today.getYear() !== date.getYear()) {
    return true;
  }
  if (today.getDate() > date.getDate()) return true;
  return false;
};

const GiftIcon = ({ ...props }) => {
  const [currentUser] = useUserContext();
  const [repeat, setRepeat] = useState(false);
  useEffect(() => {
    if (isDateEarlierThanToday(currentUser?.lastSeen)) {
      setRepeat(true);
    } else {
      setRepeat(false);
    }
  }, [currentUser]);

  return (
    <>
      {" "}
      {repeat && (
        <MotionBox
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 5,
            repeat: "Infinity",
            duration: 2,
          }}
        >
          <Image boxSize="30px" src="/images/gift.png" alt="gift" {...props} />
        </MotionBox>
      )}
      {!repeat && (
        <MotionBox
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 5,
            duration: 2,
          }}
        >
          <Image boxSize="30px" src="/images/gift.png" alt="gift" {...props} />
        </MotionBox>
      )}
    </>
  );
};

export default GiftIcon;

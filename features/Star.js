import { Box, Image } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";

const Star = ({ boxSize = "150px", ...props }) => {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <Box {...props} cursor={"pointer"}>
      <motion.div
        className="block"
        onClick={() => setIsActive(!isActive)}
        animate={{
          rotateZ: isActive ? 0 : 360,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 50,
        }}
        {...props}
      >
        <Image maxWidth={boxSize} src="/images/star.png" alt="star" />
      </motion.div>
    </Box>
  );
};

export default Star;

import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import { motion } from 'framer-motion';

const Star = ({...props}) => {
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
        <Image boxSize="150px" src="/images/star.png" alt="star" />
      </motion.div>
    </Box>
  );
}

export default Star

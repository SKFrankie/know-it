import React from "react";
import { motion } from "framer-motion";
import { Box, Text, Image } from "@chakra-ui/react";

const Podium = ({ ...props }) => {
  const podium = [
    { position: 1, color: "#00AEE5", height: 2 },
    { position: 0, color: "#01B84A", height: 4 },
    { position: 2, color: "#D90A0A", height: 1 },
  ];
  return (
    <Box
      style={{
        alignContent: "flex-end",
        alignItems: "flex-end",
        display: "grid",
        gap: ".2rem",
        gridAutoFlow: "column dense",
        justifyContent: "center",
        justifyItems: "center",
        height: "110px",
        marginTop: "2rem",
      }}
      {...props}
    >
      {podium.map((step) => (
        <PodiumStep key={step.position} podium={podium} step={step} />
      ))}
    </Box>
  );
};

const PodiumStep = ({ podium, step }) => {
  const offset = podium.length - step.position;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        placeContent: "center",
      }}
    >
      {step.position === 0 && (
        <motion.div
          style={{
            alignSelf: "center",
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.75,
              },
            },
          }}
        >
          <Image
            display={{ base: "none", md: "block" }}
            src="/images/gigil2.png"
            alt="trophy"
            mb="-10px"
            style={{
              height: "auto",
              overflow: "hidden",
              width: "3.75rem",
            }}
          />
          <Image
            display={{ base: "block", md: "none" }}
            src="/images/trophy.png"
            alt="trophy"
            style={{
              height: "1.75rem",
              overflow: "hidden",
              width: "1.75rem",
            }}
          />
        </motion.div>
      )}
      <motion.div
        style={{
          backgroundColor: step.color,
          borderTopLeftRadius: ".5rem",
          borderTopRightRadius: ".5rem",
          display: "flex",
          marginBottom: -1,
          placeContent: "center",
          width: "4rem",
          boxShadow: "inset 0px 4.54962px 4.54962px rgba(0, 0, 0, 0.25)",
          borderRadius: "7.25209px 7.25209px 0px 0px",
        }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { height: 0, opacity: 0 },
          visible: {
            height: 30 + 15 * step.height,
            opacity: 1,
            transition: {
              duration: 2,
              ease: "backInOut",
            },
          },
        }}
      >
        <Text fontSize="3xl" fontWeight="bold" style={{ alignSelf: "center", color: "white" }}>
          {step.position + 1}
        </Text>
      </motion.div>
    </div>
  );
};
export default Podium;

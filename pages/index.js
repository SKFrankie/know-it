import { Image } from "@chakra-ui/image";
import { Box, Flex, Spacer, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { ScaleFade } from "@chakra-ui/transition";
import { motion } from "framer-motion";
import Head from "next/head";
import MotionBox from "../features/MotionBox";
import Podium from "../features/Podium";
import Star from "../features/Star";

export default function Home() {
  return (
    <Flex
      bg="#00B9F5"
      color="white"
      minH="100vh"
      p="5"
      textAlign="center"
      justify="center"
    >
      <Head>
        <title>Know It!</title>
        <meta
          name="description"
          content="A learning by gaming Progressive Web App to test and improve your English!"
        />
        <link rel="icon" href="/images/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ribeye+Marrow&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Flex
        placeSelf="center"
        direction="column"
        as="main"
        w="100vw"
        justifyContent="space-around"
        textAlign="center"
      >
        <MotionBox
          position="absolute"
          top="0"
          left="0"
          w="150px"
          h="150px"
          bg="#007EA7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        ></MotionBox>
        <Box position="absolute" top="0" left="0" w="150px" h="150px">
          <motion.div
            initial={{ x: 20, y: 100, scale: 0 }}
            animate={{ x: 0, y: 0, scale: 1 }}
            transition={{
              duration: 3,
              delay: 0.5,
            }}
          >
            <Image
              src="/images/coming-soon-monster.png"
              alt="Coming Soon Monster"
              position="absolute"
              transform="rotate(-10deg)"
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 50,
              duration: 2,
              delay: 0.5,
            }}
          >
            <Box className="shape"></Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
              delay: 0.5,
            }}
          >
            <Text
              fontSize={{ base: "xs", md: "sm" }}
              color="orange"
              fontWeight="bold"
              position="relative"
              h="150px"
              mt="60px"
              ml="80px"
              w="120px"
              transform="rotate(-45deg)"
            >
              Either you KNOW IT, or you don't
            </Text>
          </motion.div>
        </Box>
        <Box
          height={{ base: "150px", sm: "100px" }}
          display={{ base: "flex", md: "none" }}
        />
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            textAlign: "center",
            textAlign: "-webkit-center",
          }}
          initial={{ translateY: -100, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 50,
          }}
        >
          <Flex
            bg="#0291E1"
            p="5"
            borderTopLeftRadius={25}
            borderBottomRightRadius={25}
            w={{ base: "90%", xl: "70%" }}
            h={{ base: "fit-content", md: "60vh" }}
            direction="column"
            justify="center"
            position="relative"
          >
            <Text
              fontFamily="Ribeye Marrow"
              fontSize={{ base: "40px", md: "120px" }}
              fontWeight="bold"
            >
              KNOW IT!
            </Text>
            <Text pb="5" fontSize={{ base: "md", md: "lg" }}>
              Learning by Gaming
            </Text>
            <Box m="5" fontSize={{ base: "md", md: "4xl" }} fontWeight="bold">
              <Text>Test and improve your English!</Text>
            </Box>
            <Star
              boxSize={{ base: "50px", md: "150px" }}
              position="absolute"
              right={{ base: "-15", md: "-50" }}
              top={{ base: "-15", md: "-50" }}
            />
          </Flex>
        </motion.div>
        <Box position={{ base: "static", md: "absolute" }} left="0" bottom="0">
          <Podium px="4" />
          <Button
            borderBottomRadius={{ base: 20, md: 0 }}
            borderTopLeftRadius={{ base: 20, md: 0 }}
            borderTopRightRadius={20}
            w={{base: "90%", md:"100%"}}
            p="30px"
            bg="red"
            fontSize="xl"
          >
            Coming Soon ...
          </Button>
        </Box>
      </Flex>
      <Text
        position="absolute"
        right="0"
        bottom="0"
        mt="5"
        mr="2"
        fontSize="sm"
      >
        ©BluePopcorn Production
      </Text>
    </Flex>
  );
}

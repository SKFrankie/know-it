import { Image } from '@chakra-ui/image';
import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import { ScaleFade } from '@chakra-ui/transition';
import { motion } from 'framer-motion';
import Head from 'next/head'

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
        <link rel="icon" href="/favicon.ico" />
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

      <Flex direction="column" as="main" w="80vh" justifyContent="space-around">
        <Box
          position="absolute"
          top="0"
          left="0"
          w="150px"
          h="150px"
          bg="#007EA7"
          boxShadow="lg"
        >
          <motion.div
            initial={{ x: 20, y: 100, scale: 0 }}
            animate={{ x: 0, y:0, scale: 1 }}
            transition={{
              duration: 3,
            }}
          >
          <Image
            src="https://res.cloudinary.com/dki7jzqlx/image/upload/v1638786690/coming-soon-monster_ezdjxl.png"
            alt="Coming Soon Monster"
            position="absolute"
            transform="rotate(-10deg)"
          />
          </motion.div>
          <Box className="shape"></Box>
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
        </Box>
        <Box height="100px" display={{ base: "flex", md: "none" }} />
        <Box>
          <motion.div
            initial={{ scale: 0, rotate: 180 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <Text
              fontFamily="Ribeye Marrow"
              fontSize={{ base: "60px", md: "100px" }}
              fontWeight="bold"
            >
              KNOW IT!
            </Text>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 2,
            }}
          >
            <Text pb="5" fontSize={{ base: "md", md: "xl" }}>
              Learning by Gaming
            </Text>
          </motion.div>
        </Box>
        <Box fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
          <Text>Test and improve your English!</Text>
          <Text>Fun, FREE, and Exciting!</Text>
        </Box>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
          }}
        >
          <Text fontSize={{ base: "40px", md: "5xl" }} pb="5">
            Coming soon
          {[" ."," ."," ."].map((dot, index) => (
            <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 0.5,
              repeat: Infinity,
              duration: 1.5,
            }}
             style={{fontFamily: "Comic Sans MS"}}
             key={index}>{dot}</motion.span>
          ))}
          </Text>
        </motion.div>
      </Flex>
      <Text position="absolute" right="0" bottom="0" m="5" fontSize="md">
        a BluePopcorn Production
      </Text>
    </Flex>
  );
}



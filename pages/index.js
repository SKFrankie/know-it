import { Box, Flex, Spacer, Text } from '@chakra-ui/layout'
import Image from "next/image"
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
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
          <Image
            src="https://res.cloudinary.com/dki7jzqlx/image/upload/v1638786690/coming-soon-monster_ezdjxl.png"
            alt="Coming Soon Monster"
            layout="fill"
          />
          <Box className="shape"></Box>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="orange"
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
        <Box height="100px" display={{base: "flex", md: "none"}} />
        <Box>
          <Text
            fontFamily="Ribeye Marrow"
            fontSize={{ base: "60px", md: "100px" }}
            fontWeight="bold"
          >
            KNOW IT!
          </Text>
          <Text pb="5" fontSize={{ base: "md", md: "xl" }}>
            Learning by Gaming
          </Text>
        </Box>
        <Box fontSize={{ base: "xl", md: "3xl" }} fontWeight="bold">
          <Text>Test and improve your English!</Text>
          <Text>Fun, FREE, and Exciting!</Text>
        </Box>
        <Text fontSize={{base: "40px", md: "5xl"}} pb="5">
          Coming soon . . .
        </Text>
      </Flex>
      <Text position="absolute" right="0" bottom="0" m="5" fontSize="md">
        a BluePopcorn Production
      </Text>
    </Flex>
  );
}



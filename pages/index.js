import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import Head from 'next/head'

export default function Home() {
  return (
    <Flex
      bg="blue.200"
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
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Maven+Pro&display=swap" rel="stylesheet"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Ribeye+Marrow&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Flex direction="column" as="main" w="80vh" justifyContent="space-around">
        <Box>
          <Text fontFamily="Ribeye Marrow" fontSize={{ base: "80px", md: "100px" }} fontWeight="bold">
            KNOW IT!
          </Text>
          <Text pb="5" fontSize={{ base: "md", md: "xl" }}>
            Learning by Gaming
          </Text>
        </Box>
        <Box
          fontStyle="italic"
          fontSize={{ base: "xl", md: "3xl" }}
          fontWeight="bold"
        >
          <Text>Test and improve your English!</Text>
          <Text>Fun, FREE, and Exciting!</Text>
        </Box>
        <Text
          transform="rotate(-10deg)"
          ml="5"
          w="35vh"
          p="5"
          fontSize={{ base: "md", md: "xl" }}
        >
          Either you KNOW IT, or you don't
        </Text>
        <Text fontSize="3xl" pb="5">
          Coming soon ...
        </Text>
      </Flex>
        <Text position="absolute" right="0" bottom="0" m="5" fontSize="md">
          a BluePopcorn Production
        </Text>
    </Flex>
  );
}



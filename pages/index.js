import { Box, Center, Flex, Text } from '@chakra-ui/layout'
import Head from 'next/head'

export default function Home() {
  return (
    <Flex bg="blue.200" minH="100vh" p="5" textAlign="center" justify="center">
      <Head>
        <title>Know It!</title>
        <meta
          name="description"
          content="A learning by gaming Progressive Web App to test and improve your English!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="column" as="main" w="80vh" justifyContent="space-around">
        <Text fontSize="3xl" fontWeight="bold" color="white" pb="5">
          COMING this SPRING
        </Text>
        <Box>
          <Text
            fontSize={{ base: "80px", md: "100px" }}
            fontWeight="bold"
            color="red.300"
          >
            KNOW IT!
          </Text>
          <Text color="blue.600" pb="5" fontSize={{ base: "md", md: "xl" }}>
            A learning by gaming Progressive Web App
          </Text>
        </Box>
        <Box
          fontStyle="italic"
          color="blue.600"
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
          color="blue.600"
          fontSize={{ base: "md", md: "xl" }}
        >
          Either you KNOW IT, or you don't
        </Text>
        <Text m="5" color="white" fontSize="md">
          a BluePopcorn Production
        </Text>
      </Flex>
    </Flex>
  );
}



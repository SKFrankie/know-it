import { Box, Flex, Text } from "@chakra-ui/layout";
import Head from "next/head";
// import Podium from "../features/Podium";
import GaButton from "../features/GaButton";
import {GAMES_SECTIONS} from "../constants.js";
import Title from "../ui/Title.js";

export default function Home() {
  return (
    <>
      <Head>
        <title>Know It!</title>
        <meta
          name="description"
          content="A learning by gaming Progressive Web App to test and improve your English!"
        />
      </Head>
      <Title display={{base: "none", md: "flex"}}/>
      <Flex flexWrap="wrap" w="100%" textAlign="center" justify="center">
        {GAMES_SECTIONS.map((game) => (
          <Box key={game.name} m="4" width={{ base: "80%", md: "40%" }}>
            <GaButton label={game.name} w={{ base: "100%", md: "60%" }} href={game.path}>
              {game.name}
            </GaButton>
          </Box>
        ))}
      </Flex>
    </>
  );
}

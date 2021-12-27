import {Icon, Button as ChakraButton, Box, Flex, Image} from "@chakra-ui/react";
import Head from "next/head";
import { Icon as Iconify } from '@iconify/react';
import NextLink from 'next/link'

import { useUserContext } from "../context/user";
import Title from "../ui/Title.js";
import {GAMES_SECTIONS} from "../constants.js";
import GaButton from "../features/GaButton";
import { KnowlympicsButton } from "../ui/Button";

export default function Home() {
  const [currentUser] = useUserContext();
  return (
    <>
      <Head>
        <title>Know It!</title>
        <meta
          name="description"
          content="A learning by gaming Progressive Web App to test and improve your English!"
        />
      </Head>
      <Title display={{ base: "none", md: "flex" }} />
      {currentUser.online ? null : (
        <NextLink href="/login" passHref>
          <ChakraButton
            m={2}
            boxShadow="0px 2.16px 2.16px rgba(0, 0, 0, 0.25), inset 0px 2.16px 2.16px rgba(0, 0, 0, 0.25)"
            colorScheme="red"
            aria-label="login"
            size="lg"
            rightIcon={<Icon boxSize={7} color="white" as={Iconify} icon="fe:login" />}
            position="absolute"
            right="0"
            top="0"
            display={{ base: "flex", md: "none" }}
          >
            Login
          </ChakraButton>
        </NextLink>
      )}
      <Flex flexWrap="wrap" w="100%" textAlign="center" justify="center">
        {GAMES_SECTIONS.map((game) => (
          <Flex
            direction="column"
            key={game.name}
            m="4"
            width={{ base: "80%", md: "40%" }}
            textAlign="center"
            alignItems="center"
          >
            <Image
              src={game.image}
              alt={game.name}
              w="fit-content"
              maxH={{ base: "40px", md: "80px" }}
              marginBottom={{ base: "-10px", md: "-30px" }}
            />
            <GaButton label={game.name} w={{ base: "100%", md: "60%" }} href={game.path}>
              {game.name}
            </GaButton>
          </Flex>
        ))}
      </Flex>
      <KnowlympicsButton />
    </>
  );
}

import React, { useState, useEffect } from "react";
import Modal from "../../ui/Modal";
import {Flex, Text, useDisclosure, Divider, Image } from "@chakra-ui/react";
import Button from "../../ui/Button";
import { GAMES_SECTIONS } from "../../constants";
import { StarPercentage } from "../Currency"
import { useUserContext } from "../../context/user";


const HowToPlayPopup = ({ ...props }) => {
  const [currentUser] = useUserContext();
  useEffect(() => {
    const noOpen = JSON.parse(localStorage.getItem("SawHowToPlay"));
    if(noOpen) {
      return;
    }
    localStorage.setItem("SawHowToPlay", true);
    onOpen()
  }, []);
  const {isOpen, onOpen, onClose} = useDisclosure();
  return (
    <Modal isOpen={isOpen} onClose={onClose} {...props}>
      <Text fontSize="3xl" fontWeight="bold" alignSelf="center" textAlign="center">
        How to play
      </Text>
      <Divider m={3} />
      <HowToPlay />
      {currentUser?.online ? (
        <Button w="80%" alignSelf="center" colorScheme="green" onClick={onClose}>
          Got it!
        </Button>
      ) : (
        <Button w="80%" alignSelf="center" colorScheme="green" href="/signup">
          Sign Up
        </Button>
      )}
    </Modal>
  );
};

const Section = ({ children, ...props }) => {
  return (
    <Flex
      {...props}
      direction="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      pt={{ base: 5, lg: 10 }}
    >
      {children}
    </Flex>
  );
};

const InBetweenImage = ({src, alt, ...props }) => {
  return (
    <Image
    m={1}
      boxSize="50px"
      src={src}
      alt={alt}
      align="center"
      {...props}
    />
  )
}

const HowToPlay = () => {
  return (
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={{ base: 5, lg: 10 }}
      >
        <Section>
          <Text fontSize="xl">Choose a game:</Text>
          <Text>
            {GAMES_SECTIONS.map((game, index) => (
              <Text key={game.name}  as="span" fontWeight="bold">
                {game.name}
                {index === GAMES_SECTIONS.length - 1 ? "" : " / "}
              </Text>
            ))}
          </Text>
          <InBetweenImage src="/images/GrammarGeekImageRight.png" alt={"grammar"} />
        </Section>
        <Section>
          <Text fontSize="lg" mb={4}>
            Play to win <b>Points</b> and collect <b>Stars</b> to <b>Compete</b> in the{" "}
            <b>Knowlympics</b>. Earn <b>Medals</b> and move up in the <b>RANKING</b>!
          </Text>
          {/* starbar */}
          <StarPercentage noAnimation quantity={60}  w="50%" placeContent="center" />
        </Section>
        <Section pb="5">
          <Text fontSize="lg">
            Earn <b>Coins</b> from your <b>Points</b> to collect <b>Gigil Monsters</b> to use as
            your avatar.
          </Text>
          <Flex>
            <InBetweenImage src="/images/coin.png" alt={"coin"} />
            <InBetweenImage src="/images/AntonymHuntMonster.png" alt={"Gigil Monster"} />
          </Flex>
        </Section>
      </Flex>)
}


export { HowToPlay };
export default HowToPlayPopup;
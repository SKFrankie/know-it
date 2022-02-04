import { useEffect } from "react";
import { Icon as Iconify } from "@iconify/react";
import { Flex, Image, useDisclosure, Icon } from "@chakra-ui/react";
import Head from "next/head";

import { useUserContext } from "../context/user";
import Title from "../ui/Title.js";
import { GAMES_SECTIONS } from "../constants";
import GaButton, { GaIconButton } from "../features/GaButton";
import { KnowlympicsButton } from "../ui/Button";

import CalendarModal from "../features/modals/CalendarModal";
import GiftIcon from "../ui/icons/GiftIcon";
import RewardPopup from "../features/modals/RewardPopup";
import FirstGigil from "../features/modals/FirstGigil";
import StripeComponent from "../features/stripe/StripeComponent";

export default function Home() {
  const [currentUser] = useUserContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (currentUser.rankingGift) {
      onOpen();
    }
  }, [currentUser.rankingGift, onOpen]);

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
      <GaIconButton
        position="fixed"
        top={{ base: "10vh", md: "25vh" }}
        left="2%"
        boxShadow="0px 2.16px 2.16px rgba(0, 0, 0, 0.25), inset 0px 2.16px 2.16px rgba(0, 0, 0, 0.25)"
        colorScheme="red"
        label="Survey"
        boxSize={{ base: 10, md: 12 }}
        target="_blank"
        href="https://docs.google.com/forms/d/e/1FAIpQLSc7y4RINsZ-g9gzjP3rSg5AVIfDS2Nu4m09y9Mn--ZvFFr2rA/viewform?usp=pp_url"
        icon={<Icon boxSize={7} as={Iconify} icon="flat-color-icons:survey" />}
        zIndex={1}
      />
      {currentUser.online ? (
        <>
          <GiftButton position="fixed" top={{ base: "10vh", md: "25vh" }} right="2%" />
        </>
      ) : null}
      <Flex flexWrap="wrap" w="100%" textAlign="center" justify="center">
        {GAMES_SECTIONS.map((game) => (
          <Flex
            direction="column"
            key={game.name}
            m="2vh"
            width={{ base: "80%", md: "40%" }}
            textAlign="center"
            alignItems={{ base: game.align || "center", md: "center" }}
          >
            <Image
              src={game.image}
              alt={game.name}
              w="auto"
              display="table"
              maxH={{ base: "40px", md: "80px" }}
              marginBottom={{ base: "-10px", md: "-30px" }}
            />
            <GaButton label={game.name} w={{ base: "100%", md: "60%" }} href={game.path}>
              {game.name}
            </GaButton>
          </Flex>
        ))}
      </Flex>
      <KnowlympicsButton href="/knowlympics" disabled={!currentUser.online} />
      <RewardPopup isOpen={isOpen} onClose={onClose} rankingGift={currentUser.rankingGift} />
      <FirstGigil />
      <StripeComponent />
    </>
  );
}

const GiftButton = ({ ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <GaIconButton
        boxShadow="0px 2.16px 2.16px rgba(0, 0, 0, 0.25), inset 0px 2.16px 2.16px rgba(0, 0, 0, 0.25)"
        colorScheme="blueClear"
        label="Calendar"
        boxSize={{ base: 10, md: 12 }}
        onClick={() => onOpen()}
        icon={<GiftIcon boxSize={{ base: 7, md: 8 }} />}
        zIndex={1}
        {...props}
      />
      <CalendarModal isCalendarOpen={isOpen} onCalendarClose={onClose} />
    </>
  );
};

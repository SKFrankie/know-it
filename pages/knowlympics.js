import { Flex, Text } from "@chakra-ui/react";
import { KnowlympicsButton } from "../ui/Button";
import { useUserContext } from "../context/user";
import Leaderboard from "../features/Leaderboard";
import Info from "../features/games/Info";

const Knowlympics = () => {
  const [currentUser] = useUserContext();
  return (
    <Flex direction="column" justify="center" align="center">
      <Flex>
        <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700" color="white" mb={5}>
          Knowlympics
        </Text>
        <Info id="knowlympics" />
      </Flex>
      {/* <Text>What is Knowlympics?</Text> */}
      <KnowlympicsButton text="Compete" disabled={!currentUser?.stars} />
      <Leaderboard />
      {/* <KnowlympicsButton text="Start" disabled={!currentUser?.stars} display={{base: "block", md: "none"}}/> */}
    </Flex>
  );
};

export default Knowlympics;

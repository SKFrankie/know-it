import { Flex, Text } from "@chakra-ui/react";
import { KnowlympicsButton } from "../ui/Button";
import { useUserContext } from "../context/user";
import Leaderboard from "../features/Leaderboard";

const knowlympics = () => {
  const [currentUser] = useUserContext();
  return (
    <Flex direction="column" justify="center" align="center">
      <Text fontSize={{ base: "3xl", md: "5xl" }} fontWeight="700" color="deepDarkBlue" mb={5}>
        Knowlympics
      </Text>
      {/* <Text>What is Knowlympics?</Text> */}
      <KnowlympicsButton text="Start" disabled={!currentUser?.stars} />
      <Leaderboard />
      {/* <KnowlympicsButton text="Start" disabled={!currentUser?.stars} display={{base: "block", md: "none"}}/> */}
    </Flex>
  );
};


export default knowlympics;

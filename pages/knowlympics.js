import { Flex } from "@chakra-ui/react";
import { KnowlympicsButton } from "../ui/Button";
import { useUserContext } from "../context/user";
import Leaderboard from "../features/Leaderboard";

const Knowlympics = () => {
  const [currentUser] = useUserContext();
  return (
    <Flex my={{ base: "5vh" }} direction="column" justify="center" align="center">
      <KnowlympicsButton 
        text="Knowlympics"
        width="100%"
        bg="green"
        podium
        disabled={!currentUser?.stars} 
      />
      <Leaderboard my={5}/>
    </Flex>
  );
};

export default Knowlympics;

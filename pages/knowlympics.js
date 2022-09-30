import { Flex } from "@chakra-ui/react";
import { KnowlympicsButton } from "../ui/Button";
import { useUserContext } from "../context/user";
import Leaderboard from "../features/Leaderboard";

const Knowlympics = () => {
  const [currentUser] = useUserContext();
  return (
    <Flex direction="column" justify="center" align="center">
      <Leaderboard my={5}/>
      <KnowlympicsButton 
        text="Knowlympics"
        width="100%"
        disabled={!currentUser?.stars} 
      />
    </Flex>
  );
};

export default Knowlympics;

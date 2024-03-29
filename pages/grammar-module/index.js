import { AllModules } from "../../features/games/GrammarModule";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Link from "../../ui/Link";
import { isPremium } from "../../helpers/premium";
import { useUserContext } from "../../context/user";

const GET_MODULES = gql`
  query GrammarModules {
    grammarModules(options: {sort: {name: ASC}}) {
      grammarModuleId
      name
      text
    }
  }
`;

const GrammarModulesPage = () => {
  const [modules, setModules] = useState([]);
  const [currentUser] = useUserContext();
  useQuery(GET_MODULES, {
    onCompleted: (data) => {
      const { grammarModules } = data;
      setModules(grammarModules);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <>
      {isPremium(currentUser) ? (
        <AllModules modules={modules} />
      ) : (
        <Box textAlign="center">
          <Link href="/shop/money" fontSize="3xl">
            Click Here to get the Grammar Guide+ and become a Premium User
          </Link>
        </Box>
      )}
    </>
  );
};

export default GrammarModulesPage;

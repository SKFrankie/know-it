import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useLazyQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { SectionTitle } from "../../ui/Title";
import Link from "../../ui/Link";
import { UnorderedList } from "@chakra-ui/react";
import { ListItem } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { useUserContext } from "../../context/user";
import { isPremium } from "../../helpers/premium";
import Loading from '../Loading';

const GET_MODULES_FROM_ID = gql`
  query GrammarModules($grammarModuleId: ID!) {
    grammarModules(where: { grammarModuleId: $grammarModuleId }) {
      grammarModuleId
      name
      text
    }

    allModules: grammarModules(options: {sort: {name: ASC}}) {
      grammarModuleId
      name
      text
    }
  }
`;

const GrammarModule = ({ showModules = false, moduleId }) => {
  const router = useRouter();
  const { id } = router.query;
  const [currentModule, setModule] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentUser] = useUserContext();

  const [fetchModule, {loading}] = useLazyQuery(GET_MODULES_FROM_ID, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const { grammarModules, allModules } = data;
      const [tmpModule] = grammarModules;
      const text = tmpModule.text;
      setModule({ ...tmpModule, text });
      setModules(allModules);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!id && !moduleId) {
      router.push("/");
    }
    fetchModule({ variables: { grammarModuleId: id || moduleId } });
  }, [id, router]);

  if (loading) {
    return <Loading/>
  }
  return (
    <Box px={{ base: 1, md: "8vh" }}>
      <SectionTitle pb="2vh">{currentModule?.name?.toUpperCase()}</SectionTitle>
      {isPremium(currentUser) ? (
        <>
          <Box mb="3" className="html-text" dangerouslySetInnerHTML={{ __html: currentModule?.text }} overflowX="auto" />
          {showModules && <AllModules modules={modules} />}
        </>
      ) : (
        <Box textAlign="center">
          <Text mb="2">Sorry you need to be a premium user to see this content</Text>
          <Link href="/shop/money" fontSize="3xl">
          CLICK HERE to get the Premium Bundle and become a Premium User.
          </Link>
        </Box>
      )}
    </Box>
  );
};

const AllModules = ({ modules }) => {
  return (
    <>
      <SectionTitle p="2vh">More Modules</SectionTitle>
      <UnorderedList>
        {modules.map((module) => (
          <ListItem key={module.grammarModuleId}>
            {module.text ? (
              <Link href={`/grammar-module/${module.grammarModuleId}`}>{module.name}</Link>
            ) : (
              <Text>{module.name}</Text>
            )}
          </ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default GrammarModule;
export { AllModules };

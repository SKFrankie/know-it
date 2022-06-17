import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { SectionTitle } from "../../ui/Title";
import Link from '../../ui/Link';
import { UnorderedList } from '@chakra-ui/react';
import { ListItem } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { useUserContext } from "../../context/user";
import { isPremium } from "../../helpers/premium";

const GET_MODULES_FROM_ID = gql`
  query GrammarModules($grammarModuleId: ID!) {
    grammarModules(where: { grammarModuleId: $grammarModuleId }) {
      grammarModuleId
      name
      text
    }

    allModules: grammarModules {
      grammarModuleId
      name
      text
    }
  }
`;

const GrammarModule = ({showModules=false, moduleId}) => {
  const router = useRouter();
  const { id } = router.query;
  const [module, setModule] = useState(null);
  const [modules, setModules] = useState([]);
  const [currentUser] = useUserContext();

    console.log(moduleId, "moduleid");
  useQuery(GET_MODULES_FROM_ID, {
    variables: { grammarModuleId: id || moduleId },
    onCompleted: (data) => {
      const { grammarModules, allModules } = data;
      const [tmpModule] = grammarModules;
      const text = tmpModule.text
      setModule({...tmpModule, text});
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
  }, [id, router]);
  return (
    <Box px={{ base: 1, md: "8vh" }}>
      <SectionTitle pb="2vh">{module?.name?.toUpperCase()}</SectionTitle>
      {isPremium(currentUser) ? (
        <>
          <Box mb="3" className="html-text" dangerouslySetInnerHTML={{ __html: module?.text }} />
          {showModules && (
            <>
              <SectionTitle pb="2vh">More Modules</SectionTitle>
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
          )}
        </>
      ) : (
        <Box textAlign="center">
          <Text mb="2">Sorry you need to be a premium user to see this content</Text>
          <Link href="/shop/money" fontSize="3xl">
            I want to become a premium user
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default GrammarModule;

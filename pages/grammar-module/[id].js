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

const GrammarModule = () => {
  const router = useRouter();
  const { id } = router.query;
  const [module, setModule] = useState(null);
  const [modules, setModules] = useState([]);

  useQuery(GET_MODULES_FROM_ID, {
    variables: { grammarModuleId: id },
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
    if (!id) {
      router.push("/");
    }
  }, [id, router]);
  return (
    <Box px={{ base: 1, md: "8vh" }}>
      <SectionTitle pb="2vh">{module?.name}</SectionTitle>
      <Box mb="3" className="html-text" dangerouslySetInnerHTML={{ __html: module?.text }} />
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
    </Box>
  );
};

export default GrammarModule;

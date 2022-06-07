import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { Box } from '@chakra-ui/react';
import { SectionTitle, SubTitle } from "../../ui/Title";
import { Text } from '@chakra-ui/react';

const GET_MODULES_FROM_ID = gql`
  query GrammarModules($grammarModuleId: ID!) {
    grammarModules(where: { grammarModuleId: $grammarModuleId }) {
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

  useQuery(GET_MODULES_FROM_ID, {
    variables: { grammarModuleId: id },
    onCompleted: (data) => {
      const { grammarModules } = data;
      const [tmpModule] = grammarModules;
      const text = tmpModule.text.replace(/\n/g, '<br>');
      setModule({...tmpModule, text});
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!id) {
      router.push("/");
    }
  }, [id]);
  return (
    <Box px={{base: 1, md: "8vh"}}>
      <SectionTitle pb="2vh">{module?.name}</SectionTitle>
      <Text  dangerouslySetInnerHTML={{__html: module?.text}}/>
    </Box>
  );
};

export default GrammarModule;

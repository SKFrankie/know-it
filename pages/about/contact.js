import AboutContainer from "../../features/about/AboutContainer";
import { Text, UnorderedList, ListItem } from "@chakra-ui/react";
import { SectionTitle } from "../../ui/Title";
import Link from "../../ui/Link";

const Contact = () => {
  return (
    <AboutContainer>
      <SectionTitle>Contact</SectionTitle>
      <Text align="center" fontSize="lg">Feel free to contact us on our social media accounts</Text>
      <UnorderedList>
      <ListItem>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/bluepopcorn-production-87605622a"
        >
          LinkedIn
        </Link>
      </ListItem>
      <ListItem>
        <Link
          target="_blank"
          href="https://twitter.com/Know_It_BPP"
        >
          Twitter
        </Link>
      </ListItem>
      </UnorderedList>
    </AboutContainer>
  );
};

export default Contact;

import AboutContainer from "../../features/about/AboutContainer";
import { Text} from "@chakra-ui/react";
import {SectionTitle, SubTitle} from "../../ui/Title";
import Link from "../../ui/Link";
const AboutUs = () => {
  return (
    <AboutContainer>
      <SectionTitle>Our Company</SectionTitle>
      <Text>
        BluePopcorn Production is dedicated to developing global education through dynamic digital
        solutions for language learning. We promote diversity, curiosity and creativity. We’re on a
        mission to inspire people to learn English in an intuitive and fun-filled manner through
        gamification and positive reinforcement.
        <br />
        <br />
        Contact Us on{" "}
        <Link align="center" target="_blank" href="https://www.linkedin.com/in/bluepopcorn-production-87605622a">
          LinkedIn
        </Link>
      </Text>

      <SectionTitle>Our Team</SectionTitle>
      <Text align="center">
        The co-founders of BluePopcorn Production created Know It! in 2021.
        <br />
        <br />
        We are 2 sisters from San Francisco who have been living and teaching English in the Paris
        region for the past 25+ years. We decided to bottle up our technics and put them on
        WebApps/Apps with hopes to help as many learners of English as possible. <br />
        <br />
        Know It! is our first WebApp. Thank you for playing!
      </Text>

      <SubTitle><Link target="_blank" href="https://zokiasu.netlify.app">Pierrick / ZKS Development</Link></SubTitle>
      <Text>I’m mainly a front-end developer and UX/UI Designer. I worked as the UX/UI designer for this project.  I analyzed the project and discussed the details with the product team and then created the mockup and its prototyping using Figma.</Text>
      <SubTitle><Link target="_blank" href="http://cozy-codeur.fr">Jimmy / Cozy Codeur</Link></SubTitle>
      <Text>Full Stack French developer, I worked as a freelancer for the integration of this project design and coded the game logic with ReactJs / NextJs. I also worked on the creation of a platform that allows anyone on the team to add / delete / change data (Gigil Monsters, Game questions, etc…) using Reactjs / Graphql / neo4j.</Text>
    </AboutContainer>
  );
};

export default AboutUs;

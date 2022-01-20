import AboutContainer from "../../features/about/AboutContainer";
import {Text, UnorderedList, OrderedList, ListItem} from "@chakra-ui/react";
const TermsOfService = () => {
  return (
    <AboutContainer>
      <Text m={2} fontSize="xl">Website Terms and Conditions of Use</Text>
      <OrderedList>
        <ListItem m={2} fontSize="lg">Terms</ListItem>

        <Text>
          By accessing this Website, accessible from https://www.know-it.bluepopcorn.fun/, you are
          agreeing to be bound by these Website Terms and Conditions of Use and agree that you are
          responsible for the agreement with any applicable local laws. If you disagree with any of
          these terms, you are prohibited from accessing this site. The materials contained in this
          Website are protected by copyright and trade mark law.
        </Text>

        <ListItem m={2} fontSize="lg">Use License</ListItem>

        <Text>
          Permission is granted to temporarily download one copy of the materials on BluePopcorn
          Production's Website for personal, non-commercial transitory viewing only. This is the
          grant of a license, not a transfer of title, and under this license you may not:
        </Text>

        <UnorderedList>
          <ListItem>modify or copy the materials;</ListItem>
          <ListItem>
            use the materials for any commercial purpose or for any public display;
          </ListItem>
          <ListItem>
            attempt to reverse engineer any software contained on BluePopcorn Production's Website;
          </ListItem>
          <ListItem>
            remove any copyright or other proprietary notations from the materials; or
          </ListItem>
          <ListItem>
            transferring the materials to another person or "mirror" the materials on any other
            server.
          </ListItem>
        </UnorderedList>

        <Text>
          This will let BluePopcorn Production to terminate upon violations of any of these
          restrictions. Upon termination, your viewing right will also be terminated and you should
          destroy any downloaded materials in your possession whether it is printed or electronic
          format. These Terms of Service has been created with the help of the{" "}
          <a href="https://www.termsofservicegenerator.net">Terms Of Service Generator</a>.
        </Text>

        <ListItem m={2} fontSize="lg">Disclaimer</ListItem>

        <Text>
          All the materials on BluePopcorn Production’s Website are provided "as is". BluePopcorn
          Production makes no warranties, may it be expressed or implied, therefore negates all
          other warranties. Furthermore, BluePopcorn Production does not make any representations
          concerning the accuracy or reliability of the use of the materials on its Website or
          otherwise relating to such materials or any sites linked to this Website.
        </Text>

        <ListItem m={2} fontSize="lg">Limitations</ListItem>

        <Text>
          BluePopcorn Production or its suppliers will not be hold accountable for any damages that
          will arise with the use or inability to use the materials on BluePopcorn Production’s
          Website, even if BluePopcorn Production or an authorize representative of this Website has
          been notified, orally or written, of the possibility of such damage. Some jurisdiction
          does not allow limitations on implied warranties or limitations of liability for
          incidental damages, these limitations may not apply to you.
        </Text>

        <ListItem m={2} fontSize="lg">Revisions and Errata</ListItem>

        <Text>
          The materials appearing on BluePopcorn Production’s Website may include technical,
          typographical, or photographic errors. BluePopcorn Production will not promise that any of
          the materials in this Website are accurate, complete, or current. BluePopcorn Production
          may change the materials contained on its Website at any time without notice. BluePopcorn
          Production does not make any commitment to update the materials.
        </Text>

        <ListItem m={2} fontSize="lg">Links</ListItem>

        <Text>
          BluePopcorn Production has not reviewed all of the sites linked to its Website and is not
          responsible for the contents of any such linked site. The presence of any link does not
          imply endorsement by BluePopcorn Production of the site. The use of any linked website is
          at the user’s own risk.
        </Text>

        <ListItem m={2} fontSize="lg">Site Terms of Use Modifications</ListItem>

        <Text>
          BluePopcorn Production may revise these Terms of Use for its Website at any time without
          prior notice. By using this Website, you are agreeing to be bound by the current version
          of these Terms and Conditions of Use.
        </Text>

        <ListItem m={2} fontSize="lg">Your Privacy</ListItem>

        <Text>Please read our Privacy Policy.</Text>

        <ListItem m={2} fontSize="lg">Governing Law</ListItem>
      </OrderedList>

      <Text>
        Any claim related to BluePopcorn Production's Website shall be governed by the laws of fr
        without regards to its conflict of law provisions.
      </Text>
    </AboutContainer>
  );
};

export default TermsOfService;

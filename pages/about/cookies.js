import AboutContainer from "../../features/about/AboutContainer";
import { Text, UnorderedList, ListItem } from "@chakra-ui/react";
import Link from "../../ui/Link";
const CookieConsent = () => {
  return (
    <AboutContainer>
      <Text m={2} fontSize="xl">
        Cookie Consent Policy for BluePopcorn Production
      </Text>

      <Text>
        This is the Cookie Policy for Know It!, accessible from https://www.know-it.bluepopcorn.fun
      </Text>

      <Text>
        <strong>What Are Cookies</strong>
      </Text>

      <Text>
        As is common practice with almost all professional websites this site uses cookies, which
        are tiny files that are downloaded to your computer, to improve your experience. This page
        describes what information they gather, how we use it and why we sometimes need to store
        these cookies. We will also share how you can prevent these cookies from being stored
        however this may downgrade or 'break' certain elements of the sites functionality.
      </Text>

      <Text>
        <strong>How We Use Cookies</strong>
      </Text>

      <Text>
        We use cookies for a variety of reasons detailed below. Unfortunately in most cases there
        are no industry standard options for disabling cookies without completely disabling the
        functionality and features they add to this site. It is recommended that you leave on all
        cookies if you are not sure whether you need them or not in case they are used to provide a
        service that you use.
      </Text>

      <Text>
        <strong>Disabling Cookies</strong>
      </Text>

      <Text>
        You can prevent the setting of cookies by adjusting the settings on your browser (see your
        browser Help for how to do this). Be aware that disabling cookies will affect the
        functionality of this and many other websites that you visit. Disabling cookies will usually
        result in also disabling certain functionality and features of the this site. Therefore it
        is recommended that you do not disable cookies. This Cookies Policy was created with the
        help of the{" "}
        <Link href="https://www.cookiepolicygenerator.com/cookie-policy-generator/">
          Cookies Policy Generator from CookiePolicyGenerator.com
        </Link>
        .
      </Text>
      <Text>
        <strong>The Cookies We Set</strong>
      </Text>

      <UnorderedList>
        <ListItem>
          <Text>Account related cookies</Text>
          <Text>
            If you create an account with us then we will use cookies for the management of the
            signup process and general administration. These cookies will usually be deleted when
            you log out however in some cases they may remain afterwards to remember your site
            preferences when logged out.
          </Text>
        </ListItem>

        <ListItem>
          <Text>Login related cookies</Text>
          <Text>
            We use cookies when you are logged in so that we can remember this fact. This prevents
            you from having to log in every single time you visit a new page. These cookies are
            typically removed or cleared when you log out to ensure that you can only access
            restricted features and areas when logged in.
          </Text>
        </ListItem>

        <ListItem>
          <Text>Forms related cookies</Text>
          <Text>
            When you submit data to through a form such as those found on contact pages or comment
            forms cookies may be set to remember your user details for future correspondence.
          </Text>
        </ListItem>

        <ListItem>
          <Text>Site preferences cookies</Text>
          <Text>
            In order to provide you with a great experience on this site we provide the
            functionality to set your preferences for how this site runs when you use it. In order
            to remember your preferences we need to set cookies so that this information can be
            called whenever you interact with a page is affected by your preferences.
          </Text>
        </ListItem>
      </UnorderedList>

      <Text>
        <strong>Third Party Cookies</strong>
      </Text>

      <Text>
        In some special cases we also use cookies provided by trusted third parties. The following
        section details which third party cookies you might encounter through this site.
      </Text>

      <UnorderedList>
        <ListItem>
          <Text>
            This site uses Google Analytics which is one of the most widespread and trusted
            analytics solution on the web for helping us to understand how you use the site and ways
            that we can improve your experience. These cookies may track things such as how long you
            spend on the site and the pages that you visit so we can continue to produce engaging
            content.
          </Text>
          <Text>
            For more information on Google Analytics cookies, see the official Google Analytics
            page.
          </Text>
        </ListItem>

        <ListItem>
          <Text>
            The Google AdSense service we use to serve advertising uses a DoubleClick cookie to
            serve more relevant ads across the web and limit the number of times that a given ad is
            shown to you.
          </Text>
          <Text>
            For more information on Google AdSense see the official Google AdSense privacy FAQ.
          </Text>
        </ListItem>
      </UnorderedList>

      <Text>
        <strong>More Information</strong>
      </Text>

      <Text>
        Hopefully that has clarified things for you and as was previously mentioned if there is
        something that you aren't sure whether you need or not it's usually safer to leave cookies
        enabled in case it does interact with one of the features you use on our site.
      </Text>

      <Text>
        For more general information on cookies, please read{" "}
        <Link href="https://www.generateprivacypolicy.com/#cookies">
          "Cookies" article from the Privacy Policy Generator
        </Link>
        .
      </Text>

      <Text>
        However if you are still looking for more information then you can contact us through one of
        our preferred contact methods:
      </Text>

      <UnorderedList>
        <ListItem>Email: bluepopcornproduction@gmail.com</ListItem>
      </UnorderedList>
    </AboutContainer>
  );
};

export default CookieConsent;

import React from "react";
import Button from "../ui/Button";
import { IconButton } from "@chakra-ui/react";
import * as ga from "../lib/ga";
import NextLink from "next/link";
import { getCookieConsentValue } from "react-cookie-consent";
import { useCookies } from "react-cookie";

//this looks odd but it's to make sure href are working, it seems not to when using custom component

const GaButton = ({ label = "Button", children, onClick, ...props }) => {
  const [cookies] = useCookies(["CookieConsent"]);
  const GaEvent = () => {
    const isConsent = getCookieConsentValue();
      if (isConsent === "true") {
        ga.event({
          action: label,
        });
      }
    onClick && onClick();
  };
  return (
    <Button onClick={GaEvent} {...props}>
      {children}
    </Button>
  );
};
const GaIconButton = ({ label = "button", children, onClick, href, ...props }) => {
  const [cookies] = useCookies(["CookieConsent"]);
  const GaEvent = () => {
    const isConsent = getCookieConsentValue();
      if (isConsent === "true") {
        ga.event({
          action: label,
        });
      }
    onClick && onClick();
  };

  if (href) {
    return (
      <NextLink href={href} passHref>
        <IconButton onClick={GaEvent} {...props}>
          {children}
        </IconButton>
      </NextLink>
    );
  } else {
    return (
      <IconButton onClick={GaEvent} {...props}>
        {children}
      </IconButton>
    );
  }
};
export { GaIconButton };
export default GaButton;

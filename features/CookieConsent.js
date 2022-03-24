import React, { useEffect } from "react";
import ReactCookieConsent, { getCookieConsentValue, Cookies } from "react-cookie-consent";
import { useCookies } from "react-cookie";

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["CookieConsent"]);
  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true") {
      // if the user is online he agreed to the privacy policy
      setCookie("CookieConsent", "true");
    }
    if (isConsent !== "true") {
      handleDecline();
    }
  }, []);
  const handleAccept = () => {
    window.location.reload();
  };
  const handleDecline = () => {
    //remove google analytics cookies
    Cookies.remove("1P_JAR");
    Cookies.remove("1P_JAR_SUB");
    Cookies.remove("1P_JAR_SUP");
    Cookies.remove("1P_JAR_TMP");
    Cookies.remove("CONSENT");
    Cookies.remove("NID");
    Cookies.remove("AEC");
    Cookies.remove("__gads", { domain: ".google.com"});
    Cookies.remove("__gads", { domain: ".bluepopcorn.fun"});
    Cookies.remove("_ga_DXD5VTP725");
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  return (
      <ReactCookieConsent
        style={{ background: "#00455B" }}
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
      >
        This website uses cookies to enhance the user experience.
      </ReactCookieConsent>
  );
};

export default CookieConsent;

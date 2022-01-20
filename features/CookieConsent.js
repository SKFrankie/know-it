import React, { useEffect } from "react";
import ReactCookieConsent, { getCookieConsentValue, Cookies } from "react-cookie-consent";
import { useUserContext } from "../context/user";
import { useCookies } from "react-cookie";


const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["CookieConsent"]);
  const [currentUser] = useUserContext();
  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === "true" || currentUser?.online) {
      // if the user is online he agreed to the privacy policy
      setCookie("CookieConsent", "true");
    }
    if (isConsent === "false") {
      handleDecline();
    }
  }, [currentUser]);
  // const handleAccept = () => {
  //   console.log("ok alright");
  // };
  const handleDecline = () => {
    //remove google analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };

  return (
    !currentUser.online && (
      <ReactCookieConsent
        style={{ background: "#00455B" }}
        enableDeclineButton
        // onAccept={handleAccept}
        onDecline={handleDecline}
      >
        This website uses cookies to enhance the user experience.
      </ReactCookieConsent>
    )
  );
};

export default CookieConsent;

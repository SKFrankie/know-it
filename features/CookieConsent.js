import React, { useEffect } from "react";
import ReactCookieConsent, { getCookieConsentValue, Cookies } from "react-cookie-consent";
import { useCookies } from "react-cookie";
import Link from "../ui/Link";

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(["CookieConsent"]);
  const [allCookies, setAllCookie, removeAllCookie] = useCookies();
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
    // for (let cookie in allCookies) {
    //   Cookies.remove(cookie);
    // }
    removeAllCookie();
    setTimeout(() => {
      removeAllCookie();
      Cookies.remove("__gads");
      Cookies.remove("__gads", { domain: "localhost", path: "/" });
      Cookies.remove("__gads", { domain: ".know-it.bluepopcorn.fun", path: "/" });
      Cookies.remove("__gads", { domain: ".google.com", path: "/" });
      Cookies.remove("_ga_DXD5VTP725");
      Cookies.remove("_ga");
      Cookies.remove("_gat");
      Cookies.remove("_gid");
      Cookies.remove("__stripe_sid");
      Cookies.remove("__stripe_mid");
      Cookies.remove("1P_JAR");
      Cookies.remove("1P_JAR_SUB");
      Cookies.remove("1P_JAR_SUP");
      Cookies.remove("1P_JAR_TMP");
      Cookies.remove("CONSENT");
      Cookies.remove("NID");
      Cookies.remove("AEC");
    }, 1000);
  };

  return (
      <ReactCookieConsent
        style={{ background: "#00455B" }}
        enableDeclineButton
        onAccept={handleAccept}
        onDecline={handleDecline}
      >
      BluePopcorn Production and its advertising partners use cookies to ensure the proper functioning of certain parts of the site. If you agree to this, please accept or decline the collection of data, however, we must inform you that some cookies are necessary for your experience and cannot be blocked. You can also subscribe to No Ads. See our <Link href="/about/cookies">Cookie Consent Policy</Link> for more information.
      </ReactCookieConsent>
  );
};

export default CookieConsent;

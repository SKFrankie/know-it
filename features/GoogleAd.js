import React from "react";
import { useUserContext } from "../context/user";
import { isPremium } from "../helpers/premium";

const GoogleAdContainer = ({ children }) => {
  const [currentUser] = useUserContext();

  return !isPremium(currentUser) ? children : <></>;
};

const GoogleAd = ({ ...props }) => {
  return (
    <GoogleAdContainer>
      <ins
        className="adsbygoogle"
        style={{display:"block"}}
        data-ad-client={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}`}
        data-ad-slot="7998246655"
        data-adtest={`${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_TEST || "off"}`}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </GoogleAdContainer>
  );
};

export default GoogleAd;

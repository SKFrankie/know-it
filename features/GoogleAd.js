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
      <p>Pub google ici</p>
    </GoogleAdContainer>
  );
};

export default GoogleAd;

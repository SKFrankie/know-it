import React, {useState} from 'react';
import { Flex, Text, Image } from "@chakra-ui/react";
import { useUserContext } from "../../context/user";
import dateToString from "../../helpers/dateToString";
import { CoinCurrency, StarCurrency, StarPercentage } from "../Currency.js";
import {isPremium} from "../../helpers/premium";
import {PremiumDescription} from "../../pages/shop/money";
import Ranking from "./Ranking";

const Profile = ({ userId }) => {
  const [currentUser] = useUserContext();
  const [stripeLoading, setStripeLoading] = useState(false);
  return (
    <Flex direction="column">
      <ProfileFlex direction="row" justify="center">
        <AvatarPicture avatar={currentUser?.currentAvatar} display={{ base: "none", md: "flex" }} />
        <Flex
          minW={{ base: "auto", md: "50%" }}
          direction="column"
          alignItems={{ base: "center", md: "initial" }}
          justify="space-around"
          m={4}
        >
          <AvatarPicture
            avatar={currentUser?.currentAvatar}
            display={{ base: "flex", md: "none" }}
          />
          <Text fontSize="3xl" fontWeight="bold">
            {currentUser.username}
          </Text>
          <Flex my={4}>
            <StarCurrency />
            <CoinCurrency />
          </Flex>
          <StarPercentage />
          <Text fontSize="xs">Member since {dateToString(currentUser.createdAt)}</Text>
        </Flex>
      </ProfileFlex>
      <Flex direction={{ base: "column", md: "row" }} justify="space-between">
        <ProfileFlex mr={{ base: 0, md: 2 }}>
          <Text fontSize="2xl">Ranking</Text>
          <Ranking />
        </ProfileFlex>
        <ProfileFlex ml={{ base: 0, md: 2 }}>
          {isPremium(currentUser) ? (
            <>
              <Text fontSize="2xl">Premium Plan</Text>
              <Text
                fontSize={{ base: "md", md: "3xl" }}
                p={{ base: "auto", md: "5" }}
                textAlign={{ base: "auto", md: "center" }}
              >
                Premium until{" "}
                <Text as="span" color="#F0940B">
                  {dateToString(currentUser.premiumEndingDate)}
                </Text>
              </Text>
            </>
          ) : (
            <PremiumDescription
              stripeLoading={stripeLoading}
              setStripeLoading={setStripeLoading}
              displayButtons={{ base: "flex", md: "flex" }}
            />
          )}
        </ProfileFlex>
      </Flex>
    </Flex>
  );
};

const AvatarPicture = ({ avatar, ...props }) => {
  return (
    <Flex direction="column" minH="fit-content" {...props}>
      <Image
        boxSize={{ base: "40vh", md: "30vh" }}
        src={
          avatar?.picture
            ? avatar?.picture
            : "https://res.cloudinary.com/dvdqswi8x/image/upload/v1639908743/Avatar%20Picture/wprwgtldhxwx4t3ntdur.png"
        }
        alt="avatar"
      />
      {avatar?.collections?.length && !avatar?.collections[0].name.includes("MONSTARS") ? (
        <Text fontSize="xs">{avatar?.collections[0].name}</Text>
      ) : null}
    </Flex>
  );
};

const ProfileFlex = ({ children, ...props }) => {
  return (
    <Flex
      borderRadius="10px"
      boxShadow="0px 4px 4px rgba(0, 185, 245, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25)"
      p={3}
      my={4}
      bg="deepDarkBlue"
      direction="column"
      w="100%"
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Profile;

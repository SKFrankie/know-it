import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useUserContext } from "../../context/user";
import dateToString from "../../helpers/dateToString";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import { CoinCurrency, StarCurrency, StarPercentage } from "../Currency.js";
import { isPremium } from "../../helpers/premium";
import { PremiumDescription } from "../../pages/shop/money";
import Ranking from "./Ranking";
import Loading from "../Loading";

const GET_USERS_FROM_ID = gql`
  query Users($userId: ID!) {
    users(where: { userId: $userId }) {
      userId
      points
      username
      createdAt
      stars
      coins
      starPercentage
      currentAvatar {
        picture
        collections {
          name
        }
      }
    }
  }
`;

const Profile = ({ userId }) => {
  const [currentUser] = useUserContext();
  const [stripeLoading, setStripeLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [getUsers] = useLazyQuery(GET_USERS_FROM_ID, {
    variables: { userId },
    onCompleted: (data) => {
      setUser(data.users[0]);
    },
    onError: (error) => {
      console.log(error);
      setUser(currentUser);
    },
  });
  useEffect(() => {
    if (userId) {
      getUsers();
    } else {
      setUser(currentUser);
    }
  }, [userId, currentUser]);

  return (
    <Flex direction="column">
      {user ? (
        <>
          <ProfileFlex direction="row" justify="center">
            <AvatarPicture avatar={user?.currentAvatar} display={{ base: "none", md: "flex" }} />
            <Flex
              minW={{ base: "auto", md: "50%" }}
              direction="column"
              alignItems={{ base: "center", md: "initial" }}
              justify="space-around"
              m={4}
            >
              <AvatarPicture avatar={user?.currentAvatar} display={{ base: "flex", md: "none" }} />
              <Text fontSize="3xl" fontWeight="bold">
                {user?.username}
              </Text>
              <Flex my={4}>
                <StarCurrency quantity={userId ? user?.stars : null} />
                <CoinCurrency quantity={userId ? user?.coins : null} />
              </Flex>
              <StarPercentage quantity={userId ? user?.starPercentage : null} />
              <Text fontSize="xs">Member since {dateToString(user?.createdAt)}</Text>
            </Flex>
          </ProfileFlex>
          <Flex direction={{ base: "column", md: "row" }} justify="space-between">
            <ProfileFlex mr={{ base: 0, md: 2 }}>
              <Text fontSize="2xl">Ranking</Text>
              <Ranking userId={userId} />
            </ProfileFlex>
            {userId ? null : (
              <ProfileFlex ml={{ base: 0, md: 2 }}>
                {isPremium(user) ? (
                  <>
                    <Text fontSize="2xl">Premium Plan</Text>
                    <Text
                      fontSize={{ base: "md", md: "3xl" }}
                      p={{ base: "auto", md: "5" }}
                      textAlign={{ base: "auto", md: "center" }}
                    >
                      Premium until{" "}
                      <Text as="span" color="#F0940B">
                        {dateToString(user.premiumEndingDate)}
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
            )}
          </Flex>{" "}
        </>
      ) : (
        <Loading />
      )}
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

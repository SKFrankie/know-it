import React, { useState, useEffect } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Flex, Text, Image, Spacer } from "@chakra-ui/react";
import { useUserContext } from "../../context/user";
import dateToString from "../../helpers/dateToString";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import { CoinCurrency, StarCurrency, StarPercentage, MedalCurrency } from "../Currency.js";
import { isPremium } from "../../helpers/premium";
import { PremiumDescription } from "../../pages/shop/money";
import Ranking from "./Ranking";
import Loading from "../Loading";
import { LinkOverlay } from "../../ui/Link";

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

const Profile = ({ userId, ...props }) => {
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
    <Flex 
      direction="column"
      pb="5vh"
      {...props}
    >
      {user ? (
        <>
          <ProfileFlex direction="row" justify="center">
            <AvatarPicture avatar={user?.currentAvatar} display={{ base: "none", lg: "flex" }} />
            <Flex
              minW={{ base: "auto", lg: "50%" }}
              direction="column"
              alignItems={{ base: "center", lg: "initial" }}
              justify="space-around"
              m={4}
            >
              <AvatarPicture avatar={user?.currentAvatar} display={{ base: "flex", lg: "none" }} />
              <Text fontSize="3xl" fontWeight="bold">
                {user?.username}
              </Text>
              <Flex my={4}>
                <StarCurrency quantity={userId ? user?.stars : null} />
                <CoinCurrency quantity={userId ? user?.coins : null} />
                <MedalCurrency rightIcon={false} quantity={userId ? user?.points : null} />
              </Flex>
              <StarPercentage quantity={userId ? user?.starPercentage : null} />
              <Text fontSize="xs">Member since {dateToString(user?.createdAt)}</Text>
            </Flex>
          </ProfileFlex>
          <Flex direction={{ base: "column", lg: "row" }} justify="space-between">
            <ProfileFlex mr={{ base: 0, lg: 2 }}>
              <LinkOverlay href="/knowlympics">
                <Text fontSize="2xl">Current Ranking</Text>
              </LinkOverlay>
              <Spacer />
              <LinkOverlay href="/knowlympics">
                <Ranking userId={userId} />
              </LinkOverlay>
              <Spacer />
            </ProfileFlex>
            {userId ? null : (
              <ProfileFlex ml={{ base: 0, lg: 2 }}>
                {isPremium(user) ? (
                  <>
                    <Text fontSize="2xl">Premium Bundle</Text>
                    <Text
                      fontSize={{ base: "md", lg: "3xl" }}
                      p={{ base: "auto", lg: "5" }}
                      textAlign={{ base: "auto", lg: "center" }}
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
                    displayButtons={{ base: "flex", lg: "flex" }}
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
    <Flex direction="column" {...props}>
      <Image
        boxSize={{ base: "40vh", lg: "30vh" }}
        w="auto"
        h="auto"
        borderRadius={{ base: "50%", lg: "10px" }}
        src={
          avatar?.picture
            ? avatar?.picture
            : "https://res.cloudinary.com/dvdqswi8x/image/upload/f_auto/v1646038725/Avatar%20Picture/bws9ei18vgswkgitk6qs.jpg"
        }
        alt="avatar"
      />
      {
        avatar?.collections?.length && !avatar?.collections[0].name.includes("MONSTARS") ? 
        ( <Text fontSize="xs">{avatar?.collections[0].name}</Text> ) : null
      }
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

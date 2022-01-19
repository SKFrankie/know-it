import {useState} from "react";
import { Flex, Text, Image } from "@chakra-ui/react";
import { useUserContext } from "../context/user";
import dateToString from "../helpers/dateToString";
import { CoinCurrency, StarCurrency, StarPercentage } from "../features/Currency.js";
import {isPremium} from "../helpers/premium";
import {PremiumDescription} from "./shop/money";

const Profile = () => {
  const [currentUser] = useUserContext();
  const [stripeLoading, setStripeLoading] = useState(false);
  return (
    <Flex direction="column">
      <ProfileFlex direction="row">
        <AvatarPicture
          picture={currentUser.currentAvatar?.picture}
          display={{ base: "none", md: "block" }}
        />
        <Flex
          minW={{ base: "auto", md: "50%" }}
          direction="column"
          alignItems={{ base: "center", md: "initial" }}
          justify="space-around"
          m={4}
        >
          <AvatarPicture
            picture={currentUser.currentAvatar?.picture}
            display={{ base: "block", md: "none" }}
          />
          <Text fontSize="3xl" fontWeight="bold">
            {currentUser.username}
          </Text>
          <Text fontSize="xs">Member since {dateToString(currentUser.createdAt)}</Text>
          <Flex my={4}>
            <StarCurrency />
            <CoinCurrency />
          </Flex>
          <StarPercentage />
        </Flex>
      </ProfileFlex>
      <ProfileFlex>
        <Text fontSize="2xl">Ranking</Text>
      </ProfileFlex>
      <ProfileFlex>
        {isPremium(currentUser) ? (
          <>
            <Text fontSize="2xl">Premium Plan</Text>
            <Text>Premium until: {dateToString(currentUser.premiumEndingDate)} </Text>
          </>
        ) : 
          <PremiumDescription
            stripeLoading={stripeLoading}
            setStripeLoading={setStripeLoading}
            displayButtons={{ base: "flex", md: "flex" }}
          />
        }
      </ProfileFlex>
    </Flex>
  );
};

const AvatarPicture = ({ picture, ...props }) => {
  return (
    <Image
      boxSize={{ base: "50%", md: "20%" }}
      src={picture ? picture : "https://bit.ly/dan-abramov"}
      alt="avatar"
      {...props}
    />
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
      {...props}
    >
      {children}
    </Flex>
  );
};

export default Profile;

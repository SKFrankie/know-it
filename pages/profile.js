import { Flex, Text, Image } from "@chakra-ui/react";
import { useUserContext } from "../context/user";
import dateToString from "../helpers/dateToString";
import { CoinCurrency, StarCurrency, StarPercentage } from "../features/Currency.js";

const profile = () => {
  const [currentUser] = useUserContext();
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
            <CoinCurrency /> <StarCurrency />
          </Flex>
          <StarPercentage />
        </Flex>
      </ProfileFlex>
      <ProfileFlex>
        <Text fontSize="2xl">Ranking</Text>
      </ProfileFlex>
      <ProfileFlex>
        <Text fontSize="2xl">Premium Plan / Get Premium</Text>
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
      borderRadius="15px"
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

export default profile;

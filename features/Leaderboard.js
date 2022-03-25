import React, { useState } from "react";
import { Flex, Text, Input, Image } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { getFirstDayOfWeek, getLastDayOfWeek } from "./games/helpers";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { useUserContext } from "../context/user";
import {MedalCurrency} from "./Currency"
import Loading from "./Loading";
import Error from "./Error";
import NextLink from "next/link";

// different query to get current week rank
const RANKING_USERS = gql`
  query RankingUsers {
    rankingUsers: currentRankingUsers {
      userId
      points
      username
      currentAvatar {
        picture
      }
    }
  }
`;

const Leaderboard = () => {
  const TOP_USERS_NUMBER = 50;
  const [currentUser] = useUserContext();
  const [users, setUsers] = useState([]);
  const { data, loading, error } = useQuery(RANKING_USERS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setUsers(data.rankingUsers);
    },
    ...basicQueryResultSupport,
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    if (!value && data.rankingUsers) {
      setUsers(data.rankingUsers);
      return;
    }
    const filteredUsers = data?.rankingUsers.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
  };

  const displayUser = (user) => {
    if (users.find((u) => u.userId === user.userId)) {
      return true;
    }
    return false;
  };

  const isInTop = (index) => {
    if (users.length < TOP_USERS_NUMBER || index < TOP_USERS_NUMBER) {
      return true;
    }
    return false;
  };

  const isInBasicRanking = (user, index) => {
    if (index >= TOP_USERS_NUMBER) {
      if (
        data.rankingUsers.length >= index + 2 &&
        data.rankingUsers[index + 1].userId === currentUser.userId
      ) {
        // is after current user
        return true;
      }
      if (user.userId === currentUser.userId) {
        // is current user
        return true;
      }
      if (index - 1 >= 0 && data.rankingUsers[index - 1].userId === currentUser.userId) {
        // is before current user
        return true;
      }
    }
    return false;
  };

  const isTruncatable = (index) => {
    if (index === TOP_USERS_NUMBER) {
      return true;
    }
    if (index - 2 >= 0 && data.rankingUsers[index - 2].userId === currentUser.userId) {
      return true;
    }
    return false;
  };

  return (
    <Flex
      direction="column"
      bg="deepDarkBlue"
      textAlign="center"
      p={2}
      w={{ base: "90%", md: "80%" }}
      borderRadius={10}
      my={4}
    >
      <Text fontSize="lg">Weekly Ranking</Text>
      <Text>~</Text>
      <Text fontSize="xs">
        {getFirstDayOfWeek()} - {getLastDayOfWeek()}
      </Text>
      {data && (
        <Flex direction="column" justify="center" align="center" w="100%" mt={2}>
          <Searchbar onChange={handleSearch} />
          <Head/>
          {(data?.rankingUsers || []).map((user, index) => {
            if (isInTop(index)) {
              return (
                <Row
                  display={displayUser(user)}
                  user={user}
                  key={user.userId}
                  index={index}
                  length={users.length}
                />
              );
            }
            if (isInBasicRanking(user, index)) {
              return (
                <Row
                  display={displayUser(user)}
                  user={user}
                  key={user.userId}
                  index={index}
                  length={users.length}
                />
              );
            }
            if (isTruncatable(index)) {
              return (
                <Text key={user.userId} fontSize="xs">
                  ...
                </Text>
              );
            }
            return null;
          })}
        </Flex>
      )}
      {loading && <Loading />}
      {error && <Error />}
    </Flex>
  );
};

const Row = ({ display = true, user, index, length, ...props }) => {
  const [currentUser] = useUserContext();
  return (
    display && (
      <NextLink href={`/profile/${user.userId}`}>
        <Flex
          my="0.5px"
          borderTopRadius={0}
          borderBottomRadius={index + 1 === length ? 6 : 0}
          bg={user.userId === currentUser?.userId ? "orange" : "blueClear.500"}
          textAlign="center"
          w="100%"
          key={user.userId}
          direction="row"
          justify="space-between"
          p={1}
          px={5}
          fontSize={{ base: "sm", md: "md" }}
          align="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          {...props}
        >
          <AvatarImage user={user} />
          <Text flex={1} textAlign="start">
            {user.username}
          </Text>
          <Text flex={3}>{index + 1}</Text>
          <MedalCurrency quantity={user.points} />
        </Flex>
      </NextLink>
    )
  );
};

const Head = () => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      w="100%"
      p={1}
      px={5}
      fontSize={{ base: "sm", md: "md" }}
      align="center"
      bg="blueClear.500"
      borderTopRadius={6}
      textAlign="center"
    >
    <Flex w="40px" h="40px" justify="center" align="center"/>
      <Text flex={1} textAlign="start">
        Username
      </Text>
      <Text flex={3}>Ranking</Text>
      <Text mx={2}>
        Medals
      </Text>
    </Flex>
  );
};

const AvatarImage = ({ user }) => {
  return (
    <Image
      boxSize="40px"
      mr={2}
      borderRadius={5}
      src={
        user?.currentAvatar?.picture ||
        "https://res.cloudinary.com/dvdqswi8x/image/upload/v1646038725/Avatar%20Picture/bws9ei18vgswkgitk6qs.jpg"
      }
      alt="no gigil"
    />
  );
};

const Searchbar = ({ onChange }) => {
  return (
    <Input onChange={onChange} bg="white" my={3} placeholder="Find a friend’s ranking by username" color="black" />
  );
};

export default Leaderboard;

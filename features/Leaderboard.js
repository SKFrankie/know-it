import React, { useState } from "react";
import { Flex, Text, Input } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { getFirstDayOfLastWeek, getLastDayOfLastWeek } from "./games/helpers";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { useUserContext } from "../context/user";
import Loading from "./Loading";
import Error from "./Error";

// testing data
// rankingUsers : users {
//   userId
//   points
//   username
// }
const RANKING_USERS = gql`
  query RankingUsers {
    rankingUsers {
      userId
      points
      username
    }
  }
`;

// const dataUsers = [
//   { userId: 1, username: "mark", points: 500 },
//   { userId: 2, username: "jane", points: 300 },
//   { userId: 3, username: "john", points: 200 },
//   { userId: 4, username: "joe", points: 100 },
//   { userId: 5, username: "jim", points: 50 },
//   { userId: 6, username: "jeff", points: 10 },
// ];

const Leaderboard = () => {
  const [currentUser] = useUserContext();
  const [users, setUsers] = useState([]);
  const { data, loading, error } = useQuery(RANKING_USERS, {
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

  const isInTopThree = (index) => {
    if (users.length < 3 || index < 3) {
      return true;
    }
    return false;
  };

  const isInBasicRanking = (user, index) => {
    if (index >= 3) {
      if (
        data.rankingUsers.length >= index + 2 &&
        data.rankingUsers[index + 1].userId === currentUser.userId
      ) {
        return true;
      }
      if (user.userId === currentUser.userId) {
        return true;
      }
      if (index - 1 >= 0 && data.rankingUsers[index - 1].userId === currentUser.userId) {
        return true;
      }
    }
    return false;
  };

  const isTruncatable = (index) => {
    if (index === 3) {
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
      p={1}
      w={{ base: "90%", md: "80%" }}
      borderRadius={10}
      my={4}
    >
      <Text>Weekly Ranking</Text>
      <Text>~</Text>
      <Text fontSize="xs">
        {getFirstDayOfLastWeek()} - {getLastDayOfLastWeek()}
      </Text>
      {data && (
        <Flex direction="column" justify="center" align="center" w="100%" mt={2}>
          <Searchbar onChange={handleSearch} />
          {(data?.rankingUsers || []).map((user, index) => {
            if (isInTopThree(index)) {
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
      <Flex
        my="0.5px"
        borderTopRadius={index ? 0 : 6}
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
        {...props}
      >
        <Text flex={1} textAlign="start">
          {user.username}
        </Text>
        <Text flex={1}>{index + 1}</Text>
        <Text flex={1} textAlign="end">
          {user.points}
        </Text>
      </Flex>
    )
  );
};

const Searchbar = ({ onChange }) => {
  return (
    <Input onChange={onChange} bg="white" my={3} placeholder="Search by username" color="black" />
  );
};

export default Leaderboard;

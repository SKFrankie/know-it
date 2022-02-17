import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Text } from "@chakra-ui/react";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import { useUserContext } from "../../context/user";
import Loading from "../Loading";
import Error from "../Error";

const RANKING_USERS = gql`
  query RankingUsers {
    rankingUsers: currentRankingUsers {
      userId
      points
      username
    }
  }
`;

const Ranking = ({ userId }) => {
  const [currentUser] = useUserContext();
  const [rank, setRank] = useState(null);
  const { data, loading, error } = useQuery(RANKING_USERS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      const userIdToCheck = userId || currentUser.userId;
      const tmpRank = data.rankingUsers.findIndex((user) => user.userId === userIdToCheck);
      if (tmpRank >= 0) {
        setRank(tmpRank + 1);
      }
    },
    ...basicQueryResultSupport,
  });

  const getSuperscriptOrdinal = (i) => {
    let j = i % 10;
    let k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
  };


  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {rank ? (
        <Text fontSize={{ base: "md", md: "3xl" }} p={{ base: "auto", md: "5" }} textAlign="center">
          You are in{" "}
          <Text as="span" color="#F0940B">
            {getSuperscriptOrdinal(rank)}
          </Text>{" "}
          place!
        </Text>
      ) : (
        <Text textAlign="center">No rank yet this week</Text>
      )}
    </>
  );
};

export default Ranking;

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
    onCompleted: (data) => {
      const userIdToCheck = userId || currentUser.userId;
      const tmpRank = data.rankingUsers.findIndex((user) => user.userId === userIdToCheck);
      if (tmpRank >= 0) {
        setRank(tmpRank + 1);
      }
    },
    ...basicQueryResultSupport,
  });

  const getSuperscriptOrdinal = (n) => {
    switch (n) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <>
      {loading && <Loading />}
      {error && <Error />}
      {rank ? (
        <Text
          fontSize={{ base: "md", md: "3xl" }}
          p={{ base: "auto", md: "5" }}
          textAlign={{ base: "auto", md: "center" }}
        >
          Current rank{" "}
          <Text as="span" color="#F0940B">
            {rank}
            {getSuperscriptOrdinal(rank)}
          </Text>
        </Text>
      ) : (
        <Text>No rank yet this week</Text>
      )}
    </>
  );
};

export default Ranking;

import { createContext, useContext, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { isCurrentWeek } from "../features/games/helpers";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";

// rankingUsers must be used only here to get last week ranking
const CURRENT_USER_AND_TOP_3 = gql`
  query CurrentUser {
    currentUser {
      userId
      username
      age
      mail
      coins
      stars
      starPercentage
      daysInArow
      lastSeen
      createdAt
      points
      lastRankingDate
      rankingGift
      tpo
      premiumEndingDate
      currentAvatar {
        avatarId
        picture
        collections {
          name
        }
      }
      inventory {
        avatarId
        name
        picture
      }
    }
    rankingUsers(limit: 3) {
      userId
    }
    lastRankingGiftDate
  }
`;

const SET_USERS_GIFTS = gql`
  mutation SetUsersGifts($first: ID, $second: ID, $third: ID) {
    setUsersGifts(first: $first, second: $second, third: $third) {
      userId
      rankingGift
    }
  }
`;

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState({ online: false, loading: true });
  const [SetUsersGifts] = useMutation(SET_USERS_GIFTS, {
    onCompleted(data) {
      setCurrentUser({ ...currentUser, ...data.setUsersGifts });
    },
    ...basicQueryResultSupport,
  });

  const { loading, refetch } = useQuery(CURRENT_USER_AND_TOP_3, {
    onCompleted(res) {
      const online = res.currentUser !== null;
      setCurrentUser({ online, loading: false, ...res.currentUser });

      // ranked gift logic
      // first we get the top 3
      const [first, second, third] = res.rankingUsers;
      // then the last time users had a ranked gift
      const lastRankingGiftDate = new Date(res.lastRankingGiftDate);
      if (!isCurrentWeek(lastRankingGiftDate)) {
        // if it was not this week, the first user to log this week triggers the gifting process
        SetUsersGifts({
          variables: { first: first?.userId, second: second?.userId, third: third?.userId },
        });
      }
    },
    onError(err) {
      setCurrentUser({ online: false, loading: false });
    },
  });

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser, { loading, refetch }]}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

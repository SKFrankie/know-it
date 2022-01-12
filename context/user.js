import { createContext, useContext, useState } from "react";
import { useQuery, gql } from "@apollo/client";
const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      userId
      username
      mail
      coins
      stars
      starPercentage
      daysInArow
      lastSeen
      createdAt
      points
      lastRankingDate
      lastRankingGiftDate
      rankingGift
      currentAvatar {
        avatarId
        picture
      }
      inventory {
        avatarId
        picture
      }
    }
  }
`;

const UserContext = createContext();

export function UserWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState({ online: false, loading: true });
  const { loading, refetch } = useQuery(CURRENT_USER, {
    onCompleted(res) {
      const online = res.currentUser !== null;
      setCurrentUser({ online, loading: false, ...res.currentUser });
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

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../Loading";
import { useUserContext } from "../../context/user";
import { redirect } from "./helper";
import { GAMES_SECTIONS } from "../../constants";

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

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser, { setRefetch }] = useUserContext();
  const { loading, refetch } = useQuery(CURRENT_USER, {
    onCompleted(res) {
      const online = res.currentUser !== null;
      setCurrentUser({ online, loading: false, ...res.currentUser });
      setRefetch(refetch);
    },
    onError(err) {
      setCurrentUser({ online: false, loading: false });
    },
  });

  useEffect(() => {
    authCheck(router.asPath);
  }, [currentUser]);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    let publicGames = GAMES_SECTIONS.slice(0)
    publicGames = publicGames.map(section => section.path);
    const publicPaths = ["/login", "/signup", "/", "/shop/coins", "/shop/money", "/about", "/settings", ...publicGames];
    const path = url.split("?")[0];
    if (!currentUser.loading && !currentUser.online && !publicPaths.includes(path)) {
      setAuthorized(false);
      redirect(router, "/login");
    } else {
      setAuthorized(true);
      if (currentUser.online && ["/login", "/signup"].includes(path)) {
        redirect(router, "/");
      }
    }
  }

  if (loading) {
    return <Loading />;
  }
  return authorized && children;
};
export { RouteGuard };

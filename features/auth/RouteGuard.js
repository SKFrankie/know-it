import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Loading from "../Loading";
import { useUserContext } from "../../context/user";
import { redirect } from "./helper";
import { GAMES_SECTIONS } from "../../constants";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser, { loading }] = useUserContext();

  useEffect(() => {
    authCheck(router.asPath);
  }, [currentUser]);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    let publicGames = GAMES_SECTIONS.slice(0);
    publicGames = publicGames.map((section) => section.path);
    const publicPaths = [
      "/login",
      "/signup",
      "/",
      "/shop/coins",
      "/shop/money",
      "/about",
      "/settings",
      ...publicGames,
    ];
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

  if (currentUser?.loading || loading) {
    return <Loading />;
  }
  return authorized && children;
};
export { RouteGuard };

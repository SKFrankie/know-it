import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Loading from "../Loading";

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      username
      mail
    }
  }
`;

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    online: false,
    loading: true,
  });
  const { loading } = useQuery(CURRENT_USER, {
    onCompleted(res) {
      const online = res.currentUser !== null;
      setCurrentUser({ online, loading: false, ...res.currentUser });
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
    const publicPaths = ["/login", "/signup"];
    const path = url.split("?")[0];
    if (!currentUser.loading && !currentUser.online && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push("/login");
    } else {
      setAuthorized(true);
      if (currentUser.online && publicPaths.includes(path)) {
        router.push("/");
      }
    }
  }

  if (loading) {
    return <Loading />;
  }
  return authorized && children;
};
export { RouteGuard };

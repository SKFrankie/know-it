import { useRouter } from "next/router";
import { useEffect } from 'react';
import { storeToken } from "../../features/auth/helper";

const Resetpassword = () => {
  const router = useRouter();
  const { token } = router.query;
  useEffect(() => {
    if (!token) {
      router.push("/");
    }
      storeToken(token, router, "/settings?openPassword=true");
  }, [token]);
  return <div>Reset password</div>;
};

export default Resetpassword;

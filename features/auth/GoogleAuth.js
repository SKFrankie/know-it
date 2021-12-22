import React from "react";
import ReactGoogleLogin from "react-google-login";
import { useMutation, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Loading from "../Loading";
import { storeToken } from "./helper";
import { useRouter } from "next/router";

const GOOGLE_SIGN_UP = gql`
  mutation GoogleSignup($token: String!) {
    googleSignup(token: $token) {
      token
    }
  }
`;

const GOOGLE_LOGIN = gql`
  mutation GoogleLogin($token: String!) {
    googleLogin(token: $token) {
      token
    }
  }
`;

const GoogleSignup = () => {
  const router = useRouter();
  const handleSuccess = (response) => {
    const token = response.tokenId;
    googleSignup({ variables: { token } });
  };
  const [googleSignup, { loading }] = useMutation(GOOGLE_SIGN_UP, {
    onCompleted(data) {
      storeToken(data.googleSignup.token, router);
    },
    ...basicQueryResultSupport,
  });
  return <GoogleAuth text="Sign up with google" handleSuccess={handleSuccess} loading={loading} />;
};
const GoogleLogin = () => {
  const router = useRouter();
  const handleSuccess = (response) => {
    const token = response.tokenId;
    googleLogin({ variables: { token } });
  };
  const [googleLogin, { loading }] = useMutation(GOOGLE_LOGIN, {
    onCompleted(data) {
      storeToken(data.googleLogin.token, router);
    },
    ...basicQueryResultSupport,
  });
  return <GoogleAuth text="Login with google" handleSuccess={handleSuccess} loading={loading} />;
};

const GoogleAuth = ({ text = "Login with google", handleSuccess, loading = false }) => {
  const handleFailure = (response) => {
    console.log(response.error);
  };
  return (
    <>
      <ReactGoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID}
        buttonText={text}
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
      {loading && <Loading />}
    </>
  );
};

export { GoogleSignup, GoogleLogin };
export default GoogleAuth;

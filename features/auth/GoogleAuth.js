import React from "react";
import GoogleLogin from "react-google-login";
import { useMutation, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";
import Loading from "../Loading";

const GOOGLE_SIGN_UP = gql`
  mutation GoogleSignup($token: String!) {
    googleSignup(token: $token) {
      token
    }
  }
`;

const GoogleSignup = () => {
  const handleSuccess = (response) => {
    const token = response.tokenId;
    googleSignup({ variables: { token } });
  };
  const [googleSignup, { loading }] = useMutation(GOOGLE_SIGN_UP, {
    onCompleted(data) {
      localStorage.setItem("token", data.googleSignup.token);
      location.reload();
    },
    ...basicQueryResultSupport,
  });
  return <GoogleAuth text="Sign up with google" handleSuccess={handleSuccess} loading={loading} />;
};

const GoogleAuth = ({ text = "Login with google", handleSuccess, loading = false }) => {
  const handleFailure = (response) => {
    console.log(response.error);
  };
  return (
    <>
      <GoogleLogin
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

export { GoogleSignup };
export default GoogleAuth;

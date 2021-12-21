import React from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { GoogleLogin } from "./auth/GoogleAuth";
import { storeToken } from "./auth/helper";
const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(mail: $email, password: $password) {
      token
    }
  }
`;

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      username
    }
  }
`;

export default function Login() {
  const { data } = useQuery(CURRENT_USER, {
    onCompleted(data) {
      console.log("current", data);
    },
    ...basicQueryResultSupport,
  });

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      storeToken(data.login.token);
    },
    ...basicQueryResultSupport,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error(error);
    return null;
  }
  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            setSubmitting(false);
            login({ variables: values });
          }, 1000);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email}>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input {...field} id="email" type="email" placeholder="email" />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="password"
                    autoComplete="current-password"
                  />
                </FormControl>
              )}
            </Field>
            <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
              Submit
            </Button>
          </form>
        )}
      </Formik>

      <p> {data?.currentUser?.username} ici</p>

      <GoogleLogin />
    </>
  );
}

import React from "react";
import { useMutation, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { FormControl, Text } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { GoogleLogin } from "./auth/GoogleAuth";
import { storeToken } from "./auth/helper";
import { useRouter } from "next/router";
import Link from "../ui/Link";
import Form from "../ui/Form";
import { Error } from "../ui/Alert";

import Input from "../ui/Input";
import { SubmitButton } from "../ui/Button";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(mail: $email, password: $password) {
      token
    }
  }
`;

export default function Login() {
  const router = useRouter();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted(data) {
      storeToken(data.login.token, router);
    },
    ...basicQueryResultSupport,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            login({ variables: values });
          }, 1000);
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit} style={{ marginTop: "4rem" }}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email}>
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="Email"
                    first={true}
                    required
                  />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password}>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    last={true}
                    required
                  />
                </FormControl>
              )}
            </Field>
            <SubmitButton isLoading={props.isSubmitting}>Login</SubmitButton>
            <Text align="center">
              No account yet? <Link href="signup">Sign Up</Link>
            </Text>
            <GoogleLogin />
            {error && <Error title="Something went wrong" />}
          </Form>
        )}
      </Formik>
    </>
  );
}

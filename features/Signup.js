import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { Formik, Field } from "formik";

const SIGN_UP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(mail: $email, username: $username, password: $password) {
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

export default function Signup() {
  const { data } = useQuery(CURRENT_USER, {
    onCompleted(data) {
      console.log("current", data);
    },
    ...basicQueryResultSupport,
  });

  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      localStorage.setItem("token", data.signup.token);
      location.reload();
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
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            console.log(values);
            setSubmitting(false);
            signup({ variables: values });
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
            <Field name="username">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.username}>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} id="username" placeholder="username" />
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
    </>
  );
}

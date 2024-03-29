import React from "react";
import { useMutation, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { Checkbox, FormControl, Text } from "@chakra-ui/react";
import { Formik, Field } from "formik";
import { GoogleSignup } from "./auth/GoogleAuth";
import { storeToken } from "./auth/helper";
import { useRouter } from "next/router";
import Input, { Password } from "../ui/Input";
import { SubmitButton } from "../ui/Button";
import { Error } from "../ui/Alert";
import Link from "../ui/Link";
import Form from "../ui/Form";
import Loading from "./Loading";

const SIGN_UP = gql`
  mutation Signup($email: String!, $username: String!, $password: String!) {
    signup(mail: $email, username: $username, password: $password) {
      token
    }
  }
`;

const validatePassword = (password, confirm) => {
  if (password !== confirm && confirm !== "") {
    return "Passwords don't match";
  }
  return "";
};

const validateCheckbox = (value) => {
  if (!value) {
    return "You must accept the terms and conditions";
  }
};
export default function Signup() {
  const router = useRouter();

  const [signup, { loading, error }] = useMutation(SIGN_UP, {
    onCompleted(data) {
      storeToken(data.signup.token, router);
    },
    ...basicQueryResultSupport,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Text mt={2} align="center" fontSize="xl">
        Already registered? <Link color="#69fb69" href="login">Login</Link>
      </Text>
      <Formik
        initialValues={{ email: "", username: "", password: "", confirm: "", checkbox: false }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            const { email, username, password } = values;
            signup({ variables: { email, username, password } });
          }, 1000);
        }}
      >
        {({ errors, ...props }) => (
          <Form onSubmit={props.handleSubmit}>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email}>
                  <Input
                    first
                    {...field}
                    id="email"
                    type="email"
                    placeholder="email"
                    autoComplete="email"
                    required
                  />
                </FormControl>
              )}
            </Field>
            <Field name="username">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.username}>
                  <Input
                    {...field}
                    id="username"
                    placeholder="username"
                    autoComplete="username"
                    maxLength="15"
                    required
                  />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password}>
                  <Password
                    {...field}
                    id="password"
                    placeholder="password"
                    autoComplete="current-password"
                    required
                  />
                </FormControl>
              )}
            </Field>
            <Field
              name="confirm"
              validate={(value) => validatePassword(props.values.password, value)}
            >
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.password}>
                  <Password
                    {...field}
                    id="confirm"
                    placeholder="confirm password"
                    autoComplete="current-password"
                    required
                    last
                  />
                </FormControl>
              )}
            </Field>
            {errors.confirm && <Error title={errors.confirm} />}
            <Field name="checkbox" validate={validateCheckbox}>
              {({ field }) => (
                <FormControl my="2">
                  <Checkbox {...field} color="white" required>
                    <Text>
                      I agree to the{" "}
                      <Link target="_blank" href="/about/terms-of-service">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link target="_blank" href="/about/privacy-policy">
                        Privacy Policy
                      </Link>
                    </Text>
                  </Checkbox>
                </FormControl>
              )}
            </Field>
            <SubmitButton
              disabled={
                props.isSubmitting || errors.confirm || errors.checkbox || !props.values.checkbox
              }
              isLoading={props.isSubmitting}
            >
              Sign up
            </SubmitButton>
            <Text fontSize="3xl" fontWeight="bold" textAlign="center">
              OR
            </Text>
            <GoogleSignup disabled={errors.checkbox || !props.values.checkbox} />
            <Text fontSize="sm" textAlign="center">
              (You have to agree to Terms of Service first)
            </Text>
            {errors.checkbox && <Error title={errors.checkbox} />}
            {error && <Error title="Something went wrong" />}
          </Form>
        )}
      </Formik>
    </>
  );
}

import {useState} from "react";
import { useMutation, gql } from "@apollo/client";
import ClientOnly from "../features/ClientOnly";
import Title from "../ui/Title";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { FormControl, Text } from "@chakra-ui/react";
import { Error } from "../ui/Alert";

import Input from "../ui/Input";
import {SubmitButton} from "../ui/Button";
import Form from '../ui/Form';

const RESET_PASSWORD = gql`
  mutation Resetpassword($mail: String!) {
    resetPassword(mail: $mail)
  }
`;

export default function ForgotPassword() {
  const [mail, setMail] = useState("");
  const [success, setSuccess] = useState(false);
  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted() {
      setSuccess(true);
    },
    ...basicQueryResultSupport,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetPassword({ variables: { mail } });
  };

  return (
    <ClientOnly>
      <Title />
      <Text fontSize="4xl" textAlign="center" m="3">I forgot my password</Text>
      <Form onSubmit={handleSubmit}>
      <FormControl>
        <Input
          id="email"
          type="email"
          placeholder="Your Email Address"
          autoComplete="email"
          first={true}
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          last
        />
      </FormControl>
      <SubmitButton isLoading={loading}>Reset my password</SubmitButton>
      </Form>
      {error && <Error>Something went wrong. Please enter the email address you used to sign up or continue using Google authentification.</Error>}
      {success && (<Text textAlign="center">An email with a link to reset your password has been sent to you.  Be sure to check your SPAM.</Text>)}
    </ClientOnly>
  );
}

import React from "react";
import { useUserContext } from "../../context/user";
import { Flex, Text, useToast } from "@chakra-ui/react";
import { PopUp } from "../../ui/Modal";
import Input from "../../ui/Input";
import { SubmitButton } from "../../ui/Button";
import { useMutation, gql } from "@apollo/client";
import { basicQueryResultSupport } from "../../helpers/apollo-helpers";

const UPDATE_USER = gql`
  mutation UpdateUser($mail: String, $username: String, $age: Int) {
    updateCurrentUser(mail: $mail, username: $username, age: $age) {
      mail
      username
      age
    }
  }
`;

const CHANGE_USER_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!) {
    changePassword(newPassword: $newPassword)
  }
`;

const AccountSettingPopup = ({ label, type, isOpen, onClose }) => {
  const [currentUser, setCurrentUser, { refetch }] = useUserContext();
  const [value, setValue] = React.useState(currentUser?.[label] || "");
  const [confirm, setConfirm] = React.useState("");

  const toast = useToast();

  const [changePassword] = useMutation(CHANGE_USER_PASSWORD, {
    variables: { newPassword: value },
    onCompleted: () => {
      toast({
        title: "Password updated",
        description: "Your password has been updated",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      const description = "An error occured while trying to update your password";
      toast({
        title: "Error",
        description,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      if (value !== currentUser?.[label]) {
        toast({
          title: "Sucess",
          description: "your account has been updated",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCurrentUser({ ...currentUser, [label]: data?.[label] });
        refetch();
      }
      onClose();
    },
    onError: (error) => {
      const description =
        label === "mail" ? "This email might already have an account" : "Something went wrong";
      toast({
        title: "Error",
        description,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "password") {
      if (value !== confirm) {
        toast({
          title: "Error",
          description: "The passwords do not match",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      changePassword();
      return;
    }

    let tmpValue = value

    if (type === "number") {
      tmpValue = parseInt(value)
    }

    updateUser({
      variables: { [label]: tmpValue },
    });
  };

  return (
    <>
      <PopUp isOpen={isOpen} onClose={onClose}>
        <Flex direction="column" justify="center" align="center" w="100%" mt={5} p={5}>
          <Text fontSize="md" mb={5}>
            Change your {label}
          </Text>
          <form onSubmit={handleSubmit}>
            {type === "password" ? (
              <>
                <Input
                  m={3}
                  mb={0}
                  w="90%"
                  first
                  type={type}
                  placeholder="New password"
                  onChange={(e) => setValue(e.target.value)}
                  required
                />
                <Input
                  m={3}
                  mt={0}
                  w="90%"
                  last
                  type={type}
                  placeholder="Confirm new password"
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                />
              </>
            ) : (
              <Input
                m={3}
                w="90%"
                first
                last
                type={type}
                placeholder={label}
                defaultValue={currentUser?.[label]}
                name={label}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            )}
            <SubmitButton>Submit</SubmitButton>
          </form>
        </Flex>
      </PopUp>
    </>
  );
};

export default AccountSettingPopup;

import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

const Error = () => {
  return (
    <Alert status="error" color="black">
      <AlertIcon />
      Something went wrong, be sure you have a stable internet connection
    </Alert>
  );
};

export default Error;

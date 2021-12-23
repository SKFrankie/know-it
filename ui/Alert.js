import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
import React from "react";

const Error = ({ title, children, ...props }) => {
  return (
    <Alert color="black" my="5" status="error" {...props}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

export { Error };

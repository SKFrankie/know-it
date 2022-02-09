import React, {useState} from "react";
import { Input as ChakraInput, InputGroup, InputRightElement, Button } from "@chakra-ui/react";

const Input = ({ first, last, ...props }) => {
  const radius = "10px";
  return (
    <ChakraInput
      color="black"
      borderBottomRadius={last ? radius : "0px"}
      borderTopRadius={first ? radius : "0px"}
      bg="white"
      {...props}
    />
  );
};

const Password = ({ ...props }) => {
    const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup>
      <Input
        type={show ? "text" : "password"}
        placeholder="password"
        autoComplete="current-password"
        {...props}
      />
      <InputRightElement width="4.5em">
        <Button colorScheme="blueClear" h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}

export { Password };
export default Input;

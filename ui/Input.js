import React from 'react'
import { Input as ChakraInput } from "@chakra-ui/react";

const Input = ({first, last, ...props}) => {
  const radius = "10px"
  return (
    <ChakraInput borderBottomRadius={last ? radius : "0px"} borderTopRadius={first ? radius : "0px"} bg="white" {...props}/>
  )
}

export default Input

import { Button as ChakraButton } from '@chakra-ui/react'
import NextLink from 'next/link'
import React from 'react'

const SubmitButton = ({children, ...props}) => {
  return (
    <ChakraButton borderRadius="10px" w="100%" my="4" colorScheme={"blueClear"} type="submit" {...props}> 
      {children}
    </ChakraButton>
  )
}
const Button = ({children, href, ...props}) => {
  if (href) {
    return (
      <NextLink href={href} passHref>
        <ChakraButton
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          fontSize="lg"
          fontWeight="bold"
          borderRadius="10px"
          colorScheme={"blueClear2"}
          p="25px"
          {...props}
        >
          {children}
        </ChakraButton>
      </NextLink>
    );
  }
  return <ButtonDesign {...props}>{children}</ButtonDesign>;
}

const ButtonDesign = ({children, ...props}) => {
  return (
    <ChakraButton  boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)" fontSize="lg" fontWeight="bold" borderRadius="10px" colorScheme={"blueClear2"} {...props}>
      {children}
    </ChakraButton>
  );
}

export default Button
export { SubmitButton }

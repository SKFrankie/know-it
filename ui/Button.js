import { Button } from '@chakra-ui/react'
import React from 'react'

const SubmitButton = ({children, ...props}) => {
  return (
    <Button borderRadius="10px" w="100%" my="4" colorScheme={"blueClear"} type="submit" {...props}> 
      {children}
    </Button>
  )
}

export { SubmitButton }

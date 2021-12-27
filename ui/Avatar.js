import React from 'react'
import { Avatar as ChakraAvatar } from '@chakra-ui/react'

const Avatar = ({...props}) => {
  return (
    <ChakraAvatar size="lg" name='Dan Abrahmov' src='https://bit.ly/dan-abramov' {...props}/>
  )
}

export default Avatar

import React from 'react'
import {Icon} from "@chakra-ui/react";
import { Icon as Iconify } from '@iconify/react';

const GiftIcon = ({...props}) => {
  return (
      <Icon as={Iconify} icon="emojione:wrapped-gift" {...props} />
  )
}

export default GiftIcon

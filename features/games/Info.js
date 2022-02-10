import React from 'react';
import { Icon } from '@chakra-ui/react';
import { Icon as Iconify } from "@iconify/react";
import {LinkOverlay} from '../../ui/Link';

const Info = ({id, ...props}) => {
  return (
    <LinkOverlay href={id ? `/about/credits#${id}` : `/about/credits`} target="_blank">
      <Icon
        name="info-circle-outlined"
        color="white"
        as={Iconify}
        icon="ant-design:info-circle-outlined"
        {...props}
      />
    </LinkOverlay>
  );
};

export default Info;


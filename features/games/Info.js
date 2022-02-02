import React from 'react';
import { Icon } from '@chakra-ui/react';
import { Icon as Iconify } from "@iconify/react";
import {LinkOverlay} from '../../ui/Link';

const Info = ({id}) => {
  return (
    <LinkOverlay href={id ? `/about/credits#${id}` : `/about/credits`}>
      <Icon
        name="info-circle-outlined"
        color="white"
        as={Iconify}
        icon="ant-design:info-circle-outlined"
      />
    </LinkOverlay>
  );
};

export default Info;


import React from "react";
import { Icon } from "@chakra-ui/react";
import { Icon as Iconify } from "@iconify/react";

const InfoIcon = ({ ...props }) => {
  return <Icon as={Iconify} icon="ant-design:info-circle-outlined" {...props} />;
};

export default InfoIcon;

import React from "react";
import { Icon } from "@chakra-ui/react";
import { Icon as Iconify } from "@iconify/react";

const HourGlassIcon = ({ ...props }) => {
  return <Icon as={Iconify} icon="noto:hourglass-done" {...props} />;
};

export default HourGlassIcon;

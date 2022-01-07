import React from 'react'
import { useRouter } from "next/router";
import {Flex} from "@chakra-ui/react";

import Link from "../../ui/Link.js";
import { SHOP_SECTIONS } from "../../constants";

const Header = () => {
  const router = useRouter();
  return (
    <Flex w="100%" textAlign="center">
      {SHOP_SECTIONS.map((section) => (
        <Link
          fontWeight="500"
          w="50%"
          color={router.pathname === section.path ? "blueClear.700" : "deepDarkBlue"}
          borderBottom={router.pathname === section.path ? "2px solid" : "2px solid transparent"}
          key={section.name}
          href={section.path}
        >
          {section.name}
        </Link>
      ))}
    </Flex>
  );
}

export default Header

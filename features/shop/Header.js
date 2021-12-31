import React from 'react'
import { useRouter } from "next/router";
import {Flex} from "@chakra-ui/react";

import Link from "../../ui/Link.js";
import { SHOP_SECTIONS } from "../../constants.js";

const Header = () => {
  const router = useRouter();
  return (
    <Flex>
      {SHOP_SECTIONS.map((section) => (
        <Link
          fontWeight="500"
          color={router.pathname === section.path ? "white" : "blueClear.700"}
          mx={4}
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

import React from "react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

import Link from "../../ui/Link.js";
import { ABOUT_SECTIONS } from "../../constants";

const Header = () => {
  const router = useRouter();
  return (
    <Flex w="100%">
      {ABOUT_SECTIONS.map((section) => (
        <Link
          fontSize={{ base: "sm", md: "md" }}
          m={3}
          color="deepDarkBlue"
          fontWeight={router.pathname === section.path ? "extrabold" : "normal"}
          key={section.name}
          href={section.path}
        >
          {section.name}
        </Link>
      ))}
    </Flex>
  );
};

export default Header;

import React from 'react'
import { Flex, Icon, IconButton } from "@chakra-ui/react";
import NextLink from 'next/link'
import { Icon as Iconify } from '@iconify/react';
import { SECTIONS, ADDITIONNAL_SECTIONS } from "../constants.js";
import { useRouter } from "next/router";
import { useUserContext } from "../context/user";

const MobileHeader = () => {
  const router = useRouter();
  return (
    <Flex
      boxShadow="0px -4px 4px rgba(255, 255, 255, 0.25)"
      bg="darkBlue"
      display={{ base: "flex", md: "none" }}
      position="fixed"
      bottom="0"
      left="0"
      justify="space-around"
      width="100%"
    >
      {SECTIONS.map(
        (section) =>
          !section.webOnly && <IconLink item={section} key={section.name} router={router} />
      )}
      {ADDITIONNAL_SECTIONS.map(
        (section) =>
          !section.webOnly && <IconLink item={section} key={section.name} router={router} />
      )}
    </Flex>
  );
}

const IconLink = ({ item, router }) => {
  const [currentUser] = useUserContext()
  return item.restricted && !currentUser.online ? null : (
    <NextLink href={item.path} passHref>
      <IconButton
        m={2}
        boxShadow="0px 2.16px 2.16px rgba(0, 0, 0, 0.25), inset 0px 2.16px 2.16px rgba(0, 0, 0, 0.25)"
        colorScheme="blueClear"
        aria-label={item.name}
        size="lg"
        icon={
          <Icon
            boxSize={7}
            color={router.pathname === item.path ? "white" : "deepDarkBlue"}
            as={Iconify}
            icon={item.icon}
          />
        }
      />
    </NextLink>
  );
}

export {MobileHeader}

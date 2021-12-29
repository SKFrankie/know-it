import React from "react";
import {
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Icon as Iconify } from "@iconify/react";
import { NO_HEADER_ROUTES, SECTIONS, ADDITIONNAL_SECTIONS } from "../constants.js";
import { useRouter } from "next/router";
import { useUserContext } from "../context/user";
import Link from "../ui/Link.js";
import { logout } from "./auth/helper.js";
import { CoinCurrency, StarCurrency } from "./Currency.js";
import { MyAvatar } from "../ui/Avatar.js";

const MobileNavbar = () => {
  const router = useRouter();
  return (
    !NO_HEADER_ROUTES.includes(router.pathname) && (
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
    )
  );
};

const IconLink = ({ item, router }) => {
  const [currentUser] = useUserContext();
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
};

const DesktopHeader = () => {
  const [currentUser] = useUserContext();
  const router = useRouter();
  return (
    !NO_HEADER_ROUTES.includes(router.pathname) && (
      <Flex
        bg="deepDarkBlue"
        display={{ base: "none", md: "flex" }}
        position="fixed"
        top="0"
        left="0"
        justify="space-between"
        width="100%"
      >
        <Flex direction="column" m={2} color="white">
          <NextLink href="/">
            <Text cursor="pointer" fontSize="3xl" fontWeight="bold">
              Know It!
            </Text>
          </NextLink>
          <Text fontSize="xs">a BluePopcorn Production</Text>
        </Flex>
        <Flex justify="space-around" align="center">
          {SECTIONS.map((section) =>
            section.restricted && !currentUser.online ? null : (
              <Link
                fontWeight="500"
                color={router.pathname === section.path ? "white" : "blueClear.700"}
                mx={4}
                key={section.name}
                href={section.path}
              >
                {section.name}
              </Link>
            )
          )}
        </Flex>
        <Spacer />
        {currentUser.online ? (
          <Flex>
            <StarCurrency />
            <CoinCurrency />
            <Menu>
              <MenuButton m={4}>
                <MyAvatar />
              </MenuButton>
              <MenuList color="black">
                {ADDITIONNAL_SECTIONS.map((section) => (
                  <NextLink key={section.name} href={section.path} passHref>
                    <MenuItem>{section.name}</MenuItem>
                  </NextLink>
                ))}
                <MenuItem
                  onClick={() => {
                    logout(router);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        ) : (
          <Link alignSelf="center" fontWeight="normal" m={4} href="/login" fontSize="2xl">
            Login
          </Link>
        )}
      </Flex>
    )
  );
};

const MobileHeader = () => {
  const [currentUser] = useUserContext();
  const router = useRouter();
  return (
    !NO_HEADER_ROUTES.includes(router.pathname) &&
    currentUser.online && (
      <Flex
        bg="darkBlue"
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top="0"
        left="0"
        justify="space-around"
        width="100%"
        minHeight="8vh"
        boxShadow="0px 4px 4px rgba(255, 255, 255, 0.25)"
        zIndex="1"
      >
        <CoinCurrency />
        <MyAvatar position="absolute" top="10px" />
        <StarCurrency />
      </Flex>
    )
  );
};

export { MobileNavbar, DesktopHeader, MobileHeader };

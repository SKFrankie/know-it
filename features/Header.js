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
import { NO_HEADER_ROUTES, SECTIONS, ADDITIONNAL_SECTIONS } from "../constants";
import { useRouter } from "next/router";
import { useUserContext } from "../context/user";
import Link, { LinkOverlay } from "../ui/Link.js";
import { logout } from "./auth/helper.js";
import { CoinCurrency, StarCurrency, StarPercentage } from "./Currency.js";
import { MyAvatar } from "../ui/Avatar.js";
import Timer from "./games/Timer.js";
import LoginButton from "./auth/LoginButton";

const isActive = (router, item) => {
  return router.pathname === item.path || item?.active?.includes(router.pathname);
};
const MobileNavbar = () => {
  const router = useRouter();
  const isGame = router.pathname.includes("/games");
  return (
    !NO_HEADER_ROUTES.includes(router.pathname) && (
      <Flex
        boxShadow="0px -4px 4px rgba(255, 255, 255, 0.25)"
        bg="darkBlue"
        display={isGame ? "none" : { base: "flex", lg: "none" }}
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

const IconLink = ({ item, router, ...props }) => {
  const [currentUser] = useUserContext();
  return item.restricted && !currentUser.online ? null : (
    <NextLink href={item.path} passHref>
      <IconButton
        m={2}
        boxShadow="0px 2.16px 2.16px rgba(0, 0, 0, 0.25), inset 0px 2.16px 2.16px rgba(0, 0, 0, 0.25)"
        colorScheme="blueClear"
        aria-label={item.name}
        size="lg"
        {...props}
        icon={
          <Icon
            boxSize={7}
            color={isActive(router, item) ? "white" : "deepDarkBlue"}
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
        display={{ base: "none", lg: "flex" }}
        top="0"
        left="0"
        p={2}
        justify="space-between"
        width="100%"
        zIndex="2"
      >
        <Flex direction="column" m={2} color="white">
          <NextLink href="/">
            <Text cursor="pointer" fontSize="2xl" fontWeight="bold">
              Know It!
            </Text>
          </NextLink>
        </Flex>
        <Flex justify="space-around" align="center">
          {SECTIONS.map((section) =>
            section.restricted && !currentUser.online ? null : (
              <Link
                fontWeight="500"
                color={isActive(router, section) ? "white" : "blueClear.700"}
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
              <MenuButton mx={4}>
                <MyAvatar size="md" />
              </MenuButton>
              <MenuList color="darkBlue" bg="deepDarkBlue">
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

const MobileHeaderBox = ({ children, currentUser, router, ...props }) => {
  const HOME_SECTION = SECTIONS[0];
  return (
    !NO_HEADER_ROUTES.includes(router.pathname) &&
    (currentUser.online ? (
      <Flex
        bg="darkBlue"
        display={{ base: "flex", lg: "none" }}
        position="fixed"
        top="0"
        left="0"
        justify="space-around"
        width="100%"
        minHeight="8vh"
        boxShadow="0px 4px 4px rgba(255, 255, 255, 0.25)"
        zIndex="2"
        {...props}
      >
        {children}
      </Flex>
    ) : (
      <Flex
        alignItems="center"
        justify="end"
      >
        <LoginButton />
        <IconLink
          display={{ base: "flex", lg: "none" }}
          item={HOME_SECTION}
          key={HOME_SECTION.name}
          router={router}
        />
      </Flex>
    ))
  );
};

const MobileGameHeader = ({ maxTime = 100, timer = 0 }) => {
  const [currentUser] = useUserContext();
  const router = useRouter();
  const HOME_SECTION = SECTIONS[0];
  return (
    <MobileHeaderBox currentUser={currentUser} router={router} alignItems="center" px={1}>
      <Timer maxTime={maxTime} timer={timer} />
      {currentUser.online ? <StarPercentage /> : null}
      <IconLink item={HOME_SECTION} key={HOME_SECTION.name} router={router} />
    </MobileHeaderBox>
  );
};

const DesktopGameHeader = ({ maxTime = 100, timer = 0 }) => {
  const [currentUser] = useUserContext();
  return (
    <Flex
      mx={3}
      position="fixed"
      left="0"
      w="30%"
      top={{ base: "0", lg: "auto" }}
      display={{ base: currentUser?.online ? "none" : "flex", lg: "flex" }}
    >
      <Timer maxTime={maxTime} timer={timer} mx={3} />
      {currentUser.online ? <StarPercentage /> : null}
    </Flex>
  );
};

export { MobileNavbar, DesktopHeader, MobileGameHeader, DesktopGameHeader };

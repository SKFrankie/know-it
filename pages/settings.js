import { useState } from "react";
import { Flex, Text, Switch } from "@chakra-ui/react";
import { useUserContext } from "../context/user";
import Button from "../ui/Button";

const Settings = () => {
  return (
    <Flex direction="column">
      <GeneralSettings /> <AccountSettings />
    </Flex>
  );
};

const GeneralSettings = () => {
  return (
    <SettingBlock title="General Settings">
      <SettingButton
        first
        _hover={{ bg: "darkBlue" }}
        _active={{ bg: "darkBlue" }}
        cursor="initial"
      >
        <SoundSetting />
      </SettingButton>
      <SettingButton href="/about/about-us">About</SettingButton>
      <SettingButton href="/about/terms-of-service">Terms of Service</SettingButton>
      <SettingButton href="/about/privacy-policy">Privacy Policy</SettingButton>
      <SettingButton href="/about/credits" last>
        Credits
      </SettingButton>
    </SettingBlock>
  );
};

const SoundSetting = () => {
  const isDisabled = JSON.parse(localStorage.getItem("disableSound"));
  const handleChange = (e) => {
    const checked = e.target.checked;
    localStorage.setItem('disableSound', !checked);
  };

  return (
    <>
      <Text>Sound</Text>
      <Switch onChange={handleChange} defaultChecked={!isDisabled} />
    </>
  );
};

const AccountSettings = () => {
  return <SettingBlock title="Account Settings"></SettingBlock>;
};

const SettingBlock = ({ children, title, ...props }) => {
  return (
    <Flex direction="column" justify="center" align="start" w="100%" mt={5} {...props}>
      <SettingTitle>{title}</SettingTitle>
      {children}
    </Flex>
  );
};

const SettingTitle = ({ children, ...props }) => {
  return (
    <Text
      fontSize={{ base: "lg", md: "2xl" }}
      fontWeight="700"
      color="deepDarkBlue"
      mb={3}
      {...props}
    >
      {children}
    </Text>
  );
};

const SettingButton = ({ onClick, first = false, last = false, children, ...props }) => {
  const radius = "10px";
  return (
    <Button
      borderTopRadius={first ? radius : 0}
      borderBottomRadius={last ? radius : 0}
      w="100%"
      color="white"
      bg="darkBlue"
      boxShadow="none"
      border="1px solid #00455B"
      borderTop={first ? "1px solid #00455B" : "none"}
      justifyContent="space-between"
      padding="10px"
      fontSize="md"
      fontWeight="normal"
      {...props}
    >
      {children}
    </Button>
  );
};

export default Settings;

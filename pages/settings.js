import { Flex, Text, Switch, useDisclosure } from "@chakra-ui/react";
import { useUserContext } from "../context/user";
import Button from "../ui/Button";
import AccountSettingPopup from "../features/modals/AccountSettingPopup";
import { logout } from "../features/auth/helper.js";
import { useRouter } from "next/router";
import { useEffect } from 'react';

const Settings = () => {
  const router = useRouter();
  const [{ online }] = useUserContext();
  return (
    <Flex 
      direction="column"
      maxWidth={{ base: "100%", lg: "60%" }}
      px={{ base: "2vh", lg: "0" }}
      mx="auto"
      pb="12vh"
    >
      <GeneralSettings />
      {online && (
        <>
          <AccountSettings />
          <Button
            onClick={() => {
              logout(router);
            }}
            mt={5}
            display={{ base: "block", lg: "none" }}
            bg="#A80909"
          >
            Logout
          </Button>{" "}
        </>
      )}
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
      <SettingButton href="/about/credits">
        Credits
      </SettingButton>
      <SettingButton href="/about/cookies">
        Cookie Consent
      </SettingButton>
      <SettingButton href="/about/contact" last>
        Contact
      </SettingButton>
    </SettingBlock>
  );
};

const AccountSettings = () => {
  const router = useRouter();
  const { openPassword } = router.query;
  const [{ tpo }] = useUserContext();
  return (
    <SettingBlock title="Account Settings">
      <AccountSettingButton first label="username" type="text">
        Username
      </AccountSettingButton>
      <AccountSettingButton last={tpo} label="age" type="number">
        Age
      </AccountSettingButton>
      {!tpo && (
        <>
          <AccountSettingButton label="mail" type="email">
            Email
          </AccountSettingButton>
          <AccountSettingButton defaultOpen={openPassword} last label="password" type="password">
            Password
          </AccountSettingButton>{" "}
        </>
      )}
    </SettingBlock>
  );
};

const SoundSetting = () => {
  const isDisabled = JSON.parse(localStorage.getItem("disableSound"));
  const handleChange = (e) => {
    const checked = e.target.checked;
    localStorage.setItem("disableSound", !checked);
  };

  return (
    <>
      <Text>Sound</Text>
      <Switch onChange={handleChange} defaultChecked={!isDisabled} />
    </>
  );
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
      fontSize={{ base: "lg", lg: "2xl" }}
      fontWeight="700"
      color="deepDarkBlue"
      mb={3}
      {...props}
    >
      {children}
    </Text>
  );
};

const AccountSettingButton = ({ label, type, defaultOpen, children, ...props }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (defaultOpen) {
      onOpen();
      }
  }, [defaultOpen, onOpen]);
  return (
    <>
      <SettingButton onClick={onOpen} {...props}>
        {children}
      </SettingButton>{" "}
      <AccountSettingPopup type={type} label={label} isOpen={isOpen} onClose={onClose} />{" "}
    </>
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
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default Settings;

import { Flex, Text, Switch, useDisclosure} from "@chakra-ui/react";
import { useUserContext } from "../context/user";
import Button from "../ui/Button";
import AccountSettingPopup from "../features/modals/AccountSettingPopup";
import { logout } from "../features/auth/helper.js";
import { useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();
  const [{online}] = useUserContext();
  return (
    <Flex direction="column">
      <GeneralSettings />
      {online && (
        <>
          <AccountSettings />
          <Button
            onClick={() => {
              logout(router);
            }}
            mt={5}
            display={{ base: "block", md: "none" }}
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
      <SettingButton href="/about/credits" last>
        Credits
      </SettingButton>
    </SettingBlock>
  );
};

const AccountSettings = () => {
  const [{tpo}] = useUserContext();
  return (
    <SettingBlock title="Account Settings">
      <AccountSettingButton first last={tpo} label="username" type="text">
        Username
      </AccountSettingButton>
      {!tpo && (
        <>
          <AccountSettingButton label="mail" type="email">
            Email
          </AccountSettingButton>
          <AccountSettingButton last label="password" type="password">
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
    localStorage.setItem('disableSound', !checked);
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

const AccountSettingButton = ({ label, type, children, ...props }) => {
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <SettingButton onClick={onOpen} {...props}>
        {children}
      </SettingButton>{" "}
      <AccountSettingPopup type={type} label={label} isOpen={isOpen} onClose={onClose} />{" "}
    </>
  );
}

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

import React from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalButton,
} from "@chakra-ui/react";

const Modal = ({ isOpen = false, onClose, children, ...props }) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
      motionPreset="slideInBottom"
      {...props}
    >
      <ModalContent bg="deepDarkBlue" p="5" m="0" minH="100%">
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

const PopUp = ({ isOpen = true, onClose, children, ...props }) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      motionPreset="slideInBottom"
      {...props}
    >
      <ModalOverlay />
      <ModalContent bg="deepDarkBlue" isCentered minH="10vh">
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  );
};

export { PopUp };

export default Modal;

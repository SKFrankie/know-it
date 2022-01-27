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
    <ChakraModal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" allowPinchZoom {...props}>
      <ModalOverlay />
      <ModalContent
        alignSelf={{ base: "initial", md: "center" }}
        isCentered
        bg="deepDarkBlue"
        p="5"
        minH={{ base: "100%", md: "50%" }}
        minW={{ base: "100%", md: "80%" }}
      >
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
      size="md"
      motionPreset="slideInBottom"
      allowPinchZoom
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

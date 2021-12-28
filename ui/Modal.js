import React from 'react'
import {Modal as ChakraModal, ModalOverlay, ModalContent, ModalCloseButton, ModalButton} from '@chakra-ui/react'

const Modal = ({isOpen=false, onClose, children, ...props}) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
      motionPreset="slideInBottom"
    >
      {/* <ModalOverlay /> */}
      <ModalContent bg="deepDarkBlue" p="5" m="0" minH="100%">
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  );
}

export default Modal

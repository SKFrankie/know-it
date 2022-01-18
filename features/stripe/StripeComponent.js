import React, {useEffect, useState} from 'react'
import {getCustomer} from '../../helpers/stripe';
import {PopUp} from "../../ui/Modal"
import {Flex, Text, useDisclosure} from "@chakra-ui/react"

import { useRouter } from 'next/router';
const StripeComponent = () => {
  const router = useRouter();
  const { status, session_id, item, description } = router.query;
  const [customer, setCustomer] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (status) {
      onOpen();
    }
  }, [status]);

  useEffect(() => {
    if (status === "success") {
      getCustomer(setCustomer, session_id);
    }
  }, [session_id]);
  return status ? (
    <PopUp isOpen={isOpen} onClose={onClose}>
      <Flex
        p={5}
        m={2}
        direction="column"
        textAlign="center"
        justify="space-around"
        alignItems="center"
      >
        {status && status === "success" && customer && (
          <>
          <Text m={2} fontSize="xl" fontWeight="bold">Successfully purchased!</Text>
          <Text m={2} fontSize="md" >{item}</Text>
          <Text fontSize="sm" >{description}</Text>
          </>
        )}
        {status && status === "cancel" && (
          <>
          <Text m={2} fontSize="xl" fontWeight="bold">Something went wrong</Text>
          <Text fontSize="sm" >The purchased has been canceled</Text>
          </>
        )}
      </Flex>
    </PopUp>
  ) : null;
};

export default StripeComponent;

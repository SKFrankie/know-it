import React, { useEffect, useState } from "react";
import { getCustomerWithId } from "../../helpers/stripe";
import { PopUp } from "../../ui/Modal";
import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'

import { useRouter } from "next/router";
const StripeComponent = () => {
  const router = useRouter();
  const { status, session_id, item, description } = router.query;
  const [customer, setCustomer] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();


  useEffect(() => {
    if (status) {
      onOpen();
    }
  }, [status]);

  useEffect(() => {
    if (status === "success") {
      getCustomerWithId(session_id).then((customer) => {
        if (customer) {
          toast({
            title: "Successfully purchased!",
            description: `${item} - ${description}`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
      });
    }
    if (status=== "cancel")
    {
      toast({
        title: "Purchase cancelled",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [session_id]);
  return null
};

export default StripeComponent;

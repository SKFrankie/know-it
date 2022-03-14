import { useState, useEffect } from "react";
import { Flex, Text, useDisclosure, Divider } from "@chakra-ui/react";
import ShopContainer from "../../features/shop/ShopContainer";
import MoneyItems from "../../features/shop/MoneyItems";
import PremiumButtons from "../../features/shop/PremiumButtons";
import { PURCHASE_TYPES } from "../../constants";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import { useUserContext } from "../../context/user";
import { isPremium } from "../../helpers/premium";
import { redirect } from "../../features/auth/helper";
import { useRouter } from "next/router";

const Money = () => {
  const [currentUser] = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (currentUser.online === false) {
      redirect(router, "/login");
    }
  }, [currentUser, router]);

  const sellingStars = [PURCHASE_TYPES.STARS_5, PURCHASE_TYPES.STARS_10, PURCHASE_TYPES.STARS_15];
  const sellingCoins = [
    PURCHASE_TYPES.COINS_250,
    PURCHASE_TYPES.COINS_500,
    PURCHASE_TYPES.COINS_750,
    PURCHASE_TYPES.COINS_1000,
  ];
  const [stripeLoading, setStripeLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <ShopContainer>
      {isPremium(currentUser) ? null : (
        <Flex
          direction="column"
          m={3}
          bg="deepDarkBlue"
          p={1}
          borderRadius={10}
          textAlign="center"
          align="center"
        >
          <PremiumDescription
            onOpen={onOpen}
            stripeLoading={stripeLoading}
            setStripeLoading={setStripeLoading}
            displayButtons={{ base: "none", md: "flex" }}
          />
        </Flex>
      )}
      <MoneyItems
        stripeLoading={stripeLoading}
        setStripeLoading={setStripeLoading}
        sellingItems={sellingStars}
        image="/images/star.png"
        title="Get KNOWLYMPIC STARS and COMPETE NOW!"
      />
      <Divider w="90%" alignSelf="center" borderBottomWidth="2px" borderColor="blueClear2.500" />
      <MoneyItems
        stripeLoading={stripeLoading}
        setStripeLoading={setStripeLoading}
        sellingItems={sellingCoins}
        image="/images/coin.png"
        title="Get coins for your Gigil Monster Avatars!"
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <Flex direction="column" m={5} textAlign="center" justify="center">
          <PremiumDescription
            stripeLoading={stripeLoading}
            setStripeLoading={setStripeLoading}
            displayButtons={{ base: "flex", md: "flex" }}
          />
          <Text mb={2} fontSize="lg" fontWeight="md">
            Your purchase allows us to help everyone learn English
          </Text>
        </Flex>
      </Modal>
    </ShopContainer>
  );
};

const PremiumDescription = ({ onOpen, stripeLoading, setStripeLoading, displayButtons }) => {
  return (
    <>
      <Text mb={2} fontSize="2xl" fontWeight="bold">
        Premium Bundles
      </Text>
      <Text mb={2} fontSize="md" fontWeight="md">
        Want NO ADS? Get a Premium “NO ADS” Bundle AND get 10% more coins each time you play
      </Text>
      {onOpen && (
        <Button onClick={onOpen} mb={2} w="90%" display={{ base: "flex", md: "none" }}>
          See More
        </Button>
      )}
      <PremiumButtons
        stripeLoading={stripeLoading}
        setStripeLoading={setStripeLoading}
        display={displayButtons}
      />
    </>
  );
};

export { PremiumDescription };
export default Money;

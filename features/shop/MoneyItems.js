import React, {useState} from 'react'
import {Flex, Text, Image} from '@chakra-ui/react'
import {PURCHASES} from '../../constants'
import Loading from "../Loading";

const MoneyItems = ({title, sellingItems, image}) => {
  return (
    <Flex my={5} direction="column">
      <Text mb={3} fontSize="3xl" fontWeight="bold" textAlign={{ base: "left", md: "center" }}>
        {title}
      </Text>
      <Flex justify="space-around" alignItems="center" flexWrap="wrap">
        {sellingItems.map((item) => (
          <MoneyItem key={item} sellingItem={item} image={image} />
        ))}
      </Flex>
    </Flex>
  );
}

const MoneyItem = ({ sellingItem, image, isLoading = false }) => {
  const [item, setItem] = useState(PURCHASES[sellingItem]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Flex
          direction="column"
          justify="space-around"
          alignItems="center"
          fontWeight="bold"
          cursor="pointer"
          _hover={{ opacity: "0.8" }}
          mt={3}
        >
          <Flex
            direction="column"
            justify="space-around"
            alignItems="center"
            background="rgba(123, 148, 151, 0.25)"
            p={2}
            minW="5.5em"
          >
            <Image boxSize="50px" src={image} alt={item.name} />
            <Text fontSize="xs">x{item.name}</Text>
          </Flex>
          <Text fontSize="sm">{item.price}€</Text>
        </Flex>
      )}
    </>
  );
};

export default MoneyItems;

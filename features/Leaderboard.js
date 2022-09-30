import React, { useState } from "react";
import { Flex, Text, Input, Image, Box, Button as ChakraButton } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";
import { getFirstDayOfWeek, getLastDayOfWeek } from "./games/helpers";
import { basicQueryResultSupport } from "../helpers/apollo-helpers";
import { useUserContext } from "../context/user";
import {MedalCurrency} from "./Currency"
import Loading from "./Loading";
import Error from "./Error";
import NextLink from "next/link";
import { Icon } from "@chakra-ui/react";
import { Icon as Iconify } from "@iconify/react";

// different query to get current week rank
const RANKING_USERS = gql`
  query RankingUsers {
    rankingUsers: currentRankingUsers {
      userId
      points
      username
      currentAvatar {
        picture
      }
    }
  }
`;

const Leaderboard = ({ ...props }) => {
  const [currentUser] = useUserContext();
  const [users, setUsers] = useState([]);

	const [indexStart, setIndexStart] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error } = useQuery(RANKING_USERS, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      setUsers(data.rankingUsers);
    },
    ...basicQueryResultSupport,
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    if (!value && data.rankingUsers) {
      setUsers(data.rankingUsers);
      return;
    }

    const filteredUsers = data?.rankingUsers.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setUsers(filteredUsers);
    setIndexStart(0);
    setCurrentPage(1);
  };

  const displayUser = (user) => {
    if (users.find((u) => u.userId === user.userId)) {
      return true;
    }
    return false;
  };

  return (
    <Flex
      direction="column"
      bg="deepDarkBlue"
      textAlign="center"
      justifyItems="center"
      p={{ base: 2, md: 3 }}
      w={{ base: "100%", md: "80%" }}
      borderRadius={10}
      {...props}
    >

      {data && (
        <>
          <Text 
            fontSize="lg" 
            fontWeight="semibold"
          >
            KNOWLYMPICS Weekly Ranking
          </Text>
          <Text>~</Text>
          <Text fontSize="xs">
            {getFirstDayOfWeek()} - {getLastDayOfWeek()}
          </Text>
          <Flex direction="column" justify="center" align="center" w="100%">
            <Searchbar onChange={handleSearch} />
            
            {(users || []).map((user, index) => {
              if (user.userId === currentUser.userId) {
                return (
                  <Row
                    display={displayUser(user)}
                    user={user}
                    key={user.userId}
                    index={index}
                    length={users.length}
                    borderRadius={6}
                    marginBottom={3}
                  />
                );
              }
              return null;
            })}
            
            {(users || []).slice(indexStart, indexStart + 10).map((user, index) => {
                return (
                  <Row
                    display={displayUser(user)}
                    user={user}
                    key={user.userId}
                    index={indexStart + index}
                    length={users.length}
                    borderTopRadius={index === 0 ? 6 : 0}
                    borderBottomRadius={index + 1 === (users || []).slice(indexStart, indexStart + 10).length ? 6 : 0}
                  />
                );
            })}
            
            <Flex
              alignItems="center"
              placeContent="center"
              w="100%"
              mt={2}
            >
              <ChakraButton 
                bg="transparent"
                _focus={{ boxShadow: "none" }}
                _hover={{ opacity: 0.8 }}
                onClick={() => { 
                  if (currentPage > 1) { 
                    setCurrentPage(currentPage - 1); 
                    setIndexStart(indexStart - 10) 
                  } 
                }}
              >
                <Icon 
                  as={Iconify} 
                  icon="ep:arrow-left-bold"
                  h="0.9rem"
                  w="0.9rem"
                />
              </ChakraButton>
                {
                  [...Array(Math.ceil((users || []).length/10))].map((e, i) => (
                    <ChakraButton onClick={() => { setCurrentPage(i + 1); setIndexStart((i) * 10) }}
                      key={'page-'+i}
                      bg="transparent"
                      color={ (i+1) === currentPage ? "orange":"white" }
                      _focus={{ boxShadow: "none" }}
                      _hover={{ opacity: 0.8 }}
                      p={0}
                      m={0}
                      mx={1}
                      minW={0}
                    >
                      <Text p={0} m={0}>
                        { Number(i + 1) }
                      </Text>
                    </ChakraButton>
                  ))
                }
              <ChakraButton 
                bg="transparent"
                _focus={{ boxShadow: "none" }}
                _hover={{ opacity: 0.8 }}
                onClick={() => { 
                  if (currentPage < Math.ceil((users || []).length/10)) { 
                    setCurrentPage(currentPage + 1); 
                    setIndexStart(indexStart + 10) 
                  } 
                }}
              >
                <Icon 
                  as={Iconify} 
                  icon="ep:arrow-right-bold"
                  h="0.9rem"
                  w="0.9rem"
                />
              </ChakraButton>
            </Flex>
          </Flex>
        </>
      )}
      {loading && <Loading />}
      {error && <Error />}
    </Flex>
  );
};

const Row = ({ display = true, user, index, ...props }) => {
  const [currentUser] = useUserContext();
  return (
    display && (
      <NextLink href={`/profile/${user.userId}`}>
        <Flex
          my="1px"
          bg={user.userId === currentUser?.userId ? "orange" : "blueClear.500"}
          textAlign="center"
          w="100%"
          key={user.userId}
          direction="row"
          justify="space-between"
          pl={2}
          fontSize={{ base: "sm", md: "md" }}
          align="center"
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          overflow="hidden"
          {...props}
        >
          <Flex align="center">
            <AvatarImage user={user} />
            <Text
              textAlign="start"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="semibold"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {user.username.slice(0, 15)}
            </Text>
          </Flex>

          <Flex align="center" h="100%">
            <MedalCurrency
              textAlign="center" 
              alignItems="center" 
              justifyContent="center"
              m={0}
              pr={2}
              quantity={user.points} 
              rightIcon
            />
            <Text 
              w={"70px"}
              minW={"70px"}
              flex={3} 
              px={5}
              py={2}
              bg={user.userId === currentUser?.userId ? "#B48F32" : "darkBlue"}
            >
              {index + 1}
            </Text>
          </Flex>
        </Flex>
      </NextLink>
    )
  );
};

// const Head = () => {
//   return (
//     <Flex
//       direction="row"
//       justify="space-between"
//       align="center"
//       w="100%"
//       p={1}
//       px={5}
//       fontSize={{ base: "sm", md: "md" }}
//       align="center"
//       bg="blueClear.500"
//       borderTopRadius={6}
//       textAlign="center"
//     >
//     <Flex w="40px" h="40px" justify="center" align="center"/>
//       <Text flex={1} textAlign="start">
//         Username
//       </Text>
//       <Text flex={3}>Ranking</Text>
//       <Text mx={2}>
//         Medals
//       </Text>
//     </Flex>
//   );
// };

const AvatarImage = ({ user }) => {
  return (
    <Image
      boxSize="25px"
      mr={2}
      src={
        user?.currentAvatar?.picture ||
        "https://res.cloudinary.com/dvdqswi8x/image/upload/v1646038725/Avatar%20Picture/bws9ei18vgswkgitk6qs.jpg"
      }
      alt="no gigil"
    />
  );
};

const Searchbar = ({ onChange }) => {
  return (
    <Input onChange={onChange} bg="white" my={3} placeholder="Find a friend’s ranking by username" color="black" />
  );
};

export default Leaderboard;

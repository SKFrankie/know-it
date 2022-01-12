import React from "react";
import { PopUp } from "../../ui/Modal";
import {Flex, Text } from "@chakra-ui/react";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_RANKING_REWARDS = gql`
  query GetRankingRewards {
    first: avatarCollections(where: { name_CONTAINS: "MONSTARS1" }) {
      avatarCollectionId
      name
      avatars {
        picture
      }
    }
    second: avatarCollections(where: { name_CONTAINS: "MONSTARS2" }) {
      avatarCollectionId
      name
      avatars {
        picture
      }
    }
    third: avatarCollections(where: { name_CONTAINS: "MONSTARS3" }) {
      avatarCollectionId
      name
      avatars {
        picture
      }
    }
  }
`;

const RewardPopup = ({ isOpen, onClose, rankingGift=0, collections=[], ...props }) => {
  const rewardText = () => {
    switch (rankingGift) {
      case 1:
        return "Congratulations! You've reached the top of the ranking last time! You get a first place Monstar!";
      case 2:
        return "Congratulations! You've reached second place of the ranking last time! Here's your Monstar!";
      case 3:
        return "Congratulations! You've reached third place of the ranking last time! Here's your Monstar!";
      default:
        return "No gifts for you this time!";
    }
  }
  return (
    <PopUp isOpen={isOpen} onClose={onClose} {...props}>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        p={{ base: 5, md: 10 }}
      >
        <Text fontSize="xl" fontWeight="bold">
          You've earned a gift!
        </Text>
        <Text fontSize="sm">{rewardText()}</Text>
      </Flex>
    </PopUp>
  );
}

export default RewardPopup

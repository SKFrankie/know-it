// import { useEffect } from "react";
// import NextLink from "next/link";
import { Icon as Iconify } from "@iconify/react";
import { Box, Flex, Grid, Text, Image, Icon } from "@chakra-ui/react";

// import { useUserContext } from "../context/user";
import { GAMES_SECTIONS } from "../constants";
import Button from "../ui/Button";


const GameSection = ({...props}) => {
  // const [currentUser] = useUserContext();

	return (
		<Box
			bg={{ base: "transparent", lg: "deepDarkBlue" }}
			padding={{ base: "0", lg: "1.2rem" }}
			borderRadius={{ base: "0", lg: "15px" }}
			{...props}
		>
			<Box
				display={{ base: "none", lg: "flex" }}
				justifyContent="space-between"
				mb="0.5rem"
			>
				<Text 
					fontWeight={{ lg: "semibold" }}
					fontSize={{ lg: "1.5rem" }}
				>
					Games
				</Text>
				{
					GAMES_SECTIONS.length > 6 && 
					(
						<Flex
							alignItems="center"
						>
							<Button
								bg="red"
								shadow="none"
								borderRadius="50%"
								px="0"
								py="0.7rem"
								w="fit-content"
								h="fit-content"
								mr="0.5rem"
							>
								<Icon 
									as={Iconify} 
									icon="ep:arrow-left-bold"
									h="0.9rem"
									w="0.9rem"
								/>
							</Button>
							<Button
								bg="red"
								shadow="none"
								borderRadius="50%"
								px="0"
								py="0.7rem"
								w="fit-content"
								h="fit-content"
							>
									<Icon 
										as={Iconify} 
										icon="ep:arrow-right-bold"
										h="0.9rem"
										w="0.9rem"
									/>
							</Button>
						</Flex>
					)
				}
			</Box>
			<Grid
				templateColumns={{ base: "repeat(2, 1fr)", lg: GAMES_SECTIONS.length >= 6 ? `repeat(6, 1fr)` : `repeat(${GAMES_SECTIONS.length}, 1fr)` }}
				gap={{ base: "5vh", lg: "8vh" }}
			>
				{
					GAMES_SECTIONS.map((game) => (
						<>
							<Button
								key={ game.name }
								href={ game.path }
								label={ game.name }
								h="100%"
							>
								<Box>
									<Image
										mx="auto"
										mb="0.2rem"
										boxSize={{ base: "5rem", lg: "5rem" }}
										src={ game.image } 
										alt={ game.name } 
									/>
									<Text>{ game.name }</Text>
								</Box>
							</Button>
						</>
					))
				}
			</Grid>
		</Box>
	);
};

export default GameSection;
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
			px={{ base: "0", lg: "1rem" }}
			pt={{ base: "0", lg: "0.5rem" }}
			pb={{ base: "0", lg: "1rem" }}
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
			</Box>
			<Grid
				templateColumns={{ base: "repeat(2, 1fr)", lg: GAMES_SECTIONS.length >= 6 ? `repeat(6, 1fr)` : `repeat(${GAMES_SECTIONS.length}, 1fr)` }}
				gap={{ base: "5vh" }}
			>
				{
					GAMES_SECTIONS.map((game) => (
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
										boxSize={{ base: "5rem" }}
										src={ game.image } 
										alt={ game.name } 
									/>
									<Text
										fontSize={{ base:"0.8rem", xl:"1rem" }}
									>{ game.name }</Text>
								</Box>
							</Button>
					))
				}
			</Grid>
		</Box>
	);
};

export default GameSection;
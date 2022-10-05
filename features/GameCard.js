import React from "react";
import NextLink from "next/link";
import { Image, Text } from "@chakra-ui/react";


const GameCard = ({ src, alt, name, path, boxSize, ...props }) => {
	return (
		<NextLink 
			href={ path }
			{...props}
		>
			<Image 
				boxSize={ boxSize }
				src={ src } 
				alt={ alt } 
			/>
			<Text>{ name }</Text>
		</NextLink>
	);
};

export default GameCard;
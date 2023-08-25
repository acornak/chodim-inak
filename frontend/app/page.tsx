import React, { FC } from "react";
// Components
import { HeroHome } from "@/components/Hero";
import About from "@/components/About";
import ContentWrapper from "@/components/styled/ContentWrapper";

const Home: FC = (): JSX.Element => {
	return (
		<>
			<HeroHome />
			<ContentWrapper>
				<About />
			</ContentWrapper>
			<ContentWrapper>
				<About />
			</ContentWrapper>
			<ContentWrapper>
				<About />
			</ContentWrapper>
			<ContentWrapper id="story">
				<About />
			</ContentWrapper>
			<ContentWrapper>
				<About />
			</ContentWrapper>
		</>
	);
};

export default Home;

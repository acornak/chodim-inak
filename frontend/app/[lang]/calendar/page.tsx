import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";

import ContentWrapper from "@/components/styled/ContentWrapper";
import About from "@/components/About";

// Image
import heroKalendar from "@/public/hero-calendar.jpeg";

const Kalendar = (): JSX.Element => {
	return (
		<>
			<HeroOthers
				title={"Asistenčný kalendár"}
				subtitle="Zarezervujte si asistenciu"
				image={heroKalendar}
				// action={<CTAButton>Chcem asistovať!</CTAButton>}
			/>
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

export default Kalendar;

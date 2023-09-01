import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
// Image
import heroCalendar from "@/public/calendar/hero-calendar.jpeg";

const Kalendar = (): JSX.Element => {
	return (
		<>
			<HeroOthers
				title={"Asistenčný kalendár"}
				subtitle="Zarezervujte si asistenciu"
				image={heroCalendar}
				// action={<CTAButton>Chcem asistovať!</CTAButton>}
			/>
			<iframe
				src="https://calendar.google.com/calendar/embed?src=41d1e23231256d809175ffb473c9e5f7bdc7a575c14ef9b7cb1c6b4d1728aa9a%40group.calendar.google.com&ctz=Europe%2FPrague"
				width="800"
				height="600"
			></iframe>
		</>
	);
};

export default Kalendar;

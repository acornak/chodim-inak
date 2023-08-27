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
		</>
	);
};

export default Kalendar;

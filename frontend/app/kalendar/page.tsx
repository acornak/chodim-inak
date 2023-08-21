import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
import { CTAButton } from "@/components/styled/Button";
// Image
import heroKalendar from "@/public/hero-calendar.jpeg";

const Kalendar = (): JSX.Element => {
	return (
		<>
			<HeroOthers
				title={"Asistenčný kalendár"}
				subtitle="Zarezervujte si asistenciu"
				image={heroKalendar}
				action={<CTAButton>Chcem asistovať!</CTAButton>}
			/>
		</>
	);
};

export default Kalendar;

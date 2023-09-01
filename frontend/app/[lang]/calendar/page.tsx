import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
// Internationalization
import { Locale } from "@/i18-config";
import { getDictionary } from "@/dictionaries";
// Image
import heroCalendar from "@/public/calendar/hero-calendar.png";

export default async function Calendar({
	params: { lang },
}: {
	params: { lang: Locale };
}): Promise<JSX.Element> {
	const dict = (await getDictionary(lang)).calendar;

	return (
		<>
			<HeroOthers
				title={dict.hero.heading}
				subtitle={dict.hero.subheading}
				image={heroCalendar}
			/>
			<div className="flex justify-center items-center py-6 px-4">
				<div className="w-full max-w-screen-md">
					<iframe
						src="https://calendar.google.com/calendar/embed?src=41d1e23231256d809175ffb473c9e5f7bdc7a575c14ef9b7cb1c6b4d1728aa9a%40group.calendar.google.com&ctz=Europe%2FPrague"
						className="w-full h-[60vh]"
						style={{ border: 0 }}
					/>
				</div>
			</div>
		</>
	);
}

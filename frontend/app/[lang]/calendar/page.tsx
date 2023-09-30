import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
// Internationalization
import { Locale } from "@/i18-config";
import { getDictionary } from "@/dictionaries";
// Image
import heroCalendar from "@/public/calendar/hero-calendar.webp";

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
			<div
				className="text-center pt-10 px-4 text-2xl uppercase font-semibold dark:text-gray-300"
				id="register"
			>
				<p className="mx-auto">{dict.heading}</p>
			</div>
			<div className="flex justify-center items-center py-6 px-4">
				<div className="w-full max-w-screen-md">
					<iframe
						src="https://calendar.google.com/calendar/embed?src=chodim.jinak%40gmail.com&ctz=Europe%2FPrague"
						className="w-full h-[60vh]"
						style={{ border: 0 }}
					/>
				</div>
			</div>
		</>
	);
}

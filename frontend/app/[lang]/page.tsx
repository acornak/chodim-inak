import React from "react";
// Components
import { HeroHome } from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
// Internationalization
import { Locale } from "../../i18-config";
import { getDictionary } from "@/dictionaries";
import AboutAsistance from "@/components/AboutAsistance";
import ContactForm from "@/components/ContactForm";

export default async function Home({
	params: { lang },
}: {
	params: { lang: Locale };
}): Promise<JSX.Element> {
	const dict = (await getDictionary(lang)).home;

	return (
		<>
			<HeroHome dict={dict.hero} locale={lang} />
			<AboutMe dict={dict.introduction} />
			<AboutAsistance dict={dict.assistance} />
			<ContactForm dict={dict.contact} lang={lang} />
		</>
	);
}

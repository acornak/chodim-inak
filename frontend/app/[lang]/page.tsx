import React from "react";
// Components
import { HeroHome } from "@/components/Hero";
import Introduction from "@/components/Introduction";
// Internationalization
import { Locale } from "../../i18-config";
import { getDictionary } from "@/dictionaries";

export default async function Home({
	params: { lang },
}: {
	params: { lang: Locale };
}): Promise<JSX.Element> {
	const dict = await getDictionary(lang);

	return (
		<>
			<HeroHome dict={dict.home.hero} />

			<Introduction dict={dict.home.introduction} />
		</>
	);
}

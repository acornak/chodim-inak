import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
import Questions from "@/components/faq/Questions";
// Internationalization
import { Locale } from "@/i18-config";
import { getDictionary } from "@/dictionaries";
// Image
import heroFaq from "@/public/faq/hero-faq.webp";

export default async function FAQ({
	params: { lang },
}: {
	params: { lang: Locale };
}): Promise<JSX.Element> {
	const dict = (await getDictionary(lang)).faq;

	return (
		<>
			<HeroOthers
				title={dict.hero.heading}
				subtitle={dict.hero.subheading}
				image={heroFaq}
			/>

			<p className="text-lg text-justify p-10">{dict.paragraph1}</p>
			<p className="text-lg text-justify p-10 pt-0">{dict.paragraph2}</p>

			<Questions questions={dict.questions} />
		</>
	);
}

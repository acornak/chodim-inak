import "server-only";
import { Locale } from "./i18-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
	en: () => import("./dictionaries/en.json").then((module) => module.default),
	sk: () => import("./dictionaries/sk.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
	dictionaries[locale]?.() ?? dictionaries.en();

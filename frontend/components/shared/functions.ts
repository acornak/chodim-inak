export const getLocaleFromPath = (pathName: string): "sk" | "en" | null => {
	const segments = pathName.split("/");
	const locale = segments[1];

	if (locale === "sk" || locale === "en") {
		return locale;
	}

	return null;
};

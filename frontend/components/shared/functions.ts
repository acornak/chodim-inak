export const getLocaleFromPath = (pathName: string): string | null => {
	const segments = pathName.split("/");
	return segments[1] || null;
};

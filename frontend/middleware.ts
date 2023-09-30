import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { i18n } from "./i18-config";

function getLocale(request: NextRequest): string | undefined {
	// Negotiator expects plain object so we need to transform headers
	const negotiatorHeaders: Record<string, string> = {};
	request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

	const locales: string[] = Array.from(i18n.locales);

	// Use negotiator and intl-localematcher to get best locale
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
		locales,
	);

	const locale = matchLocale(languages, locales, i18n.defaultLocale);

	return locale;
}

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	const skipPaths = [
		/\/[a-zA-Z-_]+\/_vercel\//,
		/\/_vercel\//,
		"/manifest.json",
		"/favicon.ico",
		"/_next/static",
		"/_next/image",
	];
	if (
		skipPaths.some((path) =>
			typeof path === "string"
				? pathname.startsWith(path)
				: path.test(pathname),
		)
	)
		return;

	const pathnameIsMissingLocale = i18n.locales.every(
		(locale) =>
			!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
	);

	if (pathnameIsMissingLocale) {
		const locale = getLocale(request);
		return NextResponse.redirect(
			new URL(
				`/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
				request.url,
			),
		);
	}
}

export const config = {
	matcher: ["/:locale(calendar|blog|faq|)", "/:locale/blog/:slug*"],
};

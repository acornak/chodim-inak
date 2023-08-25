import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "./theme-provider";

jest.mock("next-themes", () => ({
	ThemeProvider: jest.fn(({ children }) => <div>{children}</div>),
}));

describe("ThemeProvider", () => {
	it("renders children correctly", () => {
		const { getByText } = render(
			<ThemeProvider>
				<div>Child content</div>
			</ThemeProvider>,
		);

		expect(getByText("Child content")).toBeInTheDocument();
	});

	it("passes props to NextThemesProvider correctly", () => {
		render(
			<ThemeProvider attribute="value">
				<div />
			</ThemeProvider>,
		);
		expect(NextThemesProvider).toHaveBeenCalledWith(
			expect.objectContaining({ attribute: "value" }),
			{},
		);
	});
});

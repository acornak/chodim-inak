import React from "react";
import { NextPage } from "next";
import Link from "next/link";

const NotFound: NextPage = () => {
	return (
		<div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 w-full">
			<div>
				<h2 className="mt-6 text-center text-6xl font-semibold text-secondary pb-10">
					404 - Page Not Found
				</h2>
				<p className="mt-2 text-center text-base">
					The page you are looking for does not exist.
					<br />
					If you wish to go back to the homepage, please{" "}
					<Link href="/en" className="underline text-blue-500">
						click here
					</Link>
					.
				</p>
			</div>
		</div>
	);
};

export default NotFound;

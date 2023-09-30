import React from "react";
// Misc
import { format } from "date-fns";
// Types and constants
import { Category } from "../shared/types";

const DateCategories = ({
	date,
	categories,
	textSize = "text-sm",
}: {
	date: string;
	categories?: Category[];
	textSize?: string;
}): JSX.Element => {
	return (
		<div
			className={`${textSize} text-primary-500 dark:text-darkprimary-200 bg-primary-bg py-1 px-2 dark:bg-gray-800 rounded-md inline-block`}
		>
			<span>{format(new Date(date), "MMMM dd, yyyy")}</span>
			{categories && (
				<>
					|
					<span className="ml-2">
						{categories
							.map((category: Category) => category.title)
							.join(", ")}
					</span>
				</>
			)}
		</div>
	);
};

export default DateCategories;

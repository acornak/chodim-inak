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
			className={`${textSize} text-primary-500 dark:text-darkprimary-200 left-4 px-4 bg-primary-200 dark:bg-darkprimary-400 p-1 rounded-full inline-block`}
		>
			<span className="mr-2">
				{format(new Date(date), "MMMM dd, yyyy")}
			</span>
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

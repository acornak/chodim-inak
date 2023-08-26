import React from "react";

const LinkedInIcon = (): JSX.Element => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			height="1.7em"
			fill="currentColor"
			stroke="currentColor"
			className="w-7 h-7"
		>
			<circle cx="16" cy="16" r="15.5" />
			<g className="dark-mode-fill">
				<rect x="7" y="11" width="4" height="14" />
				<path d="M20.499,11c-2.791,0-3.271,1.018-3.499,2v-2h-4v14h4v-8c0-1.297,0.703-2,2-2c1.266,0,2,0.688,2,2v8h4v-7C25,14,24.479,11,20.499,11z" />
				<circle cx="9" cy="8" r="2" />
			</g>
		</svg>
	);
};

export default LinkedInIcon;

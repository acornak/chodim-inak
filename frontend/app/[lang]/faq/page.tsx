import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
// Image
import heroBlog from "@/public/hero-blog.jpeg";

const Blog = (): JSX.Element => {
	return (
		<>
			<HeroOthers
				title={"blog"}
				subtitle="Vitajte na mojom blogu"
				image={heroBlog}
			/>
		</>
	);
};

export default Blog;

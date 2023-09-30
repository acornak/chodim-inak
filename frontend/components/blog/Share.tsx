import React, { FC } from "react";
// Icons
import FacebookIcon from "../icons/Facebook";
import TwitterIcon from "../icons/Twitter";
import LinkedInIcon from "../icons/LinkedIn";
// Types and constants
import { BlogPost } from "../shared/types";

type ShareComponentProps = {
	blogPost: BlogPost;
	heading: string;
};

const ShareComponent: FC<ShareComponentProps> = ({
	blogPost,
	heading,
}): JSX.Element => (
	<>
		<div className="text-center pt-4 px-4 text-xl uppercase font-semibold dark:text-gray-300">
			<p className="mx-auto">{heading}</p>
		</div>
		<div className="mt-4 flex items-center text-center justify-center text-sm pb-6 text-secondary-dark">
			<a
				href={`https://www.facebook.com/sharer/sharer.php?u=https://www.chodim-inak.sk/sk/blog/${blogPost.slug.current}`}
				target="_blank"
				rel="noopener noreferrer"
				className="mr-6 hover:text-primary-dark"
			>
				<FacebookIcon />
			</a>
			<a
				href={`https://twitter.com/intent/tweet?text=${blogPost.title}&url=https://www.chodim-inak.sk/sk/blog/${blogPost.slug.current}`}
				target="_blank"
				rel="noopener noreferrer"
				className="mr-6 hover:text-primary-dark"
			>
				<TwitterIcon />
			</a>
			<a
				href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.antchodim-inak.sk/sk/blog/${blogPost.slug.current}&title=${blogPost.title}&source=https://www.chodim-inak.sk/sk/blog/${blogPost.slug.current}`}
				target="_blank"
				rel="noopener noreferrer"
				className="mr-6 hover:text-primary-dark"
			>
				<LinkedInIcon />
			</a>
		</div>
	</>
);

export default ShareComponent;

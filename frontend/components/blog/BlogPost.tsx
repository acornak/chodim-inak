import React, { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Common Components
import ParseBodyRaw from "./BlogBody";
import ShareComponent from "./Share";
// Types and constants
import { BlogPost } from "../shared/types";

type BlogPostProps = {
	blogPost: BlogPost;
	blogPosts: BlogPost[];
	locale: string;
	dict: {
		postedBy: string;
		latestPosts: string;
		share: string;
	};
};

const BlogPostComponent: FC<BlogPostProps> = ({
	blogPost,
	blogPosts,
	locale,
	dict,
}): JSX.Element => (
	<>
		<div className="bg-primary-bglight dark:bg-gray-700 border-b-2 border-secondary-light">
			<div className="mx-10 mt-4">
				<ParseBodyRaw bodyRaw={blogPost.bodyRaw} />
				<hr className="h-px my-8 border-0 border-gray-400" />
			</div>
		</div>
		<div className="lg:hidden pt-6">
			<div className="font-semibold text-xl text-center bg-primary-bglight dark:bg-gray-700 border-b-2 border-secondary-light mb-6">
				<ShareComponent blogPost={blogPost} heading={dict.share} />
			</div>
			<div className="font-semibold text-xl text-center pb-6 uppercase">
				{dict.latestPosts}
			</div>

			{blogPosts.map((post: BlogPost) => (
				<div className="pb-6" key={post._id}>
					<Link
						href={`/${locale}/blog/[slug]`}
						as={`/${locale}/blog/${post.slug.current}`}
						passHref
						key={post._id}
					>
						<div className="relative text-center">
							<div className="relative w-full h-60">
								<Image
									src={post.mainImage.asset.url}
									alt={post.title}
									style={{
										objectFit: "cover",
									}}
									fill
									className="z-0"
								/>
								<div className="absolute inset-0 bg-black opacity-50 z-10"></div>
							</div>
							<div className="absolute inset-0 flex flex-col items-center justify-center">
								<h2 className="text-xl text-white dark:text-gray-300 py-1 font-semibold z-30 text-center">
									{post.title}
								</h2>
								<span className="text-sm text-white dark:text-gray-300 py-1 z-30 text-center">
									{post.leadRaw}
								</span>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	</>
);

export default BlogPostComponent;

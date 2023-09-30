"use client";
import React, { FC } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Common components
import DateCategories from "./DateCategories";
// Icons
import { ChevronRight } from "../icons/Chevrons";
// Constants and types
import { BlogPost } from "../shared/types";

type BlogPostListProps = {
	post: BlogPost;
	locale: string;
	dict: {
		readMore: string;
	};
};

const BlogPostList: FC<BlogPostListProps> = ({
	post,
	locale,
	dict,
}): JSX.Element => (
	<Link
		href={`/${locale}/blog/[slug]`}
		as={`/${locale}/blog/${post.slug.current}`}
		passHref
	>
		<div className="hidden lg:flex m-4 mb-8 bg-primary-bglight dark:bg-gray-700 text-gray-700 dark:text-gray-300 group">
			<div className="flex-1 p-6 border-b-2 border-secondary-light dark:border-secondary-dark">
				<div className="flex justify-between items-center">
					{post.author && (
						<div className="text-sm text-primary-500 dark:text-darkprimary-200 bg-primary-bg py-1 px-2 dark:bg-gray-800 rounded-md">
							<div className="text-sm text-secondary dark:text-darksecondary">
								{post.author.name}
							</div>
						</div>
					)}
					<DateCategories
						date={post.publishedAt}
						categories={post.categories}
					/>
				</div>
				<h2 className="text-xl text-black dark:text-gray-300 py-4 font-semibold text-center">
					{post.title}
				</h2>

				<div>{post.leadRaw}</div>
				<div className="flex items-center justify-center pt-6">
					<div className="flex items-center text-sm text-secondary dark:text-darksecondary uppercase">
						{dict.readMore}
						<ChevronRight className="inline-block ml-2 h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-2" />
					</div>
				</div>
			</div>
			<div className="relative flex-1">
				<Image
					src={post.mainImage.asset.url}
					alt={post.title}
					style={{
						objectFit: "cover",
					}}
					fill
				/>
			</div>
		</div>
		<div className="lg:hidden flex flex-col m-4 bg-primary-bglight dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-b-2 border-secondary-light">
			<div className="relative w-full h-60">
				<Image
					src={post.mainImage.asset.url}
					alt={post.title}
					fill
					style={{
						objectFit: "cover",
					}}
				/>
			</div>
			<div className="flex justify-between items-center p-2">
				{post.author && (
					<div className="text-sm text-primary-500 dark:text-darkprimary-200 bg-primary-bg py-1 px-2 dark:bg-gray-800 rounded-md">
						{post.author.name}
					</div>
				)}
				<DateCategories
					date={post.publishedAt}
					categories={post.categories}
				/>
			</div>
			<h2 className="text-xl text-black dark:text-gray-300 py-4 px-4 font-semibold text-center">
				{post.title}
			</h2>
			<div className="p-2">{post.leadRaw}</div>
			<div className="flex items-center justify-center pt-2 pb-4">
				<div className="flex items-center text-sm text-secondary dark:text-darksecondary uppercase">
					{dict.readMore}
					<ChevronRight className="inline-block ml-2 h-4 w-4 transition-transform duration-200 ease-in-out" />
				</div>
			</div>
		</div>
	</Link>
);

export default BlogPostList;

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
};

const BlogPostList: FC<BlogPostListProps> = ({ post, locale }): JSX.Element => (
	<Link
		href={`/${locale}/blog/[slug]`}
		as={`/${locale}/blog/${post.slug.current}`}
		passHref
	>
		<div className="flex m-4 bg-primary-bglight dark:bg-gray-700 text-gray-700 dark:text-gray-300 group">
			<div className="flex-1 p-6 border-b-2 border-secondary-light dark:border-secondary-dark">
				<div className="text-left content-left">
					<DateCategories
						date={post.publishedAt}
						categories={post.categories}
					/>
					<h2 className="text-xl text-black dark:text-gray-300 py-4 font-semibold">
						{post.title}
					</h2>
				</div>
				<div>{post.leadRaw}</div>
				<div className="flex items-center justify-center pt-6">
					<div className="flex items-center text-sm text-secondary dark:text-darksecondary uppercase">
						Read more
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
	</Link>
);

export default BlogPostList;

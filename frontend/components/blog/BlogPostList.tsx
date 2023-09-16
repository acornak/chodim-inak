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
	<div className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 group overflow-hidden m-4 border-2 border-gray-300 dark:border-gray-700">
		<div className="relative overflow-hidden h-64">
			<Image
				src={post.mainImage.asset.url}
				alt={post.title}
				fill
				style={{
					objectFit: "cover",
				}}
				sizes="100%"
				className="transition-transform duration-500 ease-in-out group-hover:scale-110"
			/>
		</div>
		<div className="p-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl text-black dark:text-white py-4 font-semibold">
					{post.title}
				</h2>
				<DateCategories
					date={post.publishedAt}
					categories={post.categories}
				/>
			</div>
			{/* TODO: add leading paragraph */}
			<div className="mt-4 flex flex-wrap"></div>
			<div className="flex items-center justify-center">
				<Link
					href={`/${locale}/blog/[slug]`}
					as={`/${locale}/blog/${post.slug.current}`}
					passHref
				>
					<div className="flex items-center text-sm text-secondary dark:text-darksecondary uppercase">
						Read more
						<ChevronRight className="inline-block ml-2 h-4 w-4 transition-transform duration-200 ease-in-out group-hover:translate-x-2" />
					</div>
				</Link>
			</div>
		</div>
	</div>
);

export default BlogPostList;

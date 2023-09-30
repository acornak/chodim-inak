"use client";
import React, { FC, useEffect, useRef } from "react";
// Next
import Image from "next/image";
import Link from "next/link";
// Common components
import ShareComponent from "./Share";
// Types and constants
import { BlogPost } from "../shared/types";

const PostComponent = ({
	post,
	locale,
}: {
	post: BlogPost;
	locale: string;
}): JSX.Element => (
	<Link
		href={`/${locale}/blog/[slug]`}
		as={`/${locale}/blog/${post.slug.current}`}
		passHref
	>
		<div className="m-4 relative bg-primary-bglight dark:bg-gray-700 text-gray-700 dark:text-gray-300 group">
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
				<h2 className="text-xl text-white dark:text-gray-300 py-1 font-semibold z-30">
					{post.title}
				</h2>
				<span className="text-sm text-white dark:text-gray-300 py-1 z-30">
					{post.leadRaw}
				</span>
			</div>
		</div>
	</Link>
);

type LatestPostsProps = {
	posts: BlogPost[];
	locale: string;
	dict: {
		latestPosts: string;
		share: string;
	};
	share?: boolean;
	blogPost?: BlogPost;
};

const LatestPosts: FC<LatestPostsProps> = ({
	posts,
	locale,
	dict,
	share = false,
	blogPost,
}): JSX.Element => {
	const stickyRef = useRef<HTMLDivElement>(null);
	const originalOffsetTop = useRef<number | null>(null);

	useEffect(() => {
		const stickyElement = stickyRef.current;
		let originalWidth: string | null = null;

		if (stickyElement) {
			originalOffsetTop.current =
				stickyElement.getBoundingClientRect().top + window.scrollY;
			originalWidth = window.getComputedStyle(stickyElement).width;
		}

		const handleScroll = () => {
			if (!stickyElement || originalOffsetTop.current === null) return;

			const scrollPosition = window.scrollY;
			const parent = stickyElement.parentElement;

			if (!parent) return;

			if (scrollPosition >= originalOffsetTop.current - 20) {
				stickyElement.style.position = "fixed";
				stickyElement.style.top = "20px";
				if (originalWidth) {
					stickyElement.style.width = originalWidth;
				}
			} else {
				stickyElement.style.position = "relative";
				stickyElement.style.top = "unset";
				stickyElement.style.width = "auto";
			}
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<>
			<div ref={stickyRef}>
				<div className="mt-4 hidden lg:block bg-primary-bglight dark:bg-gray-700 col-span-1 mr-10 border-b-2 border-secondary-light dark:border-secondary-dark max-h-[69vh]">
					<div className="text-center pt-4 px-4 text-xl uppercase font-semibold dark:text-gray-300">
						<p className="mx-auto">{dict.latestPosts}</p>
					</div>
					{posts.map((post: BlogPost) => (
						<PostComponent
							post={post}
							key={post._id}
							locale={locale}
						/>
					))}
				</div>
				{share && blogPost && (
					<div className="mt-4 hidden lg:block bg-primary-bglight dark:bg-gray-700 col-span-1 mr-10 border-b-2 border-secondary-light dark:border-secondary-dark max-h-[69vh]">
						<ShareComponent
							blogPost={blogPost}
							heading={dict.share}
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default LatestPosts;

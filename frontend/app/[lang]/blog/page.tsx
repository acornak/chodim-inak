import React from "react";
// Components
import { HeroOthers } from "@/components/Hero";
// Internationalization
import { Locale } from "@/i18-config";
import { getDictionary } from "@/dictionaries";
// Functions
import { getBlogPosts } from "@/components/shared/functions";
// Image
import heroBlog from "@/public/blog/hero-blog.webp";
// Types and constants
import { BlogPost } from "@/components/shared/types";
import BlogPostList from "@/components/blog/BlogPostList";
import LatestPosts from "@/components/blog/LatestPosts";

export const dynamicParams: boolean = true;
export const revalidate: number = 60;

export default async function Blog({
	params: { lang },
}: {
	params: { lang: Locale };
}): Promise<JSX.Element> {
	const dict = (await getDictionary(lang)).blog;
	const blogPosts: BlogPost[] = await getBlogPosts();

	const handleBlogPosts = (): JSX.Element => {
		if (!blogPosts || blogPosts.length === 0) {
			return (
				<div className="text-center pt-10 px-4 text-2xl font-semibold dark:text-gray-300">
					<p className="mx-auto">{dict.placeholder}</p>
				</div>
			);
		}

		return (
			<>
				<div className="text-center pt-10 px-4 text-2xl uppercase font-semibold dark:text-gray-300">
					<p className="mx-auto">Blog</p>
				</div>
				<div className="relative lg:flex lg:justify-between text-center pt-6">
					<div className="flex-1 lg:w-2/3 mx-6">
						{blogPosts.map((post: BlogPost) => (
							<BlogPostList
								post={post}
								locale={lang}
								key={post._id}
								dict={dict}
							/>
						))}
					</div>
					<div className="flex-none lg:w-1/3">
						<LatestPosts
							posts={blogPosts.slice(0, 2)}
							locale={lang}
							dict={dict}
						/>
					</div>
				</div>
			</>
		);
	};

	return (
		<>
			<HeroOthers
				title={dict.hero.heading}
				subtitle={dict.hero.subheading}
				image={heroBlog}
			/>
			{handleBlogPosts()}
		</>
	);
}

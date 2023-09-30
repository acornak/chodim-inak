import React from "react";
// Next
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
// Common components
import DateCategories from "@/components/blog/DateCategories";
// Functions
import { getBlogPost, getBlogPosts } from "@/components/shared/functions";
import { ChevronLeft } from "@/components/icons/Chevrons";
// Types and constants
import { BlogPost } from "@/components/shared/types";
import BlogPostComponent from "@/components/blog/BlogPost";
import { getDictionary } from "@/dictionaries";
import LatestPosts from "@/components/blog/LatestPosts";

export async function generateMetadata({
	params: { slug },
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const post = await getBlogPost(slug);
	if (!post) return {} as Metadata;

	return {
		metadataBase: new URL(`https://www.chodim-inak.sk/sk/blog/${slug}`),
		alternates: {
			canonical: `/blog/${slug}`,
		},
		title: post.title,
		description: post.leadRaw,
		keywords: post.tags?.join(", "),
		openGraph: {
			title: post.title,
			description: post.leadRaw,
			url: new URL(`https://www.chodim-inak.sk/sk/blog/${slug}`),
			siteName: post.title,
			locale: "sk_SK",
			images: [
				{
					url: post.mainImage.asset.url,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: post.title,
			description: post.leadRaw,
			images: [post.mainImage.asset.url],
		},
	};
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
	const posts: BlogPost[] = await getBlogPosts();

	return posts.map((post: BlogPost) => ({
		slug: post.slug.current,
	}));
}

export const dynamicParams: boolean = true;
export const revalidate: number = 3600;

const PostPage = async ({
	params: { slug, lang },
}: {
	params: { slug: string; lang: "sk" | "en" };
}): Promise<JSX.Element> => {
	const dict = (await getDictionary(lang)).blog;
	const blogPost: BlogPost = await getBlogPost(slug);
	const blogPosts: BlogPost[] = await getBlogPosts();

	if (!blogPost) {
		return (
			<div className="flex w-full h-screen bg-primary-bg dark:bg-gray-800 justify-center items-center mb-10">
				<div className="text-center">
					<div className="text-gray-700 dark:text-gray-300 text-7xl">
						404
					</div>
					<div className="text-xl">
						We are sorry, but the page you are trying to reach is
						not available.
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full pb-6">
			<div className="relative overflow-hidden h-[50vh] lg:h-[70vh]">
				<Image
					src={blogPost.mainImage.asset.url}
					alt={blogPost.title}
					fill
					style={{
						objectFit: "cover",
					}}
					sizes="100%"
				/>
			</div>
			<div className="mt-6 p-6 bg-primary-bg dark:bg-gray-800 text-gray-700 dark:text-gray-300">
				<div className="flex justify-between items-center w-full pb-6">
					<Link href={`/${lang}/blog`} className="group uppercase">
						<ChevronLeft className="inline-block mr-2 h-6 w-6 transition-transform duration-200 ease-in-out group-hover:-translate-x-2" />
						{dict.back}
					</Link>

					<div className="hidden lg:block text-3xl font-semibold">
						{blogPost.title}
					</div>
					<DateCategories
						date={blogPost.publishedAt}
						textSize="text-sm"
					/>
				</div>
				<div className="lg:hidden text-3xl text-center font-semibold">
					{blogPost.title}
				</div>
			</div>
			<div className="text-black dark:text-gray-300 pl-6">
				{dict.postedBy} {blogPost.author.name}
			</div>
			<div className="relative md:flex md:justify-between pt-6 text-black dark:text-gray-300">
				<div className="flex-1 md:w-2/3 mx-6">
					<BlogPostComponent
						blogPost={blogPost}
						dict={dict}
						blogPosts={blogPosts.slice(0, 3)}
						locale={lang}
					/>
				</div>
				<div className="flex-none md:w-1/3 text-center">
					<LatestPosts
						posts={blogPosts.slice(0, 1)}
						locale={lang}
						dict={dict}
						share={true}
						blogPost={blogPost}
					/>
				</div>
			</div>
		</div>
	);
};

export default PostPage;

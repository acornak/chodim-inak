import React from "react";
// Next
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
// Misc
import { format } from "date-fns";
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
			<div className="mt-6 p-6 text-gray-700 dark:text-gray-300">
				<div className="flex justify-between items-center w-full pb-6">
					<Link href={`/${lang}/blog`} className="group uppercase">
						<ChevronLeft className="inline-block mr-2 h-6 w-6 transition-transform duration-200 ease-in-out group-hover:-translate-x-2" />
						{dict.back}
					</Link>
				</div>
				<div className="text-3xl text-center font-semibold">
					{blogPost.title}
				</div>
			</div>
			<div className="text-xs md:text-sm ml-6 mr-10 flex justify-between text-white dark:text-darkprimary-200">
				<div className="bg-secondary-dark py-1 px-2 dark:bg-gray-800 rounded-md">
					{dict.postedBy} {blogPost.author.name}
				</div>
				<div className="bg-secondary-dark py-1 px-2 dark:bg-gray-800 rounded-md">
					<span>
						{format(
							new Date(blogPost.publishedAt),
							"MMMM dd, yyyy",
						)}
					</span>
				</div>
			</div>
			<div className="relative lg:flex lg:justify-between pt-6 text-black dark:text-gray-300">
				<div className="flex-1 lg:w-2/3 mx-6">
					<BlogPostComponent
						blogPost={blogPost}
						dict={dict}
						blogPosts={blogPosts.slice(0, 3)}
						locale={lang}
					/>
				</div>
				<div className="flex-none lg:w-1/3 text-center">
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

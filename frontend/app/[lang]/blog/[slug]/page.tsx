import React from "react";
// Next
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
// Common components
import DateCategories from "@/components/blog/DateCategories";
import ParseBodyRaw from "@/components/blog/BlogBody";
// Icons
import LinkedInIcon from "@/components/icons/LinkedIn";
import TwitterIcon from "@/components/icons/Twitter";
import FacebookIcon from "@/components/icons/Facebook";
// Functions
import { getBlogPost, getBlogPosts } from "@/components/shared/functions";
import { ChevronLeft } from "@/components/icons/Chevrons";
// Types and constants
import { BlogPost, Category } from "@/components/shared/types";

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
	params: { slug: string; lang: string };
}): Promise<JSX.Element> => {
	const blogPost: BlogPost = await getBlogPost(slug);

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
						Back to blog
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
				<ParseBodyRaw bodyRaw={blogPost.bodyRaw} />
				<hr className="h-px my-8 border-0 border-gray-400" />
				<div className="mt-4 flex flex-wrap text-sm">
					Posted in
					<p className="mx-2">
						{blogPost.categories &&
							blogPost.categories
								.map((category: Category) => category.title)
								.join(", ")}
					</p>{" "}
					by
					<a
						href="https://www.linkedin.com/in/anton-cornak/"
						target="_blank"
						rel="noopener noreferrer"
						className="ml-2"
					>
						<p>{blogPost.author.name}</p>
					</a>
					.
				</div>
				<div className="mt-4 flex flex-wrap text-sm">
					<p className="pr-6">Tags:</p>
					{blogPost.tags?.map((tag: string) => (
						<div key={tag} className="px-4 mx-2 mb-2 outline">
							{tag}
						</div>
					))}
				</div>

				<div className="mt-4 flex items-center text-sm">
					<div className="text-xl py-6 font-semibold pr-10">
						Liked the post? Share!
					</div>
					<a
						href={`https://www.facebook.com/sharer/sharer.php?u=https://www.antoncornak.com/blog/${blogPost.slug.current}`}
						target="_blank"
						rel="noopener noreferrer"
						className="mr-6"
					>
						<FacebookIcon />
					</a>
					<a
						href={`https://twitter.com/intent/tweet?text=${blogPost.title}&url=https://www.antoncornak.com/blog/${blogPost.slug.current}`}
						target="_blank"
						rel="noopener noreferrer"
						className="mr-6"
					>
						<TwitterIcon />
					</a>
					<a
						href={`https://www.linkedin.com/shareArticle?mini=true&url=https://www.antoncornak.com/blog/${blogPost.slug.current}&title=${blogPost.title}&source=https://www.antoncornak.com/blog/${blogPost.slug.current}`}
						target="_blank"
						rel="noopener noreferrer"
						className="mr-6"
					>
						<LinkedInIcon />
					</a>
				</div>
			</div>
		</div>
		// TODO: add latest posts
		// Mozno nieco po stranach
	);
};

export default PostPage;

/* eslint @typescript-eslint/no-explicit-any: 0 */
"use client";
import React from "react";
// Next
import Image from "next/image";
// Misc
import {
	PortableText,
	PortableTextComponentProps,
	PortableTextMarkComponentProps,
} from "@portabletext/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
// CSS
import "./blockquote.css";
import { BlogContent } from "../shared/types";

function getImageUrl(ref: string): string {
	// Split the string into an array of substrings
	const parts = ref.split("-");

	// Remove the first element of the array
	parts.shift();

	// Change the last element from 'jpg' to '.jpg'
	const lastElement = parts.pop();
	const newRef = parts.join("-") + "." + lastElement;

	return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${newRef}`;
}

const PortableComponents = {
	types: {
		image: ({ value }: PortableTextComponentProps<any>) => (
			<div className="pb-6 px-0">
				<div className="relative overflow-hidden h-96 group">
					<Image
						src={getImageUrl(value.asset._ref)}
						alt="Blog post"
						fill
						style={{
							objectFit: "cover",
						}}
						sizes="100%"
						className="transition-transform duration-500 ease-in-out group-hover:scale-110"
					/>
				</div>
			</div>
		),
		code: ({ value }: any) => (
			<div className="text-xs pb-6 allow-select relative">
				{value.language && (
					<div className="absolute top-0 left-0 bg-gray-800 px-2 py-1 border-b border-gray-600 text-gray-400 z-10 font-bold">
						{value.language}
					</div>
				)}
				<SyntaxHighlighter language={value.language} style={atomDark}>
					{value.language ? "\n" + value.code : value.code}
				</SyntaxHighlighter>
			</div>
		),
		facebookUrl: ({ value }: PortableTextComponentProps<any>) => {
			console.log(value);
			return (
				<iframe
					src={`https://www.facebook.com/plugins/post.php?href=https%3A%2F%2F${encodeURIComponent(
						value.url.slice(8),
					)}&show_text=true&width=500`}
					width="500"
					height="811"
					allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
				/>
			);
		},
	},
	block: {
		h1: ({ children }: PortableTextComponentProps<any>) => (
			<h1 className="text-3xl pb-6 font-semibold text-center">
				{children}
			</h1>
		),
		h2: ({ children }: PortableTextComponentProps<any>) => (
			<h1 className="text-2xl pb-6 font-semibold text-center">
				{children}
			</h1>
		),
		h3: ({ children }: PortableTextComponentProps<any>) => (
			<h1 className="text-xl pb-6 font-semibold text-center">
				{children}
			</h1>
		),
		h4: ({ children }: PortableTextComponentProps<any>) => (
			<h1 className="text-md pb-6 font-semibold text-center">
				{children}
			</h1>
		),
		blockquote: ({ children }: PortableTextComponentProps<any>) => (
			<blockquote className="border-l-4 bg-primary-400 dark:bg-darkprimary-400 text-primary-200 dark:text-darkprimary-200 pl-4 py-2 my-4 relative">
				<div className="quote-mark quote-mark--open">“</div>
				<div className="ml-10 pb-4">{children}</div>
				<div className="quote-mark quote-mark--close">”</div>
			</blockquote>
		),
		normal: ({ children }: PortableTextComponentProps<any>) => (
			<p className="mb-4 text-sm text-justify">{children}</p>
		),
	},
	list: {
		bullet: ({ children }: PortableTextComponentProps<any>) => (
			<ul className="pb-6 text-xs pl-4 space-y-2">{children}</ul>
		),
		number: ({ children }: PortableTextComponentProps<any>) => (
			<ol className="pb-6 text-xs pl-4 space-y-2">{children}</ol>
		),
	},
	listItem: {
		bullet: ({ children }: PortableTextComponentProps<any>) => (
			<li className="relative">
				<span className="absolute left-2 top-1/2 transform -translate-y-1/2 h-1 w-1 bg-secondary-dark rounded-full"></span>
				<div className="pl-6">{children}</div>
			</li>
		),
		number: (props: PortableTextComponentProps<any>) => (
			<li className="pl-6">
				<span className="text-secondary-dark inline">
					{props.index + 1}.&nbsp;&nbsp;
				</span>
				<span className="inline">{props.children}</span>
			</li>
		),
	},
	marks: {
		link: ({ value, children }: PortableTextMarkComponentProps<any>) => {
			return (
				<a
					href={value.href}
					target="_blank"
					rel="noopener noreferrer"
					className="text-secondary-dark"
				>
					{children}
				</a>
			);
		},
	},
};

const ParseBodyRaw = ({ bodyRaw }: { bodyRaw: BlogContent[] }): JSX.Element => {
	return (
		<div className="pt-10">
			<PortableText value={bodyRaw} components={PortableComponents} />
		</div>
	);
};

export default ParseBodyRaw;

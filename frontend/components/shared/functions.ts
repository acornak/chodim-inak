import { BlogPost } from "./types";

/**
 * Returns locale from path. If locale is not found, returns null.
 * @param pathName - path name
 * @returns locale
 */
export const getLocaleFromPath = (pathName: string): "sk" | "en" | null => {
	const segments = pathName.split("/");
	const locale = segments[1];

	if (locale === "sk" || locale === "en") {
		return locale;
	}

	return null;
};

/**
 * Retrieves a list of blog posts from an API.
 *
 * This function makes an asynchronous GET request to an API endpoint to fetch a list of blog posts.
 * It includes an authorization token in the request headers for authentication.
 * The response is checked for success, and the data is extracted and returned as an array of blog post objects.
 *
 * @returns {Promise<any>} - A promise that resolves to an array of blog post objects.
 * @throws {Error} - If the request fails or the response is not successful.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
	};

	const query: string = `{
        allPost {
			_id
            title
            slug {
                current
            }
            publishedAt
            mainImage {
                asset {
                    url
                }
            }
            categories {
                title
            }
        }
    }`;

	const url: string = `${process.env.SANITY_URL}v1/graphql/${process.env.SANITY_DATASET}/default`;
	const res: Response = await fetch(url, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({ query }),
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const data = await res.json();

	return data.data.allPost
		.filter((post: BlogPost) => !post._id.startsWith("drafts."))
		.sort(
			(a: BlogPost, b: BlogPost) =>
				new Date(b.publishedAt).getTime() -
				new Date(a.publishedAt).getTime(),
		);
}

/**
 * Gets a single blog post from an API.
 *
 * This function makes an asynchronous GET request to an API endpoint to fetch a single blog post by its slug.
 * It includes an authorization token in the request headers for authentication.
 *
 * @param slug - The slug of the blog post to fetch.
 * @returns {Promise<BlogPost>} - A promise that resolves to a blog post object.
 *
 * @throws {Error} - If the request fails or the response is not successful.
 */
export async function getBlogPost(slug: string): Promise<BlogPost> {
	const headers: HeadersInit = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
	};

	const query: string = `{
        allPost(where: {slug: {current: {eq: "${slug}"}}}) {
            title
            slug {
                current
            }
            publishedAt
            mainImage {
                asset {
                    url
                }
            }
            bodyRaw
            categories {
                title
            }
            author {
                name
            }
        }
    }`;

	const url: string = `${process.env.SANITY_URL}v1/graphql/${process.env.SANITY_DATASET}/default`;
	const res: Response = await fetch(url, {
		method: "POST",
		headers: headers,
		body: JSON.stringify({ query }),
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	const data = await res.json();
	return data.data.allPost[0];
}

import { defineField, defineType } from "sanity";

export default defineType({
	name: "post",
	title: "Post",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Titulok",
			type: "string",
			validation: (Rule) => [
				Rule.required().min(10).error("Minimálne 10 znakov."),
				Rule.max(60).warning("Maximálne 60 znakov"),
			],
		}),
		defineField({
			name: "slug",
			title: "URL adresa",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		}),
		defineField({
			name: "author",
			title: "Autor",
			type: "reference",
			to: { type: "author" },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "mainImage",
			title: "Hlavný obrázok",
			type: "image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "categories",
			title: "Kategórie",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		}),
		defineField({
			name: "publishedAt",
			title: "Publikované",
			type: "datetime",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "lead",
			title: "Úvodný odstavec",
			type: "string",
			validation: (Rule) => [
				Rule.required().min(10).error("Minimálne 10 znakov."),
				Rule.max(100).warning("Maximálne 100 znakov"),
			],
		}),
		defineField({
			name: "body",
			title: "Obsah",
			type: "blockContent",
			validation: (Rule) => Rule.required(),
		}),
	],

	preview: {
		select: {
			title: "title",
			author: "author.name",
			media: "mainImage",
		},
		prepare(selection) {
			const { author } = selection;
			return { ...selection, subtitle: author && `by ${author}` };
		},
	},
});

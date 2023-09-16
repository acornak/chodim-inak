import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
	api: {
		projectId: "28zqu8mc",
		dataset: "production",
	},
	graphql: [
		{
			playground: true,
			id: "chodiminak-graphql",
		},
	],
});

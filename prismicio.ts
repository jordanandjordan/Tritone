import * as prismic from "@prismicio/client";
import sm from "./slicemachine.config.json";

export const repositoryName = sm.repositoryName;

const routes: prismic.ClientConfig["routes"] = [
  {
    type: "homepage",
    path: "/",
  },
  {
    type: "our_story",
    path: "/our-story",
  },
  {
    type: "services",
    path: "/services",
  },
];

export function createClient(config: prismic.ClientConfig = {}) {
  const client = prismic.createClient(repositoryName, {
    routes,

    fetchOptions: {
      cache: "no-store",
      next: { revalidate: 0 },
    },

    ...config,
  });

  return client;
}
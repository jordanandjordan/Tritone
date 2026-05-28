import {
  createClient as baseCreateClient,
  type ClientConfig,
  type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "./slicemachine.config.json";

export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

const routes: Route[] = [
  { type: "homepage", path: "/" },
  { type: "our_story", path: "/our-story" },
  { type: "services", path: "/services" },
  { type: "site_settings", path: "/" },
];

export const createClient = (config: ClientConfig = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,

    fetchOptions:
      process.env.NODE_ENV === "production"
        ? {
            next: { tags: ["prismic"] },
            cache: "force-cache",
          }
        : {
            cache: "no-store",
          },

    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
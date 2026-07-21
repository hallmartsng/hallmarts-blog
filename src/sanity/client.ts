import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "70in7vtp",
  dataset: "production",
  apiVersion: "2026-05-15",
  useCdn: false,
});

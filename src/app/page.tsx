import { type SanityDocument } from "next-sanity";

import { client } from "@/sanity/client";
import Home from "@/components/Home";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, author, tags, image, body,excerpt,category,subcategory,duration,featured, publishedAt}`;

// *[_type == "post" && "javascript" in tags]
// *[_type == "post" && count((tags[]->slug.current)[@ in ["javascript", "react"]]) > 0]
const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  return <Home posts={posts ? posts : []} />;
}

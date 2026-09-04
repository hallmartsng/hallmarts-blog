import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { Metadata } from "next";
import PostDetail from "@/components/PostDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const POST_QUERY = `*[
  _type == "post" &&
  slug.current == $slug
][0]`;

const MORE_POSTS_QUERY = `*[
  _type == "post" &&
  category == $category &&
  slug.current != $currentSlug
] | order(publishedAt desc)[0...6]`;

const options = {
  next: { revalidate: 30 },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    await params,
    options,
  );

  return {
    title: post?.title ? `${post.title} | Hallmarts` : "Hallmarts",
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Get the current post
  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug },
    options,
  );

  if (!post) {
    return null;
  }

  // 2. Get other posts in the same category
  const morePosts = await client.fetch<SanityDocument[]>(
    MORE_POSTS_QUERY,
    {
      category: post.category,
      currentSlug: post.slug.current,
    },
    options,
  );

  return <PostDetail post={post} morePosts={morePosts} isloading={!post} />;
}

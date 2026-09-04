import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Link from "next/link";
import { Metadata } from "next";
import Section from "@/components/Section";

interface PageProps {
  params: Promise<{
    category: string; // The parent dynamic folder segment
    subcategory: string; // The child dynamic folder segment
  }>;
}

// GROQ Query: Verifies both the post's slug AND that its referenced category matches
const POSTS_QUERY = `*[
  _type == "post" &&
  category == $category &&
  subcategory == $subcategory
] | order(publishedAt desc)`;

const options = { next: { revalidate: 30 } };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;

  return {
    title: ` ${category} | ${subcategory}`,
  };
}

export default async function PostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const posts = await client.fetch<SanityDocument[] | null>(
    POSTS_QUERY,
    resolvedParams, // Spreads both $category and $slug variables into GROQ
    options,
  );

  //   if (!posts) {
  //     notFound();
  //   }

  return <Section posts={posts || []} />;
}

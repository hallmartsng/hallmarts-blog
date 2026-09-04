"use client";
import { type SanityDocument } from "next-sanity";

import { SUBCATEGORY_META } from "@/lib/navigation";
import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/utils/imageGenerator";

interface PostCardProps {
  post: SanityDocument;
  featured: boolean;
}

export default function PostCard({ post, featured }: PostCardProps) {
  const subcategory =
    typeof post.subcategory === "string" ? post.subcategory : "";
  const sub =
    subcategory in SUBCATEGORY_META
      ? SUBCATEGORY_META[subcategory as keyof typeof SUBCATEGORY_META]
      : {
          label: subcategory,
          emoji: "📌",
        };

  console.log("post postcard: ", post);

  const postImageUrl = post.image
    ? urlForImage(post.image)?.width(550).height(310).url()
    : null;
  if (featured) {
    return (
      <Link
        href={`/post/${post.slug.current}`}
        className="group relative block overflow-hidden rounded-3xl bg-black shadow-lg"
      >
        <div className="relative h-105 w-full overflow-hidden">
          {postImageUrl ? (
            <Image
              src={postImageUrl}
              alt={post.title}
              width={850}
              height={550}
              // fittingType="fill"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
            />
          ) : (
            <div className="h-full w-full bg-linear-to-br from-[#ED1D3E] to-black" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ED1D3E] px-3 py-1 text-xs font-bold uppercase tracking-wider">
            {sub.emoji} {sub.label}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight text-balance">
            {post.title}
          </h2>
          <div className="mt-2 text-sm text-white/80 line-clamp-2 max-w-2xl">
            {post.excerpt}
            {/* {Array.isArray(post.body) && <PortableText value={post.body} />} */}
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-white/60">
            <span className="font-semibold capitalize">{post.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {post.duration || 4} min read
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/post/${post.slug.current}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="relative h-48 w-full overflow-hidden">
        {postImageUrl ? (
          <Image
            src={postImageUrl}
            alt={post.title}
            width={850}
            height={550}
            // fittingType="fill"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-red-100 to-red-50" />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[#ED1D3E] shadow-sm">
          {sub.emoji} {sub.label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold leading-snug text-gray-900 group-hover:text-[#ED1D3E] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <div className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
          {post.excerpt}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span className="font-semibold text-gray-600">{post.author}</span>
          <span className="flex items-center gap-1 font-semibold text-[#ED1D3E]">
            Read{" "}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

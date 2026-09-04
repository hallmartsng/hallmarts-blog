"use client";
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { SUBCATEGORY_META, NAV_STRUCTURE } from "@/lib/navigation";
import ReactMarkdown from "react-markdown";
import { Clock, ChevronRight, ArrowLeft } from "lucide-react";
import { SanityDocument } from "next-sanity";
import Image from "next/image";

export default function PostDetail({ post }: { post: SanityDocument }) {
  const [loading, setLoading] = useState(true);
  const [more, setMore] = useState([]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24">
        <div className="h-72 animate-pulse rounded-3xl bg-gray-100" />
        <div className="mt-6 space-y-3">
          <div className="h-6 w-3/4 animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <Link to="/" className="mt-4 inline-block text-[#ED1D3E] font-semibold">
          Back home
        </Link>
      </div>
    );
  }

  const sub = SUBCATEGORY_META[post.subcategory] || {
    label: post.subcategory,
    emoji: "📌",
  };
  const section = NAV_STRUCTURE.find((s) => s.category === post.category);

  return (
    <div className="bg-white">
      <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
          <Link to="/" className="hover:text-[#ED1D3E]">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          {section && (
            <>
              <span className="text-gray-600">{section.label}</span>
              <ChevronRight className="h-3 w-3" />
            </>
          )}
          <span className="text-[#ED1D3E]">{sub.label}</span>
        </nav>

        {/* Header */}
        <header className="mt-5">
          <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ED1D3E]">
            {sub.emoji} {sub.label}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight text-gray-900 text-balance">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500">{post.excerpt}</p>
          <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
            <span className="font-bold text-gray-800">{post.author}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {post.read_time || 4} min read
            </span>
          </div>
        </header>

        {/* Cover */}
        {post.image_url && (
          <div className="mt-7 overflow-hidden rounded-3xl">
            <Image
              src={post.image_url}
              alt={post.title}
              width={860}
              height={560}
              className="h-72 w-full object-cover sm:h-96"
            />
          </div>
        )}

        {/* Body */}
        <div className="prose prose-lg max-w-none mt-8">
          {post.content ? (
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="mt-4 leading-relaxed text-gray-700">
                    {children}
                  </p>
                ),
                h2: ({ children }) => (
                  <h2 className="mt-8 text-2xl font-bold text-gray-900">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-6 text-xl font-bold text-gray-900">
                    {children}
                  </h3>
                ),
                ul: ({ children }) => (
                  <ul className="mt-4 list-disc pl-6 text-gray-700 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mt-4 list-decimal pl-6 text-gray-700 space-y-1">
                    {children}
                  </ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="mt-6 border-l-4 border-[#ED1D3E] bg-red-50 pl-4 py-2 italic text-gray-700">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-[#ED1D3E] font-semibold underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              post.content
            </ReactMarkdown>
          ) : (
            <p className="mt-4 text-gray-500">{post.excerpt}</p>
          )}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <Link
          to={
            section
              ? section.children.find((c) => c.subcategory === post.subcategory)
                  ?.path || "/"
              : "/"
          }
          className="mt-10 inline-flex items-center gap-2 text-sm font-bold text-[#ED1D3E] hover:gap-3 transition-all"
        >
          <ArrowLeft className="h-4 w-4" /> Back to {sub.label}
        </Link>
      </article>

      {/* More from this category */}
      {more.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
              More from {section?.label}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p) => (
                <PostCardMini key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function PostCardMini({ post }: { post: SanityDocument }) {
  const sub = SUBCATEGORY_META[post.subcategory] || {
    label: post.subcategory,
    emoji: "📌",
  };
  return (
    <Link
      to={`/post/${post.id}`}
      className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm hover:shadow-md transition-all"
    >
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
        {post.image_url ? (
          <Image
            src={post.image_url}
            alt={post.title}
            fittingType="fill"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-red-100 to-red-50" />
        )}
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-[11px] font-bold uppercase tracking-wide text-[#ED1D3E]">
          {sub.emoji} {sub.label}
        </span>
        <h3 className="mt-1 text-sm font-bold leading-snug text-gray-900 line-clamp-2 group-hover:text-[#ED1D3E]">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

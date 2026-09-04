"use client";
import { type SanityDocument } from "next-sanity";

import { NAV_STRUCTURE } from "@/lib/navigation";
import PostCard from "@/components/PostCard";
import { ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import Hero from "./Hero";

interface PostProps {
  posts: SanityDocument[];
}
const Home = ({ posts }: PostProps) => {
  // const featured = posts.filter((p) => p.featured)[0] || posts[0];
  // const trending = posts
  //   .filter((p) => !featured || p.id !== featured.id)
  //   .slice(0, 6);

  return (
    <div className="">
      {/* Hero */}
      <Hero />
      {/* Module cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Explore the modules
            </h2>
            <p className="mt-1 text-gray-500">
              Jump straight into what matters to you.
            </p>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {NAV_STRUCTURE.map((section) => {
            return (
              <Link
                key={section.category}
                href={section.children[0].path}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#ED1D3E] transition-colors group-hover:bg-[#ED1D3E] group-hover:text-white">
                  {section.icon && section.icon}
                </div>
                <h3 className="mt-4 text-lg font-bold text-gray-900">
                  {section.label}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{section.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {section.children.slice(0, 3).map((c) => (
                    <span
                      key={c.subcategory}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-600"
                    >
                      {c.label}
                    </span>
                  ))}
                  {section.children.length > 3 && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-500">
                      +{section.children.length - 3}
                    </span>
                  )}
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#ED1D3E]">
                  Open{" "}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured + trending */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-[#ED1D3E]" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Trending on campus
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-16 text-center">
            <p className="text-gray-400 text-sm">
              No posts yet — check back soon!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <PostCard post={posts[0]} featured />
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.slice(1, 3).map((post, key) => (
                <PostCard key={key} post={post} featured={false} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA strip */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#ED1D3E] px-6 py-12 sm:px-12 sm:py-16 text-white">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-extrabold leading-tight">
              We hire students while they study. You could be next.
            </h2>
            <p className="mt-3 text-white/80">
              Developers, writers, PMs, designers — join a team that builds real
              products on campus.
            </p>
            <Link
              href="/campus/jobs"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-black transition-colors"
            >
              See open roles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

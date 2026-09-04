"use client";
import { type SanityDocument } from "next-sanity";
import {
  NAV_STRUCTURE,
  SUBCATEGORY_META,
  CATEGORY_META,
} from "@/lib/navigation";
import PostCard from "@/components/PostCard";
import {
  GraduationCap,
  BookOpen,
  Trophy,
  Truck,
  ChevronRight,
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ICONS = { GraduationCap, BookOpen, Trophy, Truck };

export default function Section({ posts }: { posts: SanityDocument[] }) {
  const { category, subcategory } = useParams();
  console.log("Posts: ", posts);

  const section = NAV_STRUCTURE.find((s) => s.category === category);
  const sub = SUBCATEGORY_META[subcategory];

  if (!section || !sub) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Section not found</h1>
        <Link
          href="/"
          className="mt-4 inline-block text-[#ED1D3E] font-semibold"
        >
          Back home
        </Link>
      </div>
    );
  }

  const Icon = ICONS[section.icon];

  return (
    <div className="bg-white">
      {/* Breadcrumb + hero */}
      <div className="border-b border-gray-100 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
          <nav className="flex items-center gap-1.5 text-xs font-semibold text-gray-400">
            <Link href="/" className="hover:text-[#ED1D3E]">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-600">{section.label}</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-[#ED1D3E]">{sub.label}</span>
          </nav>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#ED1D3E] text-white shadow-sm">
              {section.icon}
            </div>
            <div>
              <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ED1D3E]">
                {section.label}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
                {sub.emoji} {sub.label}
              </h1>
              <p className="mt-2 max-w-2xl text-gray-500">
                {
                  section.children.find((c) => c.subcategory === subcategory)
                    ?.desc
                }
              </p>
            </div>
          </div>

          {/* Sublink pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {section.children.map((c) => (
              <Link
                key={c.subcategory}
                href={c.path}
                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  c.subcategory === subcategory
                    ? "bg-black text-white"
                    : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-[#ED1D3E] hover:text-[#ED1D3E]"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-16 text-center">
            <p className="text-lg font-bold text-gray-700">
              No stories here yet
            </p>
            <p className="mt-1 text-sm text-gray-400">
              We&apos;re putting this section together — check back soon.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center rounded-full bg-[#ED1D3E] px-5 py-2.5 text-sm font-bold text-white"
            >
              Back to home
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} featured={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

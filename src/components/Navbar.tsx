"use client";
import React, { useState, useEffect } from "react";
import { NAV_STRUCTURE } from "@/lib/navigation";
import { Menu, X, ChevronDown, UserCircle } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300  ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm transition-transform group-hover:scale-105">
              {/* <Zap className="h-5 w-5" fill="white" /> */}
              <Logo />
            </span>
            <span className="font-heading text-xl font-extrabold tracking-tight text-black">
              Hallmarts<span className="text-[#ED1D3E]">Blog</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-[#ED1D3E] transition-colors"
            >
              Home
            </Link>
            {NAV_STRUCTURE.map((section) => (
              <div
                key={section.category}
                className="relative"
                onMouseEnter={() => setOpenMenu(section.category)}
                onMouseLeave={() => setOpenMenu("")}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors ${
                    openMenu === section.category
                      ? "text-[#ED1D3E]"
                      : "text-gray-700 hover:text-[#ED1D3E]"
                  }`}
                >
                  {section.label}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${openMenu === section.category ? "rotate-180" : ""}`}
                  />
                </button>
                {openMenu === section.category && (
                  <div className="absolute left-0 top-full pt-2 w-72">
                    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5">
                      <div className="bg-[#ED1D3E] px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-white/80">
                          {section.blurb}
                        </p>
                      </div>
                      <div className="p-2">
                        {section.children.map((child) => (
                          <Link
                            key={child.subcategory}
                            href={child.path}
                            className="block rounded-xl px-3 py-2.5 hover:bg-red-50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-bold text-gray-900">
                                {child.label}
                              </span>
                              <ChevronDown className="h-3.5 w-3.5 -rotate-90 text-gray-400" />
                            </div>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {child.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/profile"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-[#ED1D3E] hover:text-white transition-colors"
              title="Your profile"
            >
              <UserCircle className="h-5 w-5" />
            </Link>
            <Link
              href="/campus/jobs"
              className="hidden sm:inline-flex items-center rounded-full bg-black px-4 py-2 text-sm font-bold text-white hover:bg-[#ED1D3E] transition-colors"
            >
              Join the team
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-sm font-bold text-gray-900 hover:bg-red-50 rounded-lg"
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 text-sm font-bold text-gray-900 hover:bg-red-50 rounded-lg"
            >
              My Profile
            </Link>
            {NAV_STRUCTURE.map((section) => (
              <div key={section.category} className="py-1">
                <p className="px-3 pt-2 pb-1 text-xs font-bold uppercase tracking-wider text-[#ED1D3E]">
                  {section.label}
                </p>
                {section.children.map((child) => (
                  <Link
                    key={child.subcategory}
                    href={child.path}
                    className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-50 rounded-lg"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <Link
              href="/campus/jobs"
              className="mt-2 block rounded-full bg-black px-4 py-2.5 text-center text-sm font-bold text-white"
            >
              Join the team
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

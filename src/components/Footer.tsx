"use client";
import { NAV_STRUCTURE } from "@/lib/navigation";
import { Zap, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ED1D3E] text-white">
                {/* <Zap className="h-5 w-5" fill="white" /> */}
                <Logo />
              </span>
              <span className="font-heading text-xl font-extrabold tracking-tight">
                Hallmarts<span className="text-[#ED1D3E]">Blog</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/60 max-w-xs">
              The blog by campus students, for campus students. News,
              opportunities, sports and everything in between.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-[#ED1D3E] transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {NAV_STRUCTURE.map((section) => (
            <div key={section.category}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#ED1D3E]">
                {section.label}
              </h4>
              <ul className="mt-3 space-y-2">
                {section.children.map((child) => (
                  <li key={child.subcategory}>
                    <Link
                      href={child.path}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Hallmarts. Built by students, for
            students.
          </p>
          <p className="text-xs text-white/50">Made with ❤️ on campus</p>
        </div>
      </div>
    </footer>
  );
}

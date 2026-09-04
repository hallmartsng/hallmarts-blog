"use client";

import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#ED1D3E] blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#ED1D3E] blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#ED1D3E] ring-1 ring-white/20">
            <MessageCircle className="h-3.5 w-3.5" /> By students, for students
          </span>
          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold leading-[1.05] tracking-tight text-balance">
            The campus blog that <span className="text-[#ED1D3E]">moves</span>{" "}
            with you.
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-2xl">
            News, podcasts, jobs, scholarships, tournaments and a student-run
            store — all in one place. Everything campus, nothing boring.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/campus/podcast"
              className="inline-flex items-center gap-2 rounded-full bg-[#ED1D3E] px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity"
            >
              Explore the blog <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/campus/jobs"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-bold text-white ring-1 ring-white/20 hover:bg-white/20 transition-colors"
            >
              Find opportunities
            </Link>
          </div>
        </div>
        {/* <div className="max-w-3xl ">
          <div className="absolute w-full top-0 left  flex justify-start items-start h-full">
            <Image
              src={"/images/blog.png"}
              width={860}
              height={560}
              alt="Hallmarts logo"
              className="object-fill -ml-52"
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;

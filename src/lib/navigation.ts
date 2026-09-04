import {
  GraduationCap,
  BookOpen,
  Trophy,
  Truck,
  ArrowRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { createElement } from "react";

type NavStructureType = {
  label: string;
  category: string;
  icon: React.ReactElement;
  color: string;
  blurb: string;
  children: {
    label: string;
    subcategory: string;
    path: string;
    desc: string;
  }[];
};

export const NAV_STRUCTURE: NavStructureType[] = [
  {
    label: "Campus",
    category: "campus",
    icon: createElement(GraduationCap),
    color: "#ED1D3E",
    blurb: "The pulse of campus life",
    children: [
      {
        label: "Podcast",
        subcategory: "podcast",
        path: "/campus/podcast",
        desc: "News, trends & relatable campus talk",
      },
      {
        label: "Market",
        subcategory: "market",
        path: "/campus/market",
        desc: "The campus online store for students",
      },
      {
        label: "Jobs & Talents",
        subcategory: "jobs",
        path: "/campus/jobs",
        desc: "Vacancies for devs, writers, PMs & designers",
      },
      {
        label: "Partnership & Investment",
        subcategory: "partnership",
        path: "/campus/partnership",
        desc: "How we secure partnerships & shares for students",
      },
      {
        label: "Events",
        subcategory: "events",
        path: "/campus/events",
        desc: "Every event happening on campus",
      },
    ],
  },
  {
    label: "Education",
    category: "education",
    icon: createElement(BookOpen),
    color: "#ED1D3E",
    blurb: "Learn, earn & grow on the go",
    children: [
      {
        label: "Scholarship Programs",
        subcategory: "scholarship",
        path: "/education/scholarship",
        desc: "Programs for students we've trained",
      },
      {
        label: "Digital Marketing",
        subcategory: "digital-marketing",
        path: "/education/digital-marketing",
        desc: "Marketing at campus level, not after a degree",
      },
      {
        label: "Campus Programs",
        subcategory: "campus-programs",
        path: "/education/campus-programs",
        desc: "Programs like TEDx and masterclasses",
      },
    ],
  },
  {
    label: "Sport",
    category: "sport",
    icon: createElement(Trophy),
    color: "#ED1D3E",
    blurb: "Play hard, stay eligible",
    children: [
      {
        label: "Tournaments",
        subcategory: "tournaments",
        path: "/sport/tournaments",
        desc: "Inter-campus football, basketball & more",
      },
    ],
  },
  {
    label: "Logistics",
    category: "logistics",
    icon: createElement(Truck),
    color: "#ED1D3E",
    blurb: "Student-powered delivery",
    children: [
      {
        label: "Student Logistics",
        subcategory: "student-logistics",
        path: "/logistics/student-logistics",
        desc: "Our student-based delivery platform",
      },
    ],
  },
];

export const CATEGORY_META = {
  campus: {
    label: "Campus",
    color: "#ED1D3E",
    icon: createElement(GraduationCap),
  },
  education: {
    label: "Education",
    color: "#ED1D3E",
    icon: createElement(BookOpen),
  },
  sport: { label: "Sport", color: "#ED1D3E", icon: createElement(Trophy) },
  logistics: {
    label: "Logistics",
    color: "#ED1D3E",
    icon: createElement(Truck),
  },
};

export const SUBCATEGORY_META = {
  podcast: { label: "Podcast", emoji: "🎙️" },
  market: { label: "Market", emoji: "🛍️" },
  jobs: { label: "Jobs & Talents", emoji: "💼" },
  partnership: { label: "Partnership & Investment", emoji: "🤝" },
  events: { label: "Events", emoji: "🎉" },
  scholarship: { label: "Scholarship Programs", emoji: "🎓" },
  "digital-marketing": { label: "Digital Marketing", emoji: "📈" },
  "campus-programs": { label: "Campus Programs", emoji: "🌟" },
  tournaments: { label: "Tournaments", emoji: "🏆" },
  "student-logistics": { label: "Student Logistics", emoji: "🚚" },
};

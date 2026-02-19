"use client";

import Link from "next/link";
import { useThemeLocale } from "@/context/ThemeLocale";
import type { PostMeta } from "@/lib/posts";

function formatDate(dateStr: string, lang: "en" | "fa") {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString(
    lang === "fa" ? "fa-IR" : "en-US",
    { year: "numeric", month: "short", day: "numeric" }
  );
}

export default function PostCard({ post }: { post: PostMeta }) {
  const { locale, mounted } = useThemeLocale();

  // Before mount, default to English to match the server-rendered HTML.
  // After mount, always show the current locale (posts are pre-filtered
  // by the server to only include those with the current locale's file).
  const displayLang = !mounted ? "en" : locale;
  const display = post.langs[displayLang] ?? post.langs.en ?? post.langs.fa!;

  // Persian listing links go to /fa route (post is guaranteed to have fa.md
  // because it passed the getAllPosts(locale) filter).
  // English listing links go to the canonical /blog/[slug] route.
  const href =
    mounted && locale === "fa"
      ? `/blog/${post.slug}/fa`
      : `/blog/${post.slug}`;

  return (
    <article className="group py-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <Link href={href} className="block">
        <div className="flex items-center gap-2 mb-2">
          <time className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
            {formatDate(post.date, displayLang)}
          </time>
        </div>

        <h2 className="text-base font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
          {display.title}
        </h2>

        {display.summary && (
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2">
            {display.summary}
          </p>
        )}

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3" dir="ltr">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}

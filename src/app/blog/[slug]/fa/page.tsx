import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, SITE_URL } from "@/lib/posts";
import { t } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

// Only generate routes for slugs that actually have a fa.md file
export async function generateStaticParams() {
  return getAllPosts()
    .filter((post) => !!post.langs.fa)
    .map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "fa");
  if (!post) return {};

  const hasEnVersion = post.availableLangs.includes("en");

  const metadata: Metadata = {
    title: `${post.title} — ${t.fa.siteName}`,
    description: post.summary,
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}/fa`,
    },
  };

  if (hasEnVersion) {
    metadata.alternates!.languages = {
      en: `${SITE_URL}/blog/${slug}`,
      fa: `${SITE_URL}/blog/${slug}/fa`,
      "x-default": `${SITE_URL}/blog/${slug}`,
    };
  }

  return metadata;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function FaPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, "fa");

  if (!post) notFound();

  const hasEnVersion = post.availableLangs.includes("en");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Back link — dir=ltr keeps the arrow stable */}
      <Link
        href="/blog"
        dir="ltr"
        className="text-sm text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] transition-colors mb-10 inline-block"
      >
        {t.fa.blog.backToBlog}
      </Link>

      {/* Language switcher — only shown when English version also exists */}
      {hasEnVersion && (
        <div className="flex items-center gap-2 mb-10 ms-4 inline-flex" dir="ltr">
          <Link
            href={`/blog/${slug}`}
            className="text-xs px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
          >
            EN
          </Link>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium">
            FA
          </span>
        </div>
      )}

      <article dir="rtl">
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <time className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              {formatDate(post.date)}
            </time>
          </div>

          <h1 className="text-2xl font-bold tracking-tight leading-snug mb-4">
            {post.title}
          </h1>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
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
        </header>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </div>
  );
}

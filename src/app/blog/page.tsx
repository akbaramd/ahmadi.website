import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import PostCard from "@/components/PostCard";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tr = t[locale];
  return {
    title: `${tr.blog.title} — ${tr.siteName}`,
    description: tr.blog.description,
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const tr = t[locale];
  // Only show posts that have a file for the current locale
  const posts = getAllPosts(locale);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight mb-1">{tr.blog.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        {tr.blog.postCount(posts.length)}
      </p>

      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{tr.blog.noPosts}</p>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

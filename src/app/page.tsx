import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/projects";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import PostCard from "@/components/PostCard";
import ProjectCard from "@/components/ProjectCard";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tr = t[locale];
  return {
    title: tr.siteName,
    description: tr.siteDescription,
  };
}

export default async function Home() {
  const locale = await getLocale();
  const tr = t[locale];

  // Only show posts that have a file for the current locale
  const recentPosts = getAllPosts(locale).slice(0, 3);
  const featuredProjects = getAllProjects(locale).slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-20">
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-3 tracking-wide uppercase">
          {tr.home.greeting}
        </p>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {tr.home.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
          {tr.home.bio}
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link
            href="/blog"
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            {tr.home.readBlog}
          </Link>
          <Link
            href="/portfolio"
            className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline"
          >
            {tr.home.viewWork}
          </Link>
        </div>
      </section>

      {/* Recent Posts */}
      {recentPosts.length > 0 && (
        <section className="mb-20">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {tr.home.recentPosts}
            </h2>
            <Link
              href="/blog"
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] transition-colors"
            >
              {tr.home.allPosts}
            </Link>
          </div>
          <div>
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {tr.home.projects}
            </h2>
            <Link
              href="/portfolio"
              className="text-xs text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] transition-colors"
            >
              {tr.home.allProjects}
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

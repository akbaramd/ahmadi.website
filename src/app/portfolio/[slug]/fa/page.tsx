import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug, SITE_URL } from "@/lib/projects";
import { t } from "@/lib/i18n";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects()
    .filter((p) => !!p.langs.fa)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, "fa");
  if (!project) return {};

  const hasEnVersion = project.availableLangs.includes("en");

  const metadata: Metadata = {
    title: `${project.title} — ${t.fa.siteName}`,
    description: project.summary,
    alternates: {
      canonical: `${SITE_URL}/portfolio/${slug}/fa`,
    },
  };

  if (hasEnVersion) {
    metadata.alternates!.languages = {
      en: `${SITE_URL}/portfolio/${slug}`,
      fa: `${SITE_URL}/portfolio/${slug}/fa`,
      "x-default": `${SITE_URL}/portfolio/${slug}`,
    };
  }

  return metadata;
}

export default async function ProjectPageFa({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug, "fa");

  if (!project) notFound();

  const hasEnVersion = project.availableLangs.includes("en");

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link
        href="/portfolio"
        dir="ltr"
        className="text-sm text-gray-400 dark:text-gray-500 hover:text-[var(--foreground)] transition-colors mb-10 inline-block"
      >
        {t.fa.portfolio.backToPortfolio}
      </Link>

      {hasEnVersion && (
        <div className="flex items-center gap-2 mb-10 ms-4 inline-flex" dir="ltr">
          <Link
            href={`/portfolio/${slug}`}
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
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
              {project.year}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight leading-snug mb-4">
            {project.title}
          </h1>

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {(project.github || project.demo) && (
            <div className="flex items-center gap-4 mt-4" dir="ltr">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.fa.portfolio.github}
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:underline"
                >
                  {t.fa.portfolio.liveDemo}
                </a>
              )}
            </div>
          )}
        </header>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: project.contentHtml }}
        />
      </article>
    </div>
  );
}

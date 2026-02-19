import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import ProjectCard from "@/components/ProjectCard";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tr = t[locale];
  return {
    title: `${tr.portfolio.title} — ${tr.siteName}`,
    description: tr.portfolio.description,
  };
}

export default async function PortfolioPage() {
  const locale = await getLocale();
  const tr = t[locale];
  const projects = getAllProjects(locale);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight mb-1">
        {tr.portfolio.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        {tr.portfolio.projectCount(projects.length)}
      </p>

      {projects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">{tr.portfolio.noProjects}</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

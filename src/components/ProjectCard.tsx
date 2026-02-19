import Link from "next/link";
import { t, type Locale } from "@/lib/i18n";
import type { ProjectMeta } from "@/lib/projects";

interface Props {
  project: ProjectMeta;
  locale: Locale;
}

export default function ProjectCard({ project, locale }: Props) {
  const tr = t[locale].portfolio;
  const display = project.langs[locale] ?? project.langs.en ?? project.langs.fa!;
  const href =
    locale === "fa"
      ? `/portfolio/${project.slug}/fa`
      : `/portfolio/${project.slug}`;

  return (
    <Link
      href={href}
      className="group block p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors bg-gray-50/50 dark:bg-gray-900/50"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <h3 className="font-semibold text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {display?.title}
        </h3>
        <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums shrink-0">
          {project.year}
        </span>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
        {display?.summary}
      </p>

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

      <div className="flex items-center gap-3 text-xs font-medium" dir="ltr">
        {project.github && (
          <span className="text-blue-600 dark:text-blue-400">{tr.github}</span>
        )}
        {project.demo && (
          <span className="text-gray-500 dark:text-gray-400">{tr.liveDemo}</span>
        )}
      </div>
    </Link>
  );
}

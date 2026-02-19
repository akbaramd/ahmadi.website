import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { getAbout } from "@/lib/about";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tr = t[locale];
  return {
    title: `${tr.about.title} — ${tr.siteName}`,
    description: tr.about.description,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const tr = t[locale];
  const about = await getAbout(locale);

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight mb-10">{tr.about.title}</h1>

      {/* Bio — rendered from markdown */}
      {about && (
        <section className="mb-12">
          <div
            className="prose"
            dir={locale === "fa" ? "rtl" : "ltr"}
            dangerouslySetInnerHTML={{ __html: about.contentHtml }}
          />

          {/* Resume download */}
          <div className="mt-8">
            <a
              href="/akbar-ahmadi-resume.pdf"
              download="Akbar-Ahmadi-Saray-Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {tr.about.downloadResume}
            </a>
          </div>
        </section>
      )}

      {/* Skills — from markdown frontmatter */}
      {about && about.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
            {tr.about.skills}
          </h2>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400"
                dir="ltr"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Links */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
          {tr.about.findMe}
        </h2>
        <ul className="space-y-2" dir="ltr">
          <li>
            <a
              href="mailto:me.akbarahmadi@gmail.com"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              me.akbarahmadi@gmail.com
            </a>
          </li>
          <li>
            <a
              href="https://github.com/akbaramd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              github.com/akbaramd
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/akbar-ahmadi-saray-5a5b9016b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              linkedin.com/in/akbar-ahmadi-saray
            </a>
          </li>
          <li>
            <a
              href="https://t.me/akbaramd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              t.me/akbaramd
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/akbaar.ahmaadi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              instagram.com/akbaar.ahmaadi
            </a>
          </li>
          <li>
            <a
              href="https://www.akbar-ahmadi.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              akbar-ahmadi.ir
            </a>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {tr.nav.blog}
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmadi.blog";

const projectsDir = path.join(process.cwd(), "src/content/projects");

export interface ProjectLangData {
  title: string;
  summary: string;
}

export interface ProjectMeta {
  slug: string;
  year: number;
  tags: string[];
  github?: string;
  demo?: string;
  order: number;
  langs: {
    en?: ProjectLangData;
    fa?: ProjectLangData;
  };
}

export interface Project {
  slug: string;
  lang: "en" | "fa";
  title: string;
  year: number;
  tags: string[];
  summary: string;
  github?: string;
  demo?: string;
  contentHtml: string;
  availableLangs: Array<"en" | "fa">;
}

export function getAllProjects(locale?: "en" | "fa"): ProjectMeta[] {
  if (!fs.existsSync(projectsDir)) return [];

  const entries = fs.readdirSync(projectsDir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  const projects = dirs
    .map((dir) => {
      const slug = dir.name;
      const langs: ProjectMeta["langs"] = {};
      let year = new Date().getFullYear();
      let tags: string[] = [];
      let github: string | undefined;
      let demo: string | undefined;
      let order = 999;

      for (const lang of ["en", "fa"] as const) {
        const filePath = path.join(projectsDir, slug, `${lang}.md`);
        if (!fs.existsSync(filePath)) continue;

        const raw = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(raw);

        langs[lang] = {
          title: data.title ?? slug,
          summary: data.summary ?? "",
        };

        // Shared metadata is taken from en.md when available
        if (lang === "en" || !langs.en) {
          year = data.year ?? year;
          tags = data.tags ?? tags;
          github = data.github ?? github;
          demo = data.demo ?? demo;
          order = data.order ?? order;
        }
      }

      // Both language files required (drafts with only one are excluded)
      if (!langs.en || !langs.fa) return null;
      return { slug, year, tags, github, demo, order, langs };
    })
    .filter((p) => p !== null)
    .sort((a, b) => (a!.order - b!.order)) as ProjectMeta[];

  return locale ? projects.filter((p) => !!p.langs[locale]) : projects;
}

export async function getProjectBySlug(
  slug: string,
  lang: "en" | "fa"
): Promise<Project | null> {
  const filePath = path.join(projectsDir, slug, `${lang}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  const availableLangs: Array<"en" | "fa"> = [];
  for (const l of ["en", "fa"] as const) {
    if (fs.existsSync(path.join(projectsDir, slug, `${l}.md`))) {
      availableLangs.push(l);
    }
  }

  return {
    slug,
    lang,
    title: data.title ?? slug,
    year: data.year ?? new Date().getFullYear(),
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    github: data.github,
    demo: data.demo,
    contentHtml: processed.toString(),
    availableLangs,
  };
}

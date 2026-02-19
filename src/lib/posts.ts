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

const postsDir = path.join(process.cwd(), "src/content/posts");

export interface PostLangData {
  title: string;
  summary: string;
}

/**
 * Metadata for a post slug. A single slug can have an English version,
 * a Persian version, or both. The `langs` object holds per-language
 * title and summary data for use in listing UIs.
 */
export interface PostMeta {
  slug: string;
  date: string;
  tags: string[];
  langs: {
    en?: PostLangData;
    fa?: PostLangData;
  };
}

/** Full post data including rendered HTML, returned by getPostBySlug. */
export interface Post {
  slug: string;
  lang: "en" | "fa";
  title: string;
  date: string;
  tags: string[];
  summary: string;
  contentHtml: string;
  availableLangs: Array<"en" | "fa">;
}

/**
 * Scans the posts directory for subdirectories. Each subdirectory is a slug.
 * Inside it, en.md and fa.md provide language variants.
 *
 * A post is only returned when BOTH en.md AND fa.md are present.
 * A folder with only one language file is treated as a draft and excluded.
 *
 * Pass a `locale` to filter the returned list to posts available in that
 * language (useful for locale-specific listing pages).
 */
export function getAllPosts(locale?: "en" | "fa"): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];

  const entries = fs.readdirSync(postsDir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  const posts: PostMeta[] = dirs
    .map((dir) => {
      const slug = dir.name;
      const langs: PostMeta["langs"] = {};
      let date = "";
      let tags: string[] = [];

      for (const lang of ["en", "fa"] as const) {
        const filePath = path.join(postsDir, slug, `${lang}.md`);
        if (!fs.existsSync(filePath)) continue;

        const raw = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(raw);

        langs[lang] = {
          title: data.title ?? slug,
          summary: data.summary ?? "",
        };

        // Prefer English for shared metadata (date/tags)
        if (!date || lang === "en") {
          date = data.date ?? "";
          tags = data.tags ?? [];
        }
      }

      // Require both language files — single-language folders are drafts
      if (!langs.en || !langs.fa) return null;
      return { slug, date, tags, langs };
    })
    .filter((p): p is PostMeta => p !== null);

  const sorted = posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  // When a locale is requested, filter to posts that have that language's file
  return locale ? sorted.filter((p) => !!p.langs[locale]) : sorted;
}

/**
 * Loads and renders a single post in the specified language.
 * Returns null when that language file does not exist for the slug.
 */
export async function getPostBySlug(
  slug: string,
  lang: "en" | "fa"
): Promise<Post | null> {
  const filePath = path.join(postsDir, slug, `${lang}.md`);
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
    if (fs.existsSync(path.join(postsDir, slug, `${l}.md`))) {
      availableLangs.push(l);
    }
  }

  return {
    slug,
    lang,
    title: data.title ?? slug,
    date: data.date ?? "",
    tags: data.tags ?? [],
    summary: data.summary ?? "",
    contentHtml: processed.toString(),
    availableLangs,
  };
}

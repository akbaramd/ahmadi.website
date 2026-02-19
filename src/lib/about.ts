import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

const aboutDir = path.join(process.cwd(), "src/content/about");

export interface About {
  lang: "en" | "fa";
  skills: string[];
  contentHtml: string;
}

export async function getAbout(lang: "en" | "fa"): Promise<About | null> {
  const filePath = path.join(aboutDir, `${lang}.md`);
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

  return {
    lang,
    skills: Array.isArray(data.skills) ? data.skills : [],
    contentHtml: processed.toString(),
  };
}

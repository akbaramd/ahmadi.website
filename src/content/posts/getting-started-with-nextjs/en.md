---
title: "Getting Started with Next.js 15"
date: "2026-02-19"
tags: ["nextjs", "react", "typescript"]
summary: "A practical introduction to building modern web applications with Next.js 15 and the App Router."
---

## Why Next.js?

Next.js gives you server-side rendering, static generation, and a file-based router out of the box — without any configuration. Version 15 brings the App Router to full maturity with React Server Components, streaming, and built-in caching.

## Project Structure

A typical Next.js 15 project looks like this:

```
src/
└── app/
    ├── layout.tsx    # Root layout, wraps every page
    ├── page.tsx      # The "/" route
    └── blog/
        ├── page.tsx          # "/blog"
        └── [slug]/
            └── page.tsx      # "/blog/:slug"
```

## Creating Your First Page

Every file named `page.tsx` inside `app/` becomes a route automatically:

```tsx
// src/app/about/page.tsx
export default function About() {
  return <h1>About Me</h1>;
}
```

Visit `/about` and you'll see it rendered.

## Server vs Client Components

By default every component is a **Server Component** — it runs on the server and sends plain HTML to the browser. Add `"use client"` at the top only when you need interactivity (state, event handlers, browser APIs).

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## Data Fetching

Fetch data directly inside any Server Component using the native `fetch` API — no `useEffect` needed:

```tsx
async function getPosts() {
  const res = await fetch("https://api.example.com/posts");
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

## What's Next?

- Explore [Next.js documentation](https://nextjs.org/docs)
- Try deploying to [Vercel](https://vercel.com) with a single `git push`
- Read about [React Server Components](https://react.dev/reference/rsc/server-components)

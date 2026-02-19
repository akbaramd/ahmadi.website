---
title: "شروع با Next.js 15"
date: "2026-02-19"
tags: ["nextjs", "react", "typescript"]
summary: "یک معرفی عملی برای ساختن وب‌اپلیکیشن‌های مدرن با Next.js 15 و App Router."
---

## چرا Next.js؟

Next.js به شما رندر سمت سرور، تولید استاتیک و یک روتر مبتنی بر فایل را بدون هیچ پیکربندی‌ای می‌دهد. نسخه ۱۵ App Router را با React Server Components، استریمینگ و کش‌گذاری توکار به بلوغ کامل رساند.

## ساختار پروژه

یک پروژه معمولی Next.js 15 اینگونه به نظر می‌رسد:

```
src/
└── app/
    ├── layout.tsx    # لایه‌بندی ریشه، هر صفحه را می‌پوشاند
    ├── page.tsx      # مسیر "/"
    └── blog/
        ├── page.tsx          # "/blog"
        └── [slug]/
            └── page.tsx      # "/blog/:slug"
```

## ساختن اولین صفحه

هر فایل به نام `page.tsx` داخل `app/` به طور خودکار به یک مسیر تبدیل می‌شود:

```tsx
// src/app/about/page.tsx
export default function About() {
  return <h1>درباره من</h1>;
}
```

به `/about` بروید و آن را رندر شده خواهید دید.

## کامپوننت‌های سرور در مقابل کلاینت

به طور پیش‌فرض هر کامپوننت یک **کامپوننت سرور** است — روی سرور اجرا می‌شود و HTML ساده را به مرورگر می‌فرستد. فقط زمانی که به تعامل (وضعیت، مدیریت رویداد، API‌های مرورگر) نیاز دارید `"use client"` را اضافه کنید.

```tsx
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

## دریافت داده

داده را مستقیماً داخل هر کامپوننت سرور با استفاده از API بومی `fetch` دریافت کنید — نیازی به `useEffect` نیست:

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

## قدم‌های بعدی

- [مستندات Next.js](https://nextjs.org/docs) را مطالعه کنید
- با یک `git push` روی [Vercel](https://vercel.com) دیپلوی کنید
- درباره [React Server Components](https://react.dev/reference/rsc/server-components) بخوانید

---
title: "شروع با TypeScript"
date: "2026-02-10"
tags: ["typescript", "javascript", "برنامه‌نویسی"]
summary: "TypeScript یک ابزار قدرتمند برای نوشتن کدهای جاوااسکریپت با تایپ ایمن است. در این پست با مفاهیم پایه آشنا می‌شویم."
---

## TypeScript چیست؟

TypeScript یک زبان برنامه‌نویسی است که روی جاوااسکریپت ساخته شده. مهم‌ترین ویژگی آن **تایپ ایستا** است — یعنی نوع متغیرها در زمان کامپایل بررسی می‌شود نه در زمان اجرا.

## چرا TypeScript؟

- **خطاهای زودتر کشف می‌شوند** — قبل از اجرای برنامه
- **تکمیل خودکار بهتر** در ویرایشگرهای کد مثل VS Code
- **کد خواناتر** برای تیم‌های بزرگ‌تر
- **ریفکتور امن‌تر** — وقتی نام یک تابع را تغییر می‌دهید، کامپایلر همه جاهایی که استفاده شده را پیدا می‌کند

## نصب

```bash
npm install -D typescript
npx tsc --init
```

## تایپ‌های پایه

```typescript
// تایپ‌های اولیه
let name: string = "احمدی";
let age: number = 25;
let isActive: boolean = true;

// آرایه
let tags: string[] = ["typescript", "javascript"];

// شیء با interface
interface User {
  id: number;
  name: string;
  email?: string; // اختیاری
}

const user: User = {
  id: 1,
  name: "علی احمدی",
};
```

## توابع با تایپ

```typescript
function add(a: number, b: number): number {
  return a + b;
}

// تابع Arrow
const greet = (name: string): string => {
  return `سلام، ${name}!`;
};
```

## Union Types

گاهی یک متغیر می‌تواند چند نوع مختلف داشته باشد:

```typescript
let id: string | number;

id = 123;      // درست
id = "abc-1";  // درست
id = true;     // خطا!
```

## Generic Types

```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNumber = getFirst([1, 2, 3]);   // نوع: number
const firstString = getFirst(["a", "b"]);  // نوع: string
```

## قدم بعدی

- [مستندات رسمی TypeScript](https://www.typescriptlang.org/docs/)
- تمرین با پروژه‌های کوچک
- یاد گرفتن `utility types` مثل `Partial`, `Pick`, `Omit`

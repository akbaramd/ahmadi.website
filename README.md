# Ahmadi Blog

A Next.js blog project with Tailwind CSS, built with the latest versions.

## Tech Stack

- **Next.js 15** – React framework with App Router
- **Tailwind CSS 4** – Utility-first CSS framework
- **TypeScript** – Type safety
- **ESLint** – Code linting
- **Poppins** – LTR (Latin) font via Google Fonts
- **Vazirmatn** – RTL (Persian/Arabic) font

## Getting Started

### Prerequisites

- Node.js 20.9 or higher
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start (Production)

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
ahmadi.blog/
├── src/
│   └── app/
│       ├── globals.css    # Global styles + Tailwind
│       ├── layout.tsx     # Root layout
│       └── page.tsx       # Home page
├── public/                # Static assets
├── next.config.ts
├── postcss.config.mjs     # PostCSS (Tailwind 4)
└── tsconfig.json
```

## Fonts (LTR / RTL)

- **LTR** (left-to-right): Uses **Poppins** for English and Latin content
- **RTL** (right-to-left): Uses **Vazirmatn** for Persian/Arabic content

To switch to RTL (e.g., for Persian pages), set `dir="rtl"` on the `<html>` element in `src/app/layout.tsx`, or use it per-page with a wrapper:

```tsx
<div dir="rtl" className="font-[family-name:var(--font-vazirmatn)]">
  محتوای فارسی
</div>
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vazirmatn Font](https://github.com/rastikerdar/vazirmatn)

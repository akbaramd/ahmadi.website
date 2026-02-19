"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeLocale } from "@/context/ThemeLocale";
import { t } from "@/lib/i18n";

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

const controlBtn =
  "flex items-center justify-center rounded-md border border-gray-200 dark:border-gray-700 " +
  "bg-transparent text-gray-500 dark:text-gray-400 " +
  "hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-[var(--foreground)] " +
  "transition-colors";

export default function Header() {
  const pathname = usePathname();
  const { theme, locale, mounted, toggleTheme, setLocale } = useThemeLocale();
  const tr = t[mounted ? locale : "en"];

  const navLinks = [
    { href: "/blog", label: tr.nav.blog },
    { href: "/portfolio", label: tr.nav.portfolio },
    { href: "/about", label: tr.nav.about },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-[var(--background)]/90 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between gap-4">

        {/* Brand */}
        <Link
          href="/"
          className="font-semibold text-sm tracking-tight hover:opacity-70 transition-opacity shrink-0"
        >
          {tr.siteName}
        </Link>

        {/* Nav — hidden on very small screens */}
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-6">
            {navLinks.map(({ href, label }) => {
              const isActive =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-sm transition-colors ${
                      isActive
                        ? "text-[var(--foreground)] font-medium"
                        : "text-gray-500 dark:text-gray-400 hover:text-[var(--foreground)]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Locale toggle — shows the language you'll switch TO */}
          <button
            onClick={() => setLocale(locale === "en" ? "fa" : "en")}
            className={`${controlBtn} h-8 px-2.5 text-xs font-medium tabular-nums`}
            aria-label={
              !mounted
                ? "Switch language"
                : locale === "en"
                ? "Switch to Persian / فارسی"
                : "Switch to English"
            }
          >
            {!mounted ? "··" : locale === "en" ? "فا" : "EN"}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`${controlBtn} h-8 w-8`}
            aria-label={
              !mounted
                ? "Toggle theme"
                : theme === "dark"
                ? "Switch to light mode"
                : "Switch to dark mode"
            }
          >
            {!mounted ? (
              <span className="w-[15px] h-[15px] rounded-full border border-current opacity-40" />
            ) : theme === "dark" ? (
              <SunIcon />
            ) : (
              <MoonIcon />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}

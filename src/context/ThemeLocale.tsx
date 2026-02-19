"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";

export type Theme = "light" | "dark";
export type Locale = "en" | "fa";

interface ThemeLocaleContextType {
  theme: Theme;
  locale: Locale;
  mounted: boolean;
  toggleTheme: () => void;
  setLocale: (locale: Locale) => void;
}

const ThemeLocaleContext = createContext<ThemeLocaleContextType>({
  theme: "light",
  locale: "en",
  mounted: false,
  toggleTheme: () => {},
  setLocale: () => {},
});

export function ThemeLocaleProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [locale, setLocaleState] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Sync React state from whatever the no-flash script already painted on <html>
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const lang = document.documentElement.getAttribute("lang");
    setTheme(isDark ? "dark" : "light");
    setLocaleState(lang === "fa" ? "fa" : "en");
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    const dir = next === "fa" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", next);
    document.documentElement.setAttribute("dir", dir);
    try {
      localStorage.setItem("locale", next);
      // Mirror to cookie so Server Components see the new locale on their next render
      document.cookie = `locale=${next}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}

    // On content detail pages (blog posts, portfolio projects), the language
    // is coupled to the URL (/[section]/[slug] = EN, /[section]/[slug]/fa = FA).
    // Navigate to the matching language URL so content also switches.
    const detailMatch = pathname.match(/^\/(blog|portfolio)\/([^/]+)(\/fa)?$/);
    if (detailMatch) {
      const section = detailMatch[1];
      const slug = detailMatch[2];
      const isCurrentlyFa = !!detailMatch[3];
      if (next === "fa" && !isCurrentlyFa) {
        router.push(`/${section}/${slug}/fa`);
        return;
      }
      if (next === "en" && isCurrentlyFa) {
        router.push(`/${section}/${slug}`);
        return;
      }
      // Already on the correct language URL — just refresh to pick up cookie
      router.refresh();
      return;
    }

    // On any other page, re-render Server Components with the new locale cookie
    router.refresh();
  };

  return (
    <ThemeLocaleContext.Provider
      value={{ theme, locale, mounted, toggleTheme, setLocale }}
    >
      {children}
    </ThemeLocaleContext.Provider>
  );
}

export function useThemeLocale() {
  return useContext(ThemeLocaleContext);
}

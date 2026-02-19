"use client";

import { useThemeLocale } from "@/context/ThemeLocale";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { locale, mounted } = useThemeLocale();
  const tr = t[mounted ? locale : "en"];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span>{tr.footer.copyright(year)}</span>
        <div className="flex items-center gap-4" dir="ltr">
          <a
            href="https://github.com/akbaramd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/akbar-ahmadi-saray-5a5b9016b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://t.me/akbaramd"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Telegram
          </a>
          <a
            href="mailto:me.akbarahmadi@gmail.com"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

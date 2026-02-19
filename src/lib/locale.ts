import { cookies } from "next/headers";
import type { Locale } from "@/lib/i18n";

/**
 * Reads the current locale from the request cookie.
 * Falls back to "en" when no cookie is present (first visit or SSR default).
 * This function is only valid inside Server Components and route handlers.
 */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get("locale")?.value === "fa" ? "fa" : "en";
}

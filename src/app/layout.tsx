import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ThemeLocaleProvider } from "@/context/ThemeLocale";

const poppins = localFont({
  src: [
    { path: "../fonts/Poppins/Poppins-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Poppins/Poppins-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Poppins/Poppins-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Poppins/Poppins-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Poppins/Poppins-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
});

const vazirmatn = localFont({
  src: [
    { path: "../fonts/Vazirmatn/static/Vazirmatn-Light.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Vazirmatn/static/Vazirmatn-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Vazirmatn/static/Vazirmatn-Medium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Vazirmatn/static/Vazirmatn-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/Vazirmatn/static/Vazirmatn-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-vazirmatn",
});

// Runs synchronously before first paint — prevents theme/locale flash.
// Also mirrors locale to a cookie so Server Components see it on the next request.
const noFlashScript = `(function(){try{
  var t=localStorage.getItem("theme");
  var sd=window.matchMedia("(prefers-color-scheme: dark)").matches;
  if(t==="dark"||(t===null&&sd))document.documentElement.classList.add("dark");
  var l=localStorage.getItem("locale");
  if(l==="fa"){
    document.documentElement.setAttribute("lang","fa");
    document.documentElement.setAttribute("dir","rtl");
    document.cookie="locale=fa; path=/; max-age=31536000; SameSite=Lax";
  }
}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Akbar Ahmadi Saray",
  description:
    "Senior Software Developer with 10+ years of experience building scalable, secure systems. Writing about architecture, backend engineering, and software craftsmanship.",
  authors: [{ name: "Akbar Ahmadi Saray", url: "https://www.akbar-ahmadi.ir" }],
  creator: "Akbar Ahmadi Saray",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the no-flash script mutates lang/dir/class before
    // React hydrates, so attribute mismatches are expected and safe to suppress.
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${poppins.variable} ${vazirmatn.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="antialiased font-sans">
        <ThemeLocaleProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeLocaleProvider>
      </body>
    </html>
  );
}

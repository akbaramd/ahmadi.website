export type Locale = "en" | "fa";

export const t = {
  en: {
    siteName: "Akbar Ahmadi Saray",
    siteDescription:
      "Senior Software Developer with 10+ years of experience building scalable, secure systems. Writing about architecture, backend engineering, and software craftsmanship.",

    nav: {
      blog: "Blog",
      portfolio: "Portfolio",
      about: "About",
    },

    home: {
      greeting: "Hello, I'm",
      name: "Akbar Ahmadi Saray",
      bio: "Senior Software Developer with 10+ years of experience designing and building scalable, secure systems. Specialized in backend architecture, .NET, Node.js, and modern design patterns like DDD, CQRS, and Modular Monolith.",
      readBlog: "Read the blog →",
      viewWork: "View my work →",
      recentPosts: "Recent Posts",
      allPosts: "All posts →",
      projects: "Projects",
      allProjects: "All projects →",
    },

    blog: {
      title: "Blog",
      description:
        "Articles on software architecture, backend engineering, and web development — in English and Persian.",
      postCount: (n: number) => `${n} post${n !== 1 ? "s" : ""}`,
      noPosts: "No posts yet.",
      backToBlog: "← Back to blog",
    },

    portfolio: {
      title: "Portfolio",
      description: "Selected projects I've designed, built, and shipped.",
      projectCount: (n: number) => `${n} project${n !== 1 ? "s" : ""}`,
      noProjects: "No projects yet.",
      liveDemo: "Live Demo →",
      github: "GitHub →",
      backToPortfolio: "← Back to portfolio",
    },

    about: {
      title: "About",
      description:
        "Senior Software Developer specializing in scalable backend systems, software architecture, and .NET / Node.js engineering.",
      bio: [
        "Hi, I'm Akbar Ahmadi Saray — a Senior Software Developer with over 10 years of experience designing and building scalable, secure systems. I specialize in backend architecture, .NET Core, Node.js, and modern patterns like DDD, CQRS, and Modular Monolith.",
        "I've worked with international teams — including on projects in Istanbul, Turkey — and led full development cycles from analysis to deployment. I've built mission-critical enterprise portals serving 20,000+ active users and published open-source libraries used by other developers.",
        "Outside work, I share what I learn through this blog in both English and Persian, contribute to open-source (Bonyan, Enter.UI), and presented research at the ITNAF international IT conference in 2024.",
      ],
      skills: "Skills",
      findMe: "Find me",
      downloadResume: "Download Resume",
      location: "Urmia, West Azerbaijan, Iran",
    },

    footer: {
      copyright: (year: number) => `© ${year} Akbar Ahmadi Saray`,
    },

    post: {
      readInEnglish: "Read in English",
      readInPersian: "بخوانید به فارسی",
      availableIn: "Also available in",
    },
  },

  fa: {
    siteName: "اکبر احمدی سرای",
    siteDescription:
      "توسعه‌دهنده ارشد نرم‌افزار با بیش از ۱۰ سال تجربه در طراحی سیستم‌های مقیاس‌پذیر و امن. درباره معماری نرم‌افزار، بکند و مهندسی نرم‌افزار می‌نویسم.",

    nav: {
      blog: "وبلاگ",
      portfolio: "نمونه‌کارها",
      about: "درباره",
    },

    home: {
      greeting: "سلام، من",
      name: "اکبر احمدی سرای",
      bio: "توسعه‌دهنده ارشد نرم‌افزار با بیش از ۱۰ سال تجربه در طراحی و توسعه سیستم‌های مقیاس‌پذیر و امن. متخصص در معماری بکند، دات‌نت، Node.js و الگوهای مدرن مثل DDD، CQRS و Modular Monolith.",
      readBlog: "← خواندن وبلاگ",
      viewWork: "← مشاهده پروژه‌ها",
      recentPosts: "پست‌های اخیر",
      allPosts: "← همه پست‌ها",
      projects: "پروژه‌ها",
      allProjects: "← همه پروژه‌ها",
    },

    blog: {
      title: "وبلاگ",
      description:
        "مقالاتی درباره معماری نرم‌افزار، مهندسی بکند و توسعه وب — به فارسی و انگلیسی.",
      postCount: (n: number) => `${n} پست`,
      noPosts: "هنوز پستی نیست.",
      backToBlog: "بازگشت به وبلاگ →",
    },

    portfolio: {
      title: "نمونه‌کارها",
      description: "پروژه‌های برگزیده‌ای که طراحی، ساخت و ارائه داده‌ام.",
      projectCount: (n: number) => `${n} پروژه`,
      noProjects: "هنوز پروژه‌ای نیست.",
      liveDemo: "← نمایش زنده",
      github: "← گیت‌هاب",
      backToPortfolio: "بازگشت به نمونه‌کارها →",
    },

    about: {
      title: "درباره",
      description:
        "توسعه‌دهنده ارشد نرم‌افزار متخصص در سیستم‌های بکند مقیاس‌پذیر، معماری نرم‌افزار و مهندسی دات‌نت / Node.js.",
      bio: [
        "سلام، من اکبر احمدی سرای هستم — توسعه‌دهنده ارشد نرم‌افزار با بیش از ۱۰ سال تجربه در طراحی و توسعه سیستم‌های مقیاس‌پذیر و امن. در معماری بکند، .NET Core، Node.js و الگوهای مدرن مثل DDD، CQRS و Modular Monolith تخصص دارم.",
        "با تیم‌های بین‌المللی — از جمله پروژه‌هایی در استانبول ترکیه — همکاری کرده‌ام و چرخه کامل توسعه از تحلیل تا استقرار را رهبری کرده‌ام. پورتال‌های سازمانی Mission-Critical با بیش از ۲۰٬۰۰۰ کاربر فعال ساخته‌ام و کتابخانه‌های متن‌باز منتشر کرده‌ام.",
        "خارج از کار، از طریق این وبلاگ به فارسی و انگلیسی می‌نویسم، در پروژه‌های متن‌باز (Bonyan، Enter.UI) مشارکت می‌کنم و در کنفرانس بین‌المللی ITNAF 2024 مقاله ارائه داده‌ام.",
      ],
      skills: "مهارت‌ها",
      findMe: "ارتباط با من",
      downloadResume: "دانلود رزومه",
      location: "ارومیه، آذربایجان غربی، ایران",
    },

    footer: {
      copyright: (year: number) => `© ${year} اکبر احمدی سرای`,
    },

    post: {
      readInEnglish: "Read in English",
      readInPersian: "بخوانید به فارسی",
      availableIn: "همچنین موجود به",
    },
  },
} as const;

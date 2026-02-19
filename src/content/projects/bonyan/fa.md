---
title: "بنیان"
year: 2024
order: 1
tags: [".NET Core", "C#", "Architecture", "NuGet", "Open Source"]
github: "https://github.com/akbaramd/Bonyan"
demo: "https://www.nuget.org/packages/Bonyan"
summary: "کتابخانه متن‌باز .NET برای ساخت معماری Modular Monolith با الگوهای DDD."
---

**بنیان** یک کتابخانه متن‌باز .NET است که آن را طراحی و ساختم تا توسعه اپلیکیشن‌هایی با معماری **Modular Monolith** را ساده‌تر کند.

## مشکل

بسیاری از تیم‌ها مرزهای ماژول تمیز میکروسرویس‌ها را می‌خواهند، بدون پیچیدگی عملیاتی اجرای ده‌ها سرویس مستقل. Modular Monolith پاسخ است — اما هیچ جعبه‌ابزار استاندارد و تست‌شده‌ای برای توسعه‌دهندگان .NET وجود نداشت که این الگو را به‌طور منسجم پیاده‌سازی کنند.

## آنچه بنیان ارائه می‌دهد

- **سیستم ماژول** — تعریف Bounded Context‌ها به عنوان ماژول‌های مستقل با ثبت‌های وابستگی خودشان
- **بلوک‌های ساختاری DDD** — Aggregate Root، Entity، Value Object، Domain Event، Repository
- **پشتیبانی CQRS** — Command/Query handler با یکپارچه‌سازی MediatR
- **الگوی Outbox** — انتشار رویداد مطمئن با پشتیبانی RabbitMQ
- **یکپارچه‌سازی EF Core** — پیکربندی مبتنی بر convention برای persistence تمیز

## معماری

```
YourApp/
├── Modules/
│   ├── Identity/
│   │   ├── Domain/
│   │   ├── Application/
│   │   └── Infrastructure/
│   └── Billing/
│       ├── Domain/
│       ├── Application/
│       └── Infrastructure/
└── Host/
```

هر ماژول خودکفاست، سرویس‌های خودش را ثبت می‌کند و از طریق interface‌های تعریف‌شده یا domain event‌ها با ماژول‌های دیگر ارتباط برقرار می‌کند — بدون وابستگی تنگ.

## تأثیر

روی **NuGet** منتشر شده و به‌طور فعال توسط توسعه‌دهندگانی که اپلیکیشن‌های .NET واقعی می‌سازند استفاده می‌شود. این کتابخانه نشان می‌دهد چگونه می‌توان اصول معماری تمیز را بدون از دست دادن انعطاف‌پذیری در دسترس قرار داد.

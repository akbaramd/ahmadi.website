---
title: "Bonyan"
year: 2024
order: 1
tags: [".NET Core", "C#", "Architecture", "NuGet", "Open Source"]
github: "https://github.com/akbaramd/Bonyan"
demo: "https://www.nuget.org/packages/Bonyan"
summary: "Open-source .NET library for building Modular Monolith architecture with DDD patterns."
---

**Bonyan** is an open-source .NET library I designed and built to simplify the development of applications following the **Modular Monolith** architectural pattern.

## The Problem

Many teams want the clean module boundaries of microservices without the operational complexity of running dozens of independent services. Modular Monolith is the answer — but there was no standardized, well-tested toolkit for .NET developers to adopt this pattern consistently.

## What Bonyan Provides

- **Module system** — define bounded contexts as independent modules with their own dependency registrations
- **DDD building blocks** — Aggregate Roots, Entities, Value Objects, Domain Events, Repositories
- **CQRS support** — Command/Query handlers with MediatR integration
- **Outbox pattern** — reliable event publishing with RabbitMQ support
- **EF Core integration** — convention-based configuration for clean persistence

## Architecture

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

Each module is self-contained, registers its own services, and communicates with other modules through well-defined interfaces or domain events — no tight coupling.

## Impact

Published on **NuGet**, actively used by developers building real-world .NET applications. The library demonstrates how clean architecture principles can be made accessible without sacrificing flexibility.

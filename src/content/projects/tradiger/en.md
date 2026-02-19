---
title: "Tradiger"
year: 2022
order: 5
tags: [".NET Core", "Node.js", "Trading", "Finance", "International", "Real-time"]
github: ""
demo: ""
summary: "Trading platform developed with an international team in Istanbul, Turkey."
---

**Tradiger** is a financial trading platform I contributed to as part of an international development team based in **Istanbul, Turkey**. This was my first remote international engagement, and it shaped how I think about distributed teamwork and high-stakes software.

## Context

The project involved collaborating with developers, product managers, and financial domain experts across multiple time zones. The platform handles real-time market data, order management, and portfolio tracking for traders.

## My Contributions

Working within the backend team, I was responsible for:

- Designing and implementing core **order processing** services
- Building **real-time notification** pipelines for price alerts and order status updates
- Developing the **portfolio valuation** engine with support for multiple asset classes
- Performance optimization of data-intensive reporting queries
- Integration with third-party market data providers

## Technical Challenges

### Latency Requirements
Trading platforms live or die by latency. I worked extensively on minimizing round-trip times in the order processing pipeline — every millisecond counted.

### Data Consistency
In a distributed system handling financial transactions, ensuring consistency across order books, account balances, and audit logs required careful design. We used a combination of optimistic concurrency and event sourcing for critical paths.

### International Collaboration
Working across cultures and time zones taught me the importance of clear async communication, thorough documentation, and building systems that are easy for others to reason about.

## Stack

- **.NET Core** for the core trading engine and APIs
- **Node.js** for real-time WebSocket services
- **PostgreSQL** for transactional data
- **Redis** for caching and pub/sub messaging
- **RabbitMQ** for inter-service communication

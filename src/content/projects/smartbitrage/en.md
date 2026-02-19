---
title: "SmartBitrage"
year: 2021
order: 6
tags: [".NET Core", "Node.js", "Crypto", "Trading", "Automation", "REST API"]
github: ""
demo: ""
summary: "Automated cryptocurrency arbitrage bot that monitors exchange rate differences across markets."
---

**SmartBitrage** is an automated cryptocurrency arbitrage system I designed and built. It monitors price differences across multiple exchanges in real-time and executes trades to capture arbitrage opportunities.

## What is Arbitrage?

Cryptocurrency arbitrage exploits the same asset trading at different prices on different exchanges simultaneously. Buy low on Exchange A, sell high on Exchange B — the profit is the spread minus transaction fees. In practice, windows are small (seconds to minutes) and require automated execution to be profitable.

## System Architecture

The system is composed of three main layers:

### Market Data Layer
- Connects to multiple cryptocurrency exchanges via REST APIs and WebSockets
- Normalizes order book data into a unified format
- Maintains a real-time view of prices, spreads, and available liquidity

### Opportunity Detection Engine
- Continuously scans for profitable arbitrage paths
- Factors in trading fees, transfer costs, and minimum profit thresholds
- Detects both two-leg (A→B) and triangular arbitrage opportunities

### Execution Layer
- Places orders on both sides of the arbitrage simultaneously
- Manages partial fills, order cancellation, and risk limits
- Logs all trades with full audit trail

## Key Technical Decisions

**Concurrency**: The system handles thousands of price updates per second. Using async I/O throughout the data pipeline was essential to keep up with market data feeds.

**Risk Management**: Hard limits on position size, maximum loss per session, and circuit breakers to halt trading during anomalous market conditions.

**Reliability**: The system monitors its own health and can restart gracefully after failures without leaving open positions.

## Results

The system successfully identified and captured arbitrage opportunities across major cryptocurrency exchanges, validating the core algorithm through live trading.

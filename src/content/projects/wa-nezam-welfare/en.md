---
title: "WA Nezam Welfare Portal"
year: 2023
order: 4
tags: [".NET Core", "C#", "SQL Server", "React", "Enterprise", "Finance"]
github: ""
demo: ""
summary: "Complex welfare management system for loans, insurance, and fund management for lawyers and staff."
---

The **WA Nezam Welfare Portal** is a specialized financial management system built for the West Azerbaijan Bar Association, handling the complete lifecycle of welfare benefits for lawyers and association staff.

## Background

Following the success of the main Nezam Portal, the bar association needed a dedicated system to manage their welfare programs — an area with high financial stakes, complex business rules, and strict regulatory requirements.

## Core Functionality

### Loan Management
- Multi-type loan programs (emergency, long-term, professional development)
- Automated eligibility calculation based on membership tenure and standing
- Installment scheduling, payment tracking, and early repayment handling
- Guarantor management and co-signer workflows

### Insurance Programs
- Group life insurance enrollment and premium management
- Supplemental health insurance for lawyers and dependents
- Claims processing and reimbursement workflows
- Coverage period management and auto-renewal

### Welfare Fund
- Savings fund with configurable contribution rates
- Interest accrual and fund performance reporting
- Member account statements and withdrawal processing
- Actuarial reporting for fund management decisions

### Retirement & Benefits
- Retirement benefit calculation based on years of service
- Death benefit processing and beneficiary management
- Disability coverage workflows

## Technical Architecture

The system integrates tightly with the main Nezam Portal for user identity and lawyer status verification. Key design decisions:

- **Event-driven updates**: Changes in lawyer standing automatically trigger benefit recalculations
- **Audit trail**: Every financial transaction is immutably logged
- **Approval workflows**: Multi-level approval chains for large loan disbursements
- **Reporting engine**: Regulatory-grade financial reports for government submission

---
title: "Getting Started with TypeScript"
date: "2026-02-10"
tags: ["typescript", "javascript", "programming"]
summary: "TypeScript is a powerful tool for writing type-safe JavaScript. In this post we cover the core concepts you need to get started."
---

## What is TypeScript?

TypeScript is a programming language built on top of JavaScript. Its most important feature is **static typing** — variable types are checked at compile time rather than at runtime.

## Why TypeScript?

- **Errors caught earlier** — before the program runs
- **Better autocomplete** in editors like VS Code
- **More readable code** for larger teams
- **Safer refactoring** — when you rename a function, the compiler finds every usage

## Installation

```bash
npm install -D typescript
npx tsc --init
```

## Basic Types

```typescript
// Primitive types
let name: string = "Ahmadi";
let age: number = 25;
let isActive: boolean = true;

// Array
let tags: string[] = ["typescript", "javascript"];

// Object with interface
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

const user: User = {
  id: 1,
  name: "Ali Ahmadi",
};
```

## Typed Functions

```typescript
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

## Union Types

Sometimes a variable can hold multiple types:

```typescript
let id: string | number;

id = 123;      // valid
id = "abc-1";  // valid
id = true;     // error!
```

## Generic Types

```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const firstNumber = getFirst([1, 2, 3]);   // type: number
const firstString = getFirst(["a", "b"]);  // type: string
```

## Next Steps

- [TypeScript official documentation](https://www.typescriptlang.org/docs/)
- Practice with small projects
- Learn `utility types` like `Partial`, `Pick`, `Omit`

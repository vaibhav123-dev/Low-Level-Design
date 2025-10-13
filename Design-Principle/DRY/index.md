# DRY Principle: Don't Repeat Yourself

## What Is the DRY Principle?

The DRY principle encourages you to avoid duplicating logic, behavior, or knowledge.

It applies not only to code, but also to:

* Business rules
* Configuration
* Data models
* Documentation
* Tests

Whenever the same concept appears in more than one place, you introduce redundancy. Redundancy makes your system harder to maintain and more prone to bugs.

> **DRY stands for "Don't Repeat Yourself" and is a fundamental principle in software development that aims to reduce repetition of all kinds.**

## A Real-World Example

Imagine you are building a system to manage users across three modules: authentication, payments, and messaging.
Each module contains the same logic to validate email addresses:

```typescript
function isValidEmail(email: string | null): boolean {
  return email !== null && email.includes('@') && email.includes('.');
}
```

Now suppose the business changes the rule. Email addresses must now end with ".com" or ".org".

If this logic is duplicated across modules, you face a major problem. You need to update every location where the validation code exists. If you miss even one, the system becomes inconsistent, and bugs start to appear. You have violated the DRY principle and created technical debt.

## Why Repetition Is a Problem

### 1. Harder to Maintain
When a rule or piece of logic changes, you must find and update every occurrence. Missing even one leads to inconsistent behavior.

### 2. Higher Risk of Bugs
More copies mean more chances to introduce errors. A typo or mismatch in one version of the logic can cause unexpected failures.

### 3. Bloated Codebase
Redundant logic adds noise to your codebase, making it harder to understand what is unique versus what is shared.

### 4. Poor Test Coverage
When logic is repeated in many places, each version needs its own set of tests. This increases the testing effort and complexity.

## Copy-Paste Is a Red Flag

Copying and pasting code might seem convenient, but it often leads to long-term problems.

Ask yourself:

> **If I need to change this logic in the future, will I remember all the places where it exists?**

If the answer is no or even uncertain, you are creating risk. Following the DRY principle reduces that risk.

## How to Apply DRY

### Step 1: Create a Utility Class

```typescript
export class ValidationUtils {
  // Private constructor so this class cannot be instantiated
  private constructor() {}

  // Static method for email validation
  static isValidEmail(email: string | null): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // You can add more reusable validations here
  static isValidPassword(password: string): boolean {
    return password.length >= 8;
  }
}
```

### Step 2: Usage

```typescript
import { ValidationUtils } from "../utils/ValidationUtils";

class UserService {
  registerUser(email: string, password: string) {
    if (!ValidationUtils.isValidEmail(email)) {
      console.log("❌ Invalid email format.");
      return;
    }

    if (!ValidationUtils.isValidPassword(password)) {
      console.log("❌ Password must be at least 8 characters.");
      return;
    }

    console.log("✅ User registered successfully!");
  }
}

export default UserService;
```

## When It Is Okay to Repeat

The DRY principle is a guideline, not a strict rule. There are times when repetition is acceptable.

### 1. Avoid Premature Abstractions
Do not extract shared code too early. Let duplication reveal itself first. Abstractions created too soon can be misleading or hard to maintain.

> **"Duplication is far cheaper than the wrong abstraction." — Sandi Metz**

### 2. Keep Tests Readable
In some cases, repeating a bit of test code improves clarity. Tests should be easy to read and understand.

### 3. Keep It Simple
If a line of code is extremely simple and unlikely to change, it may be better to repeat it rather than create a new layer of indirection.

## Final Thoughts

The DRY principle is more than just a tip for cleaner code. It is a mindset that helps you:
* Reduce risk
* Improve consistency
* Write software that can evolve gracefully

## Common DRY Techniques

Here are some common techniques to apply the DRY principle:

### 1. Extract Methods/Functions
Move repeated code into a separate method or function.

```typescript
// Before: Repeated logic
if (user.age >= 18 && user.hasValidId) {
  // Allow access to service A
}

// Later in the code...
if (user.age >= 18 && user.hasValidId) {
  // Allow access to service B
}

// After: DRY approach
function isAdultWithValidId(user: User): boolean {
  return user.age >= 18 && user.hasValidId;
}

// Usage
if (isAdultWithValidId(user)) {
  // Allow access to service A
}

// Later in the code...
if (isAdultWithValidId(user)) {
  // Allow access to service B
}
```

### 2. Use Inheritance
Create a base class with common functionality that can be inherited by specialized classes.

```typescript
// Base class with common functionality
abstract class PaymentProcessor {
  protected validateAmount(amount: number): boolean {
    return amount > 0;
  }
  
  abstract process(amount: number): boolean;
}

// Specialized classes inherit common functionality
class CreditCardProcessor extends PaymentProcessor {
  process(amount: number): boolean {
    if (!this.validateAmount(amount)) return false;
    // Credit card specific processing...
    return true;
  }
}

class PayPalProcessor extends PaymentProcessor {
  process(amount: number): boolean {
    if (!this.validateAmount(amount)) return false;
    // PayPal specific processing...
    return true;
  }
}
```

### 3. Use Composition and Dependency Injection
Create reusable components that can be composed together.

```typescript
// Reusable validator component
class Validator {
  isValidEmail(email: string): boolean {
    // Email validation logic
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

// Services use the validator component
class UserService {
  private validator: Validator;
  
  constructor(validator: Validator) {
    this.validator = validator;
  }
  
  registerUser(email: string) {
    if (!this.validator.isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    // Registration logic...
  }
}

class NewsletterService {
  private validator: Validator;
  
  constructor(validator: Validator) {
    this.validator = validator;
  }
  
  subscribe(email: string) {
    if (!this.validator.isValidEmail(email)) {
      throw new Error("Invalid email");
    }
    // Subscription logic...
  }
}
```

> **Tip**: Remember that the goal of DRY is not to eliminate all repetition, but to eliminate repetition of knowledge and logic. Sometimes, what looks like repetition is actually different concepts that happen to look similar at the moment.

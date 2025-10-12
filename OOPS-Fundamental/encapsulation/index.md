# Encapsulation in Object-Oriented Programming

Encapsulation is one of the four foundational principles of object-oriented design. It is the practice of grouping data (variables) and behavior (methods) that operate on that data into a single unit (typically a class) and restricting direct access to the internal details of that class.

In simple terms:

> **Encapsulation = Data hiding + Controlled access**

## Real-World Analogy

Think of a bank account as a vault inside a bank. You don't walk into the vault and change the numbers yourself.

Instead, you interact with it through a well-defined interface, the ATM.

The ATM provides limited but specific operations:

* `deposit()`
* `withdraw()`
* `checkBalance()`

You can't directly access or modify the bank's internal data.

The bank might change how it stores information, applies interest, or validates transactions but none of that affects how you use the ATM.

That's encapsulation in action — hiding internal complexity and exposing only what's necessary.

> **In a well-encapsulated design, external code doesn't need to know how something is done, it only needs to know what can be done.**

## Why Encapsulation Matters

Encapsulation isn't just about data protection, it's about designing systems that are robust, secure, and easy to maintain.

### 1. Data Hiding

Sensitive data (like a bank balance or password) should not be exposed directly. Encapsulation keeps this data private and accessible only through controlled methods.

### 2. Controlled Access and Validation

It ensures that data can only be modified in controlled, predictable ways.

For example, you can prevent invalid deposits or withdrawals by validating input inside methods.

### 3. Improved Maintainability

Because internal details are hidden, you can change the implementation (e.g., how data is stored or validated) without affecting the code that depends on it.

### 4. Security and Stability

By preventing external tampering, encapsulation reduces the risk of inconsistent or invalid system states.

## How Encapsulation is Achieved

Encapsulation is primarily implemented using two language features:

### 1. Access Modifiers

Keywords like `private`, `protected`, and `public` are used to control the visibility of attributes and methods.

* **private**: Accessible only within the same class. This is the primary tool for data hiding.
* **public**: Accessible from anywhere. This creates the controlled public interface.

### 2. Getters and Setters

These are public methods that provide controlled, indirect access to private attributes.

* **Getter** (e.g., `getBalance()`): Provides read-only access to an attribute.
* **Setter** (e.g., `setAmount()`): Allows modifying an attribute, often with validation logic built-in.

## Code Examples

### Example 1: BankAccount

In a banking system, you want users to deposit and withdraw funds, but you must prevent direct manipulation of the account balance. Here's how encapsulation helps:

```typescript
class BankAccount {
    private balance: number = 0;

    deposit(amount: number): void {
        if(amount <= 0) throw new Error('Deposit amount must be positive')
        this.balance += amount
    }

    withdrawal(amount: number): void {
        if(amount <= 0) throw new Error('Withdrawal amount must be positive')
        if(amount > this.balance) throw new Error('Insufficient funds')
        this.balance -= amount
    }

    getBalance(): number {
        return this.balance; // controlled access
    }
}
```

* `balance` is marked private, so no external class can access or modify it directly.
* `deposit()` and `withdraw()` are public entry points that validate user input before updating the state.
* `getBalance()` allows read-only access, without revealing the underlying variable or letting external code change it.

This ensures the account remains in a valid state at all times and business rules are enforced through controlled interfaces.

### Example 2: PaymentProcessor

Let's take a more realistic example. You're building a PaymentProcessor class that handles credit card transactions:

```typescript
class PaymentProcessor {
    private cardNumber: string;
    private amount: number;

    constructor(cardNumber: string, amount: number) {
        this.cardNumber = cardNumber;
        this.amount = amount;
    }

    private maskCardNumber(): string {
        return this.cardNumber.slice(-4).padStart(this.cardNumber.length, '*');
    }

    processPayment(): void {
        if(this.amount <= 0) throw new Error('Payment amount must be positive')
        console.log(`Processing payment of $${this.amount} for card ${this.maskCardNumber()}`);
        // Logic to process payment
    }
}

const payment = new PaymentProcessor('1234567812345678', 100);
payment.processPayment(); // Processing payment of $100 for card ************5678
```

The `PaymentProcessor` class accepts a card number and amount, but internally masks the card number to protect user privacy. Again, encapsulation allows us to hide implementation details while offering a clean interface:

* The raw card number is never stored or exposed directly.
* Masking is handled internally via a private method.
* The external caller doesn't need to know how masking is done, they just call `processPayment()`.
* This design secures sensitive data and centralizes masking logic in one place, making the system safer and easier to maintain.

> **Tip**: Good encapsulation is about finding the right balance between hiding implementation details and providing a usable interface. Too much hiding can make a class difficult to use, while too little defeats the purpose of encapsulation.


Encapsulation focuses on how to protect and control access to data within a class. But what if we extend that idea. Not just hiding data, but also hiding complexity itself?

That’s where **Abstraction** comes in.

# Inheritance in Object-Oriented Programming

Inheritance allows one class (called the subclass or child class) to inherit the properties and behaviors of another class (called the superclass or parent class).

In simpler terms:

> **Inheritance enables code reuse by letting you define common logic once in a base class and then extend or specialize it in multiple derived classes.**

This leads to cleaner, modular, and more maintainable software.

## Real-World Analogy

Think of a User system in a web application:

* The base `User` class holds common attributes like username, email, and methods like `login()` or `logout()`.
* Specialized roles like `Admin`, `Customer`, and `Vendor` inherit from `User` but add role-specific behavior.
* All specialized user types inherit common data and behaviors from the `User` class, but can extend functionality to suit their roles.

## Why Inheritance Matters

Inheritance offers several benefits that make it a powerful design tool in OOP.

### 1. Code Reusability

It embodies the DRY (Don't Repeat Yourself) principle. Common logic is written once in the parent class and shared across all subclasses, reducing redundancy.

### 2. Logical Hierarchy

It creates a clear and intuitive hierarchy that models real-world "is-a" relationships like `ElectricCar` is a `Car` or `Admin` is a `User`.

### 3. Ease of Maintenance

If a bug is found or a change is needed in the shared logic, you only need to fix it in one place, the superclass. All subclasses automatically inherit the fix.

### 4. Polymorphism

Inheritance is a prerequisite for polymorphism, allowing objects of different subclasses to be treated as objects of the superclass.

## How Inheritance Works

When a class inherits from another:

* The subclass inherits all non-private fields and methods of the superclass.
* The subclass can override inherited methods to provide a different implementation.
* The subclass can also extend the superclass by adding new fields and methods.

This allows for both reuse and customization.

## Code Example: Car Hierarchy

Let's model a simple vehicle system:

```typescript
class Car {
    protected make: string;
    protected model: string;

    startEngine(): void {
        console.log("Engine started");
    }

    stopEngine(): void {
        console.log("Engine stopped");
    }
}
```

This `Car` class defines basic attributes and common behaviors shared by all cars.

Now you can create specialized types of cars:

```typescript
class ElectricCar extends Car {
    chargeBattery(): void {
        console.log("Battery charging");
    }
}

class GasCar extends Car {
    fillTank(): void {
        console.log("Filling gas tank");
    }
}
```

In this example:

* Both `ElectricCar` and `GasCar` inherit the `make`, `model`, `startEngine()`, and `stopEngine()` methods from the `Car` class.
* Each subclass adds behavior specific to its type.
* This structure mirrors the real-world relationship: an electric car is a car, and so is a gas car.

## When to Use Inheritance

Inheritance is powerful, but it should be used intentionally, only when it truly models a real-world relationship.

### Use inheritance when:

* There is a clear "is-a" relationship (e.g., Dog is an Animal, Car is a Vehicle)
* The parent class defines common behavior or data that should be shared
* The child class does not violate the behavior expected from the parent
* You want to promote code reuse through shared logic and structure

### Avoid inheritance when:

* The relationship is more of a "has-a" or "uses-a" (e.g., a Car has an Engine, not is an Engine)
* You want to combine behaviors dynamically
* You need flexibility or runtime switching between behaviors
* You don't want child classes to be tightly coupled to parent internals

In these cases, composition is usually a better choice.

## Use Inheritance with Caution

While inheritance is powerful, it's often overused. Incorrectly applying it can lead to rigid, fragile designs that are hard to maintain.

### Common Pitfalls:

* **Misusing inheritance for code reuse**: Inheriting from a class just to reuse methods, without a true "is-a" relationship, leads to poor design.
* **Deep inheritance chains**: Complex hierarchies make systems difficult to understand, debug, or modify.
* **Tight coupling**: Subclasses become too dependent on parent implementation details, making future changes risky.

This is why many modern OOP designs favor composition over inheritance for better modularity and flexibility.

## Inheritance vs. Composition

Both Inheritance and Composition define relationships between classes but they serve different purposes and offer different trade-offs.

| Aspect | Inheritance | Composition |
|--------|-------------|-------------|
| **Relationship** | "is-a" | "has-a" or "uses-a" |
| **Coupling** | Tightly coupled | Loosely coupled |
| **Flexibility** | Compile-time (fixed) | Runtime (dynamic) |
| **Best for** | Shared logic & hierarchy | Reusable and pluggable components |
| **Example** | Car extends Vehicle | Car has an Engine |

### Prefer composition over inheritance when:

* You need flexibility and runtime behavior changes
* The relationship is "has-a" rather than "is-a"
* You want to avoid coupling to a class hierarchy

### Example:

Instead of this:

```typescript
class Printer extends Logger {
    // bad inheritance just to reuse log()
}
```

Do this:

```typescript
class Printer {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    print(message: string): void {
        this.logger.log(`Printing: ${message}`);
    }
}
```

Here, the `Printer` has a `Logger`, not is a `Logger`. This keeps the design modular, testable, and loosely coupled.

Inheritance lets child classes share and extend behavior but what if multiple subclasses need to behave differently when responding to the same method call?

That's where **Polymorphism** comes in.

> **Tip**: A good rule of thumb is to use inheritance when you can say "X is a Y" and it makes logical sense. Use composition when you can say "X has a Y" or "X uses a Y".

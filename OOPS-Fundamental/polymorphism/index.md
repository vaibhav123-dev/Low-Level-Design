# Polymorphism in Object-Oriented Programming

Polymorphism allows the same method name or interface to exhibit different behaviors depending on the object that is invoking it.

The term "polymorphism" comes from Greek and means "many forms." In programming, it allows us to write code that is generic, extensible, and reusable, while the specific behavior is determined at runtime or compile-time based on the object's actual type.

> **Polymorphism lets you call the same method on different objects, and have each object respond in its own way.**

You write code that targets a common type, but the actual behavior is determined by the concrete implementation.

## Real-World Analogy

Think of a universal remote control:

* The buttons are the same: `powerOn()`, `volumeUp()`, `mute()`.
* But depending on the device: a TV, Air Conditioner, or Projector, each button performs a different action.
* For the user, the interface (remote) never changes. But internally, each device interprets the same signal differently.

That's polymorphism in action. The same interface triggers different behaviors depending on the receiver (device type).

## Why Polymorphism Matters

* **Encourages loose coupling**: You interact with abstractions (interfaces or base classes), not specific implementations.
* **Enhances flexibility**: You can introduce new behaviors without modifying existing code, supporting the Open/Closed Principle.
* **Promotes scalability**: Systems can grow to support more features with minimal impact on existing code.
* **Enables extensibility**: You can "plug in" new implementations without touching the core business logic.

## Two Types of Polymorphism

Polymorphism is broadly categorized into two types based on when the method to be executed is determined.

### 1. Compile-time Polymorphism (Static Binding)

Also known as method overloading, compile-time polymorphism occurs when:

* You have multiple methods with the same name in the same class.
* Each method has a different parameter list (number, type, or order).
* The method to call is decided at compile time, based on the arguments passed.

```typescript
class Calculator {
    add(a: number, b: number): number;
    add(a: number, b: number, c: number): number;
    add(a: number, b: number, c?: number): number {
        if (c !== undefined) {
            return a + b + c;
        }
        return a + b;
    }
}
```

Here, the compiler determines which version of `add()` to call based on the parameters before the program runs.

### 2. Runtime Polymorphism (Dynamic Binding)

Also known as method overriding, this happens when:

* A subclass overrides a method defined in its superclass or interface.
* The method to invoke is determined at runtime, based on the actual object type.

Example:
Suppose you're designing a system that sends notifications. You want to support email, SMS, push notifications, etc.

```typescript
interface NotificationSender {
    sendNotification(message: string): void;
}

class EmailSender implements NotificationSender {
    sendNotification(message: string): void {
        console.log(`Sending EMAIL: ${message}`);
    }
}

class SmsSender implements NotificationSender {
    sendNotification(message: string): void {
        console.log(`Sending SMS: ${message}`);
    }
}
```

And use it like this:

```typescript
function notifyUser(sender: NotificationSender, message: string): void {
    sender.sendNotification(message);
}
```

You can pass any implementation of `NotificationSender`, and the correct behavior will be triggered based on the object passed.

> **This is runtime polymorphism, where the decision of which method to execute is made during execution, not at compile time.**

## Polymorphism in LLD Interviews

Polymorphism is especially useful in Low-Level Design when:

* You want to plug in different behaviors without modifying the core logic
* You need to support extensible systems with new types of objects (e.g., different payment providers, transport types, etc.)
* You want to design to interfaces or base classes and allow flexibility in how objects behave

For example: if you're designing a `PaymentProcessor` interface, you can have multiple implementations like `CreditCardProcessor`, `PayPalProcessor`, and `UPIProcessor`. The payment system doesn't need to care which one it's using, it just calls `processPayment()`.

```typescript
interface PaymentProcessor {
    processPayment(amount: number): void;
}

class CreditCardProcessor implements PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing credit card payment of $${amount}`);
    }
}

class PayPalProcessor implements PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing PayPal payment of $${amount}`);
    }
}

class UPIProcessor implements PaymentProcessor {
    processPayment(amount: number): void {
        console.log(`Processing UPI payment of ₹${amount}`);
    }
}
```

Client code:

```typescript
class PaymentService {
    pay(processor: PaymentProcessor, amount: number): void {
        processor.processPayment(amount);
    }
}
```

This system can easily be extended to support new payment types (like ApplePay or Stripe) without changing `PaymentService`.

> **Tip**: Polymorphism is most powerful when combined with the other OOP principles. Use it with inheritance to create flexible class hierarchies, with encapsulation to hide implementation details, and with abstraction to define clear interfaces.

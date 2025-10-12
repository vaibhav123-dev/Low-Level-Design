# Low Level Design (LLD) in Software Engineering

## Introduction

In software engineering, **Low Level Design (LLD)** is the process of translating abstract ideas into concrete implementation.
It's where you translate **High Level Design (HLD)** into detailed class diagrams, interfaces, object relationships, and design patterns.

---

## What LLD Really Means

Low-Level Design is about answering the "**how**" of implementation. 
It moves beyond the "what" and dives into the granular details of the code structure.

> **High-Level Design (HLD)** says: "We need a Notification Service."
> 
> **Low-Level Design (LLD)** says: "We'll use an interface NotificationSender with concrete classes like EmailSender, SmsSender, and PushNotificationSender, all managed by a NotificationManager."

---

## Core Components of LLD

### 1. Classes and Objects

This is where design truly begins. You identify the main entities and their roles within the system:

* What are the key classes?
* What are their responsibilities?
* What data do they hold (attributes)?
* What operations do they perform (methods)?

**Example**: In a food delivery system, we can have classes like:
- `Restaurant`
- `Order`
- `Customer`
- `DeliveryAgent`

The relationships would be:
- Customer places orders
- Restaurant prepares food
- DeliveryAgent delivers it
- Order encapsulates the transaction

An `Order` class would have attributes like:
- orderId
- customerId
- items
- totalAmount
- status

And methods like:
- `calculateTotal()`
- `addItem(Item item)`
- `updateStatus(newStatus)`

### 2. Interfaces and Abstractions

Interfaces define contracts between components. They are critical to ensure loose coupling, allowing multiple components to interact without depending on each other's internal implementation details.

Ask yourself:

* What functionality should a class expose to the outside world?
* What details should remain hidden?
* Which parts of the system are likely to change or have multiple variations?

**Example**: A `PaymentProcessor` interface defines a contract for payment with multiple implementations:

- `StripePaymentProcessor`
- `RazorpayPaymentProcessor`
- `PayPalPaymentProcessor`

Now, the core application logic interacts only with the `PaymentProcessor` interface. This allows you to switch between Stripe and Razorpay or add a new provider without changing a single line of your business logic.

### 3. Relationships Between Classes

Classes don't exist in isolation. LLD defines these relationships clearly and precisely.

Key relationships include:

* **Association**: A general "uses-a" relationship. A Doctor uses a Stethoscope.
* **Aggregation** (Weak "has-a"): An object contains other objects, but they can exist independently. A Department has Professors. If the department is closed, the professors still exist.
* **Composition** (Strong "has-a"): An object is composed of other objects, and their lifecycles are tied. A House is composed of Rooms. If you demolish the house, the rooms are destroyed with it.
* **Inheritance** ("is-a"): A class inherits properties and behaviors from a parent. A Car is a Vehicle.

You also define cardinality to specify the number of instances involved in a relationship:

* **One-to-One**: One instance of A is linked to one instance of B.
  * Example: Each User has one Profile.
* **One-to-Many**: One instance of A is linked to multiple instances of B.
  * Example: A Customer can have multiple Orders.
* **Many-to-Many**: Multiple instances of A relate to multiple instances of B.
  * Example: A Student can enroll in multiple Courses, and each Course can have multiple Students.

### 4. Method Signatures

Once your classes and relationships are defined, the next step is deciding how they behave using methods. A well-designed method signature is self-documenting and intuitive.

You'll need to decide:

* What methods should each class expose?
* What are the method's input parameters, and return types?
* Should the method be public, private, or protected?
* What exceptions might they throw?
* Is it synchronous or asynchronous?

Consistency, readability, and clarity in method signatures make your code intuitive and easier to maintain.

```
Bad: void sendMsg(String str)

Good: void sendNotification(Message message)
```

By designing expressive methods, you make your system intuitive to use and easy to extend, for example, adding new message types without rewriting existing code.

### 5. Design Patterns

LLD is also the stage where you apply proven solutions to common design problems using design patterns. These patterns provide reusable templates that bring structure, robustness, and maintainability to your code.

Some commonly used patterns in LLD include:

* **Singleton**: Useful when you need exactly one instance of a class across your system.
* **Factory**: Useful when you want to delegate object creation without exposing the instantiation details to the client.
* **Strategy**: Useful when you need to switch between multiple algorithms or behaviors at runtime.
* **Observer**: Useful for event-driven systems where you need to establish a publisher–subscriber relationship between objects.
* **Decorator**: Useful when you want to add new behavior to objects without altering existing code.
* **Adapter**: Useful when you need to bridge incompatible interfaces to work together.
* **Facade**: Useful when you want to provide a simplified interface to a complex subsystem.

> **Tip**: Don't force patterns. Let the problem shape the pattern, not the other way around.

# Abstraction in Object-Oriented Programming

Abstraction is the process of hiding complex internal implementation details and exposing only the relevant, high-level functionality to the outside world. It allows developers to focus on what an object does, rather than how it does it.

In short:

> **Abstraction = Hiding Complexity + Showing Essentials**

By separating the what from the how, abstraction:
* Reduces cognitive load
* Improves modularity
* Leads to cleaner, more intuitive APIs

> "Abstraction is about creating a simplified view of a system that highlights the essential features while suppressing the irrelevant details."

## Real-World Analogy: Driving a Car

Think about how you drive a car:

You turn the steering wheel, press the accelerator, and shift the gears.

But you don't need to know:
* How the transmission works
* How the fuel is injected
* How torque or combustion is calculated

All of that mechanical complexity is abstracted away behind a simple interface — the steering wheel, pedals, and gear lever.

That's exactly what abstraction does in software. It lets you use complex systems through simple, high-level interactions.

## Abstraction vs Encapsulation

Although often discussed together, abstraction and encapsulation are distinct concepts.

* **Abstraction** focuses on hiding complexity. It's about simplifying what the user sees. (The `accelerate()` pedal in a car).
* **Encapsulation** focuses on hiding data. It's about bundling data and methods together to protect an object's internal state. (The engine is a self-contained unit).

Think of it this way: Abstraction is the external view of an object, while Encapsulation is the internal view.

| Aspect | Encapsulation | Abstraction |
|--------|--------------|-------------|
| **Focus** | Protecting data within a class | Hiding implementation complexity |
| **Goal** | Restrict access to internal state | Simplify usage and expose only essentials |
| **Level** | Implementation-level | Design-level |
| **Example** | Private balance field in BankAccount | Exposing only deposit() and withdraw() without showing how they work |

Together, they make systems secure, modular, and easy to reason about. **Encapsulation protects, abstraction simplifies.**

## Why Abstraction Matters

Abstraction is critical in designing systems that are scalable, maintainable, and easy to use.

### 1. Reduces Complexity
Users and developers don't need to understand how a feature works internally — just how to use it.

### 2. Improves Usability
By exposing a minimal and intuitive interface, abstraction makes APIs easier to learn and harder to misuse.

### 3. Enables Reusability and Substitutability
Well-abstracted components can be replaced, extended, or reused without modifying the rest of the system.

### 4. Decouples Design Decisions
Internal implementations can evolve independently of the public interface, improving maintainability and flexibility.

## How Abstraction Is Achieved

In Object-Oriented Programming (OOP), abstraction is implemented using language features that allow developers to define what an object should do without specifying how it does it.

This is primarily achieved through:

### 1. Abstract Classes

Abstract classes define a common blueprint for a family of classes. It defines what must be done but lets subclasses decide how to do it.

It may contain:
* Abstract methods (declared but not implemented)
* Concrete methods (fully implemented)
* Fields and constructors shared across subclasses

They are useful when:
* Multiple classes share some behavior or state
* You want to provide a default implementation but enforce subclasses to override specific behaviors

#### Example:

```typescript
abstract class Vehicle {
    brand: string;
    
    // Constructor
    constructor(brand: string) {
        this.brand = brand;
    }
    
    // Abstract method (must be implemented by subclasses)
    abstract start(): void;
    
    // Concrete method (can be inherited)
    displayBrand(): void {
        console.log(`Brand: ${this.brand}`);
    }
}

// Subclass implementing the abstract method
class Car extends Vehicle {
    constructor(brand: string) {
        super(brand);
    }
    
    start(): void {
        console.log("Car is starting...");
    }
}

class Bike extends Vehicle {
    start() {
        console.log("Bike starting with kick...");
    }
}
```

#### Why Use Abstract Classes?

You might wonder: "If I can just write a Car class with a start() method, and the user still doesn't know the internal logic — why bother with abstraction and an abstract class?"

This is a valid question. You don't need abstraction when there's only one class. Abstraction becomes powerful when you have multiple related classes that share a concept but differ in behavior.

##### Case 1 — Without Abstraction

```typescript
class Car {
    start() {
        console.log("Car starting with fuel engine...");
    }
}

class Bike {
    start() {
        console.log("Bike starting with kick...");
    }
}
```

Both Car and Bike have `start()`, but there's no common contract saying "every vehicle must have a start()".

Now imagine you have a function:

```typescript
function startVehicle(vehicle) {
    vehicle.start(); // what if vehicle doesn't have start()?
}
```

Here, nothing guarantees that the passed object will even have a `.start()` method. You lose type safety and consistency.

##### Case 2 — With Abstraction

```typescript
abstract class Vehicle {
    abstract start(): void;  // must be implemented
}

class Car extends Vehicle {
    start() {
        console.log("Car starting with fuel engine...");
    }
}

class Bike extends Vehicle {
    start() {
        console.log("Bike starting with kick...");
    }
}

function startVehicle(v: Vehicle) {
    v.start();  // ✅ TypeScript ensures .start() exists
}
```

Now, TypeScript enforces:
* Every subclass of Vehicle must define `start()`.
* `startVehicle()` can accept any kind of Vehicle safely.
* You can add new types (Truck, Bus, Scooter) without changing old code.

This is abstraction + polymorphism — the calling code (`startVehicle`) doesn't care what kind of vehicle it is; it only knows every vehicle can start.

In short: Abstraction is not about hiding implementation from the user only, it's about defining a consistent contract for multiple classes.

### 2. Interfaces

An interface is a pure abstraction. It defines a contract that a class must fulfill but doesn't provide any implementation. Interfaces are ideal when you want to enforce a consistent API across unrelated classes.

```typescript
class Document {
    private content: string;

    constructor(content: string) {
        this.content = content;
    }

    getContent(): string {
        return this.content;
    }
}

interface Printable {
    print(doc: Document): void;
}

// Concrete implementation of Printable
class PDFPrinter implements Printable {
    print(doc: Document): void {
        console.log(`Printing PDF: ${doc.getContent()}`);
    }
}

class InkjetPrinter implements Printable {
    print(doc: Document): void {
        console.log(`Printing via Inkjet: ${doc.getContent()}`);
    }
}
```

* The `Printable` interface defines what printers must do — `print(Document doc)`.
* The implementations (`PDFPrinter`, `InkjetPrinter`) define how the printing happens.
* You can add new printers later without changing existing code.

## Example: Abstracting a Printer 🖨️

Let's say you're using a Printer object in your application:

```typescript
printer.print(document);
```

As a user of the `print()` method, you don't need to know:
* How the printer formats the document
* How it communicates with the driver or firmware
* Whether the connection is USB, Bluetooth, or Wi-Fi
* How print jobs are queued and prioritized

All this complexity is abstracted away. The only thing you care about is:

"Can I send this document to the printer and get a physical copy?"

## More Examples:

* A Task Scheduler exposing `scheduleTask()`, while hiding threads and queues
* A Payment Gateway offering `pay()`, abstracting card verification and fraud checks
* A DatabaseClient providing `query()` and `insert()`, hiding connection pooling and transaction management

Abstraction helps you define what your objects should do but how do you reuse and extend that behavior across related classes?

That's where **Inheritance** comes in.

> **Tip**: Good abstraction is about finding the right level of detail to expose. Too much abstraction can make a system hard to understand, while too little can lead to tight coupling and reduced flexibility.

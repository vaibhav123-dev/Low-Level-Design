# Dependency in Object-Oriented Design

## What is Dependency?

A Dependency exists when one class relies on another to fulfill a responsibility, but does so without retaining a permanent reference to it.

This typically happens when:

* A class accepts another class as a method parameter.
* A class instantiates or uses another class inside a method.
* A class returns an object of another class from a method.

### Key Characteristics of Dependency

* **Short-lived**: The relationship exists only during method execution.
* **No ownership**: The dependent class does not store the other as a field.
* **"Uses-a" relationship**: The class uses another to accomplish a task, but does not retain it.

> **Dependency represents a temporary relationship where one class uses another class to accomplish a specific task.**

## Real-World Analogy

Imagine a Chef preparing a meal:

* The chef picks up a Knife to chop vegetables.
* Once the chopping is done, the knife is put away or reused elsewhere.
* The chef doesn't necessarily own the knife or keep it stored long-term.

This represents a dependency. The chef depends on the knife only during the cooking process.

## Code Example

```typescript
class Driver {
  constructor(public name: string) {}
}

class Mechanic {
  repair(car: Car) {
    console.log(`🧰 Mechanic is repairing the car driven by ${car.driver.name}`);
  }
}

class Car {
  constructor(public driver: Driver) {} // Association (Car "has a" Driver)

  service(mechanic: Mechanic) { // Dependency (Car "uses" Mechanic)
    console.log("🚗 Car is being serviced...");
    mechanic.repair(this);
  }

  drive() {
    console.log(`🚘 ${this.driver.name} is driving the car.`);
  }
}

// Usage
const driver = new Driver("Vaibhav");
const car = new Car(driver);
const mechanic = new Mechanic();

car.drive();           // Car uses its associated Driver
car.service(mechanic); // Car depends on Mechanic for repair
```

**Output:**
```
🚘 Vaibhav is driving the car.
🚗 Car is being serviced...
🧰 Mechanic is repairing the car driven by Vaibhav
```

### Key Points in the Example

* `Car` has an **association** with `Driver` (stored as a field)
* `Car` has a **dependency** on `Mechanic` (used as a parameter)
* `Mechanic` has a **dependency** on `Car` (used as a parameter)

## UML Representation

In UML class diagrams, dependency is shown using a dashed arrow pointing from the dependent class to the class it depends on.

```
Car - - - -> Mechanic
```

This indicates that Car temporarily uses Mechanic, but does not own or associate with it in a structural sense.

> **Small Clarification:**
> * **Dependency** → short-term, often a method parameter or local variable.
> * **Association** → long-term, stored as a property/attribute.

## Dependency Injection

Dependency Injection is a technique where you provide dependencies from outside, rather than letting the class create or control them internally.

This allows:

* Better testability (you can inject mocks)
* Greater modularity (swap implementations)
* Loose coupling

### Example

```typescript
// 1️⃣ Define an interface (abstraction)
interface Sender {
  send(message: string): void;
}

// 2️⃣ Concrete implementation: Email sender
class EmailSender implements Sender {
  send(message: string): void {
    console.log(`📧 Email sent: ${message}`);
  }
}

// 3️⃣ Concrete implementation: SMS sender
class SmsSender implements Sender {
  send(message: string): void {
    console.log(`📱 SMS sent: ${message}`);
  }
}

// 4️⃣ Service class that depends on Sender
class NotificationService {
  private sender: Sender;

  constructor(sender: Sender) {
    this.sender = sender; // Injected dependency
  }

  notifyUser(message: string): void {
    this.sender.send(message); // Uses sender temporarily
  }
}

// 5️⃣ Usage

// Inject EmailSender into NotificationService
const emailService = new NotificationService(new EmailSender());
emailService.notifyUser("Hello via Email!");

// Inject SmsSender into NotificationService
const smsService = new NotificationService(new SmsSender());
smsService.notifyUser("Hello via SMS!");
```

**Output:**
```
📧 Email sent: Hello via Email!
📱 SMS sent: Hello via SMS!
```

### Explanation

* `Sender` → abstraction; defines what can be done.
* `EmailSender` / `SmsSender` → concrete implementations; define how it's done.
* `NotificationService` → depends on the abstraction (`Sender`) and doesn't care about the implementation.
* Dependency Injection happens in the constructor: we "inject" the sender.
* Flexible: You can easily swap email, SMS, or even a mock sender for testing.

This promotes loose coupling, testability, and open/closed design.

## Dependency vs. Other Relationships

| Relationship | Description | Lifecycle | Storage | Example |
|--------------|-------------|-----------|---------|---------|
| **Dependency** | "Uses-a" temporarily | Short-term | Method parameter or local variable | Car uses Mechanic for service |
| **Association** | "Has-a" reference | Long-term | Stored as a field | Car has a Driver |
| **Aggregation** | "Has-a" collection | Independent lifecycles | Stored as a field | Department has Professors |
| **Composition** | "Contains-a" | Part dies with whole | Stored as a field | House contains Rooms |

## Types of Dependency Injection

There are three common types of dependency injection:

### 1. Constructor Injection

Dependencies are provided through the constructor.

```typescript
class Service {
  private dependency: Dependency;
  
  constructor(dependency: Dependency) {
    this.dependency = dependency;
  }
}
```

### 2. Setter Injection

Dependencies are provided through setter methods.

```typescript
class Service {
  private dependency: Dependency;
  
  setDependency(dependency: Dependency) {
    this.dependency = dependency;
  }
}
```

### 3. Method Injection

Dependencies are provided directly to the methods that need them.

```typescript
class Service {
  doSomething(dependency: Dependency) {
    dependency.operation();
  }
}
```

> **Tip**: Prefer constructor injection for required dependencies and setter injection for optional dependencies. Method injection is useful when the dependency is only needed for specific operations.

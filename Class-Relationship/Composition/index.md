# Composition in Object-Oriented Design

## What is Composition?

Composition is a special type of association that signifies strong ownership between objects. The "whole" class is fully responsible for creating, managing, and destroying the "part" objects. In fact, the parts cannot exist without the whole.

### Key Characteristics of Composition:

* Represents a strong "has-a" relationship.
* The whole owns the part and controls its lifecycle.
* When the whole is destroyed, the parts are also destroyed.
* The parts are not shared with any other object.
* The part has no independent meaning or identity outside the whole.

> **If the part makes no sense without the whole, use composition.**

## Real-World Analogy

Imagine a House and its Rooms:

* A house has a living room, a kitchen, a bedroom.
* These rooms do not exist on their own. They are part of the house.
* When the house is demolished, the rooms are gone with it.
* You don't transfer a bedroom from one house to another.

This is a textbook example of composition. The rooms are tightly bound to the house—not just logically, but in lifecycle and ownership as well.

## Code Example

```typescript
class Room {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  describe(): void {
    console.log(`This is the ${this.name}.`);
  }
}

class House {
  private rooms: Room[];

  constructor() {
    // The House creates its own Room objects
    this.rooms = [
      new Room("Living Room"),
      new Room("Kitchen"),
      new Room("Bedroom")
    ];
  }

  showHouseLayout(): void {
    console.log("Welcome to my house!");
    for (const room of this.rooms) {
      room.describe();
    }
  }
}

// Usage:
const myHouse = new House();
myHouse.showHouseLayout();
```

**Output:**
```
Welcome to my house!
This is the Living Room.
This is the Kitchen.
This is the Bedroom.
```

### Explanation

* The House creates, manages, and owns its Room objects.
* The Room objects do not exist independently outside the context of the House.
* No external class should reuse or manage these Room instances.
* If the House is deleted (e.g., garbage collected), the Rooms are destroyed too.

This demonstrates a true composition relationship—where object ownership and lifecycle are tightly coupled.

## UML Representation

In UML class diagrams, composition is represented by a filled diamond (◆) at the "whole" end of the relationship.

```
House ◆────→ Room
```

This means:

* A House owns multiple Rooms.
* The Rooms do not exist independently.
* When the House dies, the Rooms die with it.

## When to Use Composition

Use composition when:

* The part is not meaningful without the whole.
* The whole should control the lifecycle of its parts.
* The parts are not reused elsewhere in the system.
* You want to model a strong containment relationship.

Composition is a preferred alternative to inheritance when building flexible systems.

> **"Favor composition over inheritance." — GoF Design Principle**

### Why?

* You can build complex behavior by composing smaller, reusable parts.
* It avoids the tight coupling and fragility of inheritance hierarchies.
* You can swap out parts dynamically to modify behavior.

For example:

* A Vehicle can compose an Engine interface.
* Swap between PetrolEngine, ElectricEngine, or HybridEngine at runtime.
* This leads to cleaner, testable, and decoupled code.

## Composition vs Aggregation vs Association

| Feature       | Association      | Aggregation                | Composition                        |
|---------------|------------------|----------------------------|-----------------------------------|
| **Ownership**     | ❌ None           | ❌ Weak (shared reference)  | ✅ Strong (owns the part)           |
| **Lifecycle tie** | ❌ Independent    | ❌ Independent              | ✅ Dependent — part dies with whole |
| **Multiplicity**  | Flexible         | Whole can group many parts | Whole composed of parts            |
| **Reusability**   | High             | Moderate                   | Low — parts not reused             |
| **Example**       | Student ↔ Course | Department → Professor     | House → Room                       |

## Implementing Composition in Code

There are two common ways to implement composition:

### 1. Constructor-based Composition

```typescript
class Engine {
  start(): void {
    console.log("Engine started");
  }
}

class Car {
  private engine: Engine;
  
  constructor() {
    // Car creates its own Engine
    this.engine = new Engine();
  }
  
  start(): void {
    console.log("Car starting...");
    this.engine.start();
  }
}
```

### 2. Factory Method-based Composition

```typescript
class Car {
  private engine: Engine;
  
  constructor() {
    this.engine = this.createEngine();
  }
  
  // Factory method to create the engine
  private createEngine(): Engine {
    return new Engine();
  }
  
  start(): void {
    console.log("Car starting...");
    this.engine.start();
  }
}
```

> **Tip**: Use composition when you want to model a strong "whole-part" relationship where the parts cannot exist independently of the whole. This creates a clear ownership structure and ensures proper lifecycle management.

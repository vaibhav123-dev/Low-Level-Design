# Composition Over Inheritance Principle

## 🧩 Composing Objects Principle

> "Favor composition over inheritance." — Gang of Four (GoF)

This means: instead of building complex class hierarchies through inheritance, we should build objects that contain other objects to reuse behavior.

## 🧠 1. What It Is

Composition is a design principle where:

* One class contains another class (a has-a relationship).
* You build complex behaviors by combining smaller, reusable objects.
* Instead of inheriting from a base class, you delegate work to internal components.

### 🧱 Inheritance vs Composition

| Concept | Inheritance | Composition |
|---------|-------------|-------------|
| **Relationship** | "is-a" | "has-a" |
| **Flexibility** | Rigid — tightly coupled | Flexible — loosely coupled |
| **Reuse** | Code reuse through subclassing | Code reuse through delegation |
| **Change impact** | Breaks subclasses if base changes | Easier to modify/swappable |
| **Example** | Car extends Engine | Car has Engine |

## ⚙️ 2. Why Use It

### ✅ Composition gives you:

* Loose coupling — components are independent.
* Reusability — you can plug and swap objects easily.
* Flexibility — no rigid inheritance chain.
* Better scalability — easy to extend functionality without breaking existing code.

📘 **In short: Composition = LEGO blocks 🧱**  
You build complex systems by combining small reusable parts.

## 🚗 3. Real-World Analogy

Imagine a Car and an Engine:

* A Car is not an Engine — it has an Engine.
* You can replace an engine with another (electric, petrol, hybrid) without changing the car itself.

Inheritance would force a rigid relationship:

* ❌ A Car "is-a" Engine — doesn't make sense.

Composition models the real world:

* ✅ A Car "has-an" Engine — flexible and realistic.

## 💻 4. Code Example

### ❌ Before – Using Inheritance (Wrong Way)

```typescript
class Engine {
  start() {
    console.log("Engine started");
  }
  stop() {
    console.log("Engine stopped");
  }
}

class Car extends Engine { // ❌ Wrong: Car "is-an" Engine?
  drive() {
    console.log("Car is driving...");
  }
}

// Usage
const car = new Car();
car.start();
car.drive();
car.stop();
```

#### ⚠️ Problem:

* This means a Car is a type of Engine, which is conceptually wrong.
* If we add new engine types (DieselEngine, ElectricEngine), the design breaks.

### 💡 Making It Extensible (Using Interface)

```typescript
interface Engine {
  start(): void;
  stop(): void;
}

class PetrolEngine implements Engine {
  start() { console.log("Petrol engine started"); }
  stop() { console.log("Petrol engine stopped"); }
}

class ElectricEngine implements Engine {
  start() { console.log("Electric engine started silently ⚡"); }
  stop() { console.log("Electric engine stopped"); }
}

class Car {
  constructor(private engine: Engine) {}

  start() {
    this.engine.start();
    console.log("Car is running");
  }

  stop() {
    this.engine.stop();
    console.log("Car stopped");
  }
}

// Usage
const petrolCar = new Car(new PetrolEngine());
const electricCar = new Car(new ElectricEngine());

petrolCar.start();
electricCar.start();
```

#### ✅ Output:
```
Petrol engine started
Car is running
Electric engine started silently ⚡
Car is running
```

## ⚙️ 5. How It Improves Design

### 🔹 High Cohesion

Each class focuses on one responsibility:

* Car → controls driving behavior.
* Engine → handles starting/stopping logic.

### 🔹 Low Coupling

* You can easily change the engine type without touching Car.
* System becomes modular and testable.

### 🔹 Open/Closed Principle

* You can add new engines (HybridEngine, SolarEngine) without modifying Car.

## 🧩 6. Conclusion

"Favor composition over inheritance" — because it:

* Models real-world relationships more accurately.
* Promotes loose coupling and high cohesion.
* Makes systems extensible, testable, and maintainable.

### ✅ In Short:

| Principle | Description |
|-----------|-------------|
| **Inheritance** | Use when subclass is a specialization of the parent. |
| **Composition** | Use when one class uses or has another class. |
| **Result** | Cleaner, modular, flexible code. |

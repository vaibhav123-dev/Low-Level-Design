# Liskov Substitution Principle (LSP)

## Definition

> "Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program." — Barbara Liskov

## Breaking It Down

- **Substitutability**: If S is a subtype of T, then objects of type T may be replaced with objects of type S without affecting the functionality of the program.
- **Behavioral Subtyping**: Subtypes must preserve all the behavior of their base types while potentially adding new behaviors.
- **Contract Adherence**: Derived classes must honor the contracts (preconditions, postconditions, invariants) established by the base class.

In simpler terms: a child class should be usable in place of its parent class without causing unexpected behavior.

## The Problem

Have you ever encountered a situation where:
- You replaced a parent class with a child class and suddenly your application started throwing exceptions?
- You found yourself checking the specific type of an object before operating on it?
- You had to override a method in a subclass to throw an exception or provide empty implementation?

If yes, then your code is likely violating the Liskov Substitution Principle.

## Example: Bird Hierarchy

Let's consider a classic example involving birds and their ability to fly.

### ❌ LSP Violation (Bad)

```typescript
class Bird {
  fly() {
    console.log("Flying in the sky");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly!");
  }
}

function letBirdFly(bird: Bird) {
  bird.fly(); // ❌ Throws error if it's a Penguin
}

const sparrow = new Bird();
letBirdFly(sparrow); // Works fine

const penguin = new Penguin();
letBirdFly(penguin); // ❌ Violates LSP
```

**Problems**:
- The `Penguin` class changes the expected behavior of the `fly` method by throwing an error
- Client code expecting a `Bird` to fly will break when given a `Penguin`
- The substitution of a `Penguin` for a `Bird` breaks the correctness of the program
- Runtime errors occur instead of compile-time safety

### ✅ LSP-compliant Approach (Good)

```typescript
// Define common abstraction
interface Bird {
  eat(): void;
}

// Separate behaviors properly
interface FlyingBird extends Bird {
  fly(): void;
}

// Implementations
class Sparrow implements FlyingBird {
  eat() {
    console.log("Sparrow eating seeds");
  }
  fly() {
    console.log("Sparrow flying high");
  }
}

class Penguin implements Bird {
  eat() {
    console.log("Penguin eating fish");
  }
  // No fly() method — doesn't need to fake one
}

// Now everything works safely
function letBirdEat(bird: Bird) {
  bird.eat();
}

function letBirdFly(bird: FlyingBird) {
  bird.fly();
}

letBirdEat(new Sparrow());
letBirdEat(new Penguin()); // ✅ Works fine
letBirdFly(new Sparrow()); // ✅ Works fine
// letBirdFly(new Penguin()); ❌ Type error at compile time (good!)
```

**Benefits**:
- Each class implements only the behaviors it can actually support
- No unexpected exceptions when using objects polymorphically
- Client code depends on the appropriate abstractions
- Type safety catches violations at compile time rather than runtime
- The hierarchy respects the LSP by ensuring proper substitutability

## Real-World Analogy

Think of a car and its driver:
- When you hire a driver (base class), you expect them to be able to drive any car
- If you replace your sedan with an automatic SUV (subtype), the same driver should still be able to drive it without problems
- But if you replace it with a manual transmission truck (LSP violation) and the driver only knows automatic, they can't fulfill their role
- A proper solution would be to define "vehicle operator" as the base type, with "automatic driver" and "manual driver" as subtypes that clearly define what they can operate

## Why We Need LSP

- **Ensures polymorphism works correctly**: Objects can be treated based on their base class without unexpected behavior
- **Improves code reusability**: Code written for base classes can be safely reused with derived classes
- **Reduces coupling**: Client code doesn't need to know about specific subtypes
- **Prevents bugs**: Fewer unexpected behaviors when extending classes
- **Enables better testing**: Base class tests should pass for all derived classes

## Common Pitfalls While Applying LSP

1. **Strengthening Preconditions**: A derived class that adds stricter requirements than its base class violates LSP. For example, if a base method accepts any positive number but a derived method only accepts even numbers.

2. **Weakening Postconditions**: If a base class guarantees certain outcomes that a derived class doesn't fulfill, LSP is violated. For example, if a base method guarantees a sorted result but a derived method returns unsorted data.

3. **Violating Invariants**: If a derived class breaks assumptions that hold true for the base class, it violates LSP. For example, if a base class maintains internal consistency that a derived class breaks.

4. **Throwing New Exceptions**: If a derived class method throws exceptions not thrown by the base class method, it can break client code expecting the base class behavior.

5. **Type Checking**: If you find yourself checking the specific type of an object before operating on it (`if (obj instanceof Square)`), it's often a sign of an LSP violation.

## When to Apply LSP

- When designing class hierarchies and inheritance relationships
- When implementing interfaces or abstract classes
- When using polymorphism in your code
- When writing frameworks or libraries that others will extend
- When refactoring code that uses type checking or has conditional behavior based on object types

## Conclusion

The Liskov Substitution Principle is a powerful guideline for creating robust, maintainable object-oriented systems. By ensuring that derived classes can stand in for their base classes without breaking functionality, LSP promotes true polymorphism and enables flexible, extensible code.

LSP works hand-in-hand with other SOLID principles, particularly the Open-Closed Principle and Interface Segregation Principle, to create systems that are both flexible and reliable.

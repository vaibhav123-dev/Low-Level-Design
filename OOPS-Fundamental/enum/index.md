# Enums in Object-Oriented Programming

Enums (short for enumerations) are a powerful feature in object-oriented design. 
They allow you to define a fixed set of named constants that improve clarity, type safety, and maintainability in your system.
Used correctly, enums can make your code more expressive, self-documenting, and resilient to errors.

## What is an Enum?

An enum is a special data type that defines a collection of constant values under a single name. Unlike primitive constants or string literals, enums are type-safe, which means you can't assign just any value to a variable declared as an enum type.

> **In short**: If a value can only be one of a predefined set of options, use an enum.

## Why Use Enums?

Enums provide several key advantages over plain constants or strings:

* **Avoid "magic values"**: No more scattered strings or integers like "PENDING" or 3 in your code.
* **Improve readability**: Enums make your intent clear — `OrderStatus.SHIPPED` is far more descriptive than `3`.
* **Enable compiler checks**: The compiler validates enum usage, catching typos and invalid assignments early.
* **Support IDE features**: Most IDEs provide auto-completion and refactoring tools for enum values.
* **Reduce bugs**: You can't accidentally assign a random string or number that doesn't belong to enum.

## Example Enums

Enums are perfect for defining categories or states that rarely change:

* **Order States**: `PENDING`, `IN_PROGRESS`, `COMPLETED`
* **User Roles**: `ADMIN`, `CUSTOMER`, `DRIVER`
* **Vehicle Types**: `CAR`, `BIKE`, `TRUCK`
* **Directions**: `NORTH`, `SOUTH`, `EAST`, `WEST`

## TypeScript Implementation

### Basic Enum

```typescript
enum OrderStatus {
    PLACED = 'PLACED',
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

// Using it in code:
const currentStatus: OrderStatus = OrderStatus.SHIPPED

if(currentStatus === OrderStatus.SHIPPED) {
    console.log('Your package is on the way!')
}
```

### Advanced Enum with Properties and Methods

TypeScript allows for more sophisticated enum-like structures using classes:

```typescript
class Status {
  static Pending = new Status('PENDING', 'Waiting to start');
  static InProgress = new Status('IN_PROGRESS', 'Work in progress');
  static Completed = new Status('COMPLETED', 'Task completed');

  private constructor(
    public readonly code: string,
    public readonly label: string
  ){}

  isFinal(): boolean {
    return this == Status.Completed
  }
}

const currentStat = Status.InProgress;
console.log(currentStat.code)       // IN_PROGRESS
console.log(currentStat.label)      // Work in progress
console.log(currentStat.isFinal())  // false
```

> **Tip**: Choose the right enum type for your needs. String enums are more readable in debugging, while numeric enums are more efficient in some cases.

# Aggregation in Object-Oriented Design

## What is Aggregation?

Aggregation represents a "has-a" relationship between two classes, where one class (the whole) groups or organizes other classes (the parts), but does not control their lifecycle.

### Key Characteristics of Aggregation:

* The whole and the part are logically connected.
* The part can exist independently of the whole.
* The whole does not own the part.
* The part can be shared among multiple wholes.
* Both the whole and the part can be created and destroyed independently.
 
> **If a class contains other classes for logical grouping only without lifecycle ownership, it is an aggregation.**

## Real-World Analogy

Let's consider a university context:

* A Department has many Professors.
* Professors may belong to a department, but they are not owned by it.
* If a department is dissolved, the professors still continue to exist, possibly getting reassigned to other departments.
* A professor can even belong to multiple departments in some universities.

This relationship models Aggregation—the department and professors are linked, but their lifecycles are not tightly coupled.

## Code Example

Let's model the above example in code:

```typescript
class Professor {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class Department {
    private name: string;
    private professors: Professor[];

    constructor(name: string, professors: Professor[]) {
        this.name = name;
        this.professors = professors;
    }

    printProfessors(): void {
        console.log(`Professors in ${this.name} Department:`);
        for (const professor of this.professors) {
            console.log(`- ${professor.getName()}`);
        }
    }
}
```

### Usage:

```typescript
function main(): void {
    const p1 = new Professor("Dr. Smith");
    const p2 = new Professor("Dr. Johnson");

    const profs = [p1, p2];

    const csDept = new Department("Computer Science", profs);
    csDept.printProfessors();

    // csDept can be deleted or go out of scope...
    // but p1 and p2 still exist and can be used elsewhere.
}

main();
```

**Key points about this implementation:**

* Department groups Professor objects.
* The professors are not created inside the Department class.
* They can exist before, and survive after, the department's existence.
* If you delete the csDept object, the professors still exist in memory and could be reassigned to another department. That's aggregation in action.

## UML Representation

In UML class diagrams, aggregation is represented by a hollow diamond (◇) at the "whole" (container) side of the relationship.

```
Department ◇────→ Professor
```

This reads as: A Department has Professors, but it does not own them.

## When to Use Aggregation in OOP

Use aggregation when:

* The part can exist independently of the whole.
* The whole groups or organizes the parts logically.
* The part might be shared across multiple wholes.
* There is no ownership or lifecycle dependency.

## Aggregation vs. Composition

Aggregation and Composition are both "has-a" relationships, but they differ in the strength of the relationship:

### Aggregation (Weak "has-a"):
* The part can exist independently of the whole
* The whole does not control the lifecycle of the part
* Example: Department has Professors

### Composition (Strong "has-a"):
* The part cannot exist without the whole
* The whole controls the lifecycle of the part
* Example: House has Rooms (when the house is destroyed, the rooms cease to exist)

> **Tip**: Choose aggregation when the "parts" should be able to exist independently of the "whole" and potentially be shared among multiple "wholes."

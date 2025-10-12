# Classes and Objects in Object-Oriented Programming

At the heart of OOP lie two fundamental concepts: **classes** and **objects**.

They are the foundation on which every OOP-based language like Java, Python, C++, C#, or TypeScript is built.

## 1. What is a Class?

A class is a **blueprint**, **template**, or **recipe** for creating objects. It defines what an object will contain (its data) and what it will be able to do (its behavior).

A class is not an object itself, it's a template used to create many objects with similar structure but independent state.

> Think of a class like a recipe for a cake:
> 
> - The ingredients represent fields or attributes (flour, sugar, eggs → variables).
> - The instructions represent methods or functions (mix, bake, decorate → operations).
> - The recipe itself doesn't produce a cake, it just defines how to make one. When you follow the recipe and bake a cake, you've just created an object.

### Key Characteristics of a Class:

- It groups related data (attributes) and actions (methods) together.
- Defines attributes to represent the state or data of an object.
- Defines methods (functions inside a class) to represent the behavior or actions the object can perform.

### Example: Class Blueprint

See the example in `example.ts` file:

```typescript
class Car {
    // Attributes (private by default in TypeScript with private keyword)
    private brand : string;
    private model : string;
    private speed : number;

    // Constructor
    constructor(brand: string, model: string){
        this.brand = brand;
        this.model = model;
        this.speed = 0;
    }

    // Method to accelerate
    accelarate(increment: number): void {
        this.speed += increment
    }

    // Method to display info
    displayInfo(): void {
        console.log(`${this.brand} is running at ${this.speed} km/h`)
    }
}
```

## 2. What is an Object?

An object is an **instance** of a class. It's a real-world manifestation of the class blueprint, something you can interact with, store data in, and invoke methods on.

When you create an object, you're essentially saying:
"Take this blueprint (class) and build one actual thing (object) out of it."

### Each object:

- Has its own copy of the data defined in the class.
- Shares the same structure and behavior as defined by the class.
- Operates independently of other objects.

### Example: Creating Objects

```typescript
// Creating objects (instances of the Car class)
const corolla = new Car('Toyota', 'Corolla')
const mustang = new Car('Ford', 'Mustang')

// Using object methods
corolla.accelarate(40)
mustang.accelarate(80)

// Displaying object information
corolla.displayInfo()  // Output: Toyota is running at 40 km/h
mustang.displayInfo()  // Output: Ford is running at 80 km/h
```

Here, `corolla` and `mustang` are objects of the `Car` class. They have their own `brand`, `model`, and `speed` fields and can use methods defined in the class.

# Association in Object-Oriented Design

In the real world, nothing exists in isolation.

* A doctor has patients.
* A driver has a car.
* A student enrolls in courses.

These connections define how different entities interact and collaborate.

## What is Association?

Association represents a relationship between two classes where one object uses, communicates with, or references another.

This relationship models the idea:

> **"One object needs to know about the existence of another object to perform its responsibilities"**

If Class A must interact with Class B to fulfill its purpose, then Class A is associated with Class B.

### Real-World Analogy

Think of a Student and a Teacher:

* A student has-a teacher who teaches them.
* A teacher teaches multiple students.

However:

* A student can still exist without a teacher.
* A teacher can still exist without any specific student.

This is a real-world association:

* The relationship exists.
* But neither party owns the other.
* Their lifecycles are independent.

### Key Characteristics of Association:

* Association reflects a "has-a" or "uses-a" relationship.
* Associated objects are loosely coupled and can exist independently of one another.
* The association can be unidirectional or bidirectional, and can follow different multiplicity patterns (1-to-1, 1-to-many, etc.).

## Types of Association

Associations between classes can vary depending on how objects are connected and in which direction information flows.

In Object-Oriented Design, associations are primarily defined by two key properties:

* **Directionality** — Who knows about whom?
* **Multiplicity** — How many objects are connected?

### 1. Based on Direction (Directionality)

Directionality determines which class holds a reference to the other and whether communication is one-way or two-way.

#### a. Unidirectional Association

In a unidirectional association, only one class knows about the other. One class holds a reference, uses, or communicates with another but not vice versa.

**Example**: A Car knows about its Driver, but the Driver doesn't know anything about the Car.

#### b. Bidirectional Association

In a bidirectional association, both classes are aware of each other. Each class holds a reference to the other, enabling two-way communication.

**Example**: An Author writes multiple Books, and each Book knows its Author.

### 2. Based on Multiplicity

Multiplicity defines how many instances of one class can be associated with instances of another class. It describes the quantity and nature of the connections.

#### a. One-to-One Association

Each object of one class is linked to exactly one object of the other class.

**Example**: A Passport is issued to one and only one Citizen, and each Citizen has exactly one Passport.

#### b. One-to-Many Association

One object of a class is linked to multiple objects of another class.

**Example**: A Teacher can teach multiple Students, but each Student is taught by one Teacher.

#### c. Many-to-Many Association

Multiple objects from one class are associated with multiple objects from another class.

**Example**: A Student can enroll in multiple Courses, and each Course can have multiple Students.

## UML Representation

In UML class diagrams, association is represented by a solid line between two classes:

```
Car ───────→ Driver          // Unidirectional
Author ───────↔────── Book   // Bidirectional
```

Multiplicity can also be marked:
* `1` for one
* `*` for many

```
Author 1 ─────── * Book
```

## Code Examples

### Unidirectional Association

Let's model a Driver and a Car. In this scenario, the Car needs to know about its Driver to function, but the Driver object doesn't need a direct reference back to the Car.

```typescript
class Driver {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
}

class Car {
    private driver: Driver;

    constructor(driver: Driver) {
        this.driver = driver;
    }

    drive(): void {
        console.log(`${this.driver.getName()} is driving the car.`);
    }
}

// usage
const driver = new Driver("John");
const car = new Car(driver);
car.drive(); // ✅ John is driving the car.
```

**Explanation**:
* The Car knows about the Driver and interacts with it.
* The Driver class is completely unaware of the Car.
* This models a one-way interaction and is useful when only one class needs access to the other.

### Bidirectional Association

In a bidirectional association, both classes are aware of each other and can reference one another.

**Example**: An Author writes multiple Books, and each Book knows its Author.

```typescript
class Author {
  private name: string;
  private books: Book[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addBook(book: Book): void {
    this.books.push(book);
    book.setAuthor(this); // reverse association
  }

  getBooks(): Book[] {
    return this.books;
  }

  getName(): string {
    return this.name;
  }
}

class Book {
  private title: string;
  private author?: Author; // optional because book may not have an author yet

  constructor(title: string) {
    this.title = title;
  }

  setAuthor(author: Author): void {
    this.author = author;
  }

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author ? this.author.getName() : "Unknown Author";
  }
}

// create an author
const author = new Author("J.K. Rowling");

// create some books
const book1 = new Book("Harry Potter and the Sorcerer's Stone");
const book2 = new Book("Harry Potter and the Chamber of Secrets");

// link them together
author.addBook(book1);
author.addBook(book2);

// print all books by the author
console.log(`Books by ${author.getName()}:`);
author.getBooks().forEach(book => {
  console.log(`- ${book.getTitle()}`);
});

// check author from book side
console.log(`${book1.getTitle()} is written by ${book1.getAuthor()}`);
```

**Output**:
```
Books by J.K. Rowling:
- Harry Potter and the Sorcerer's Stone
- Harry Potter and the Chamber of Secrets
Harry Potter and the Sorcerer's Stone is written by J.K. Rowling
```

In this bidirectional association:
* Author has a list of Books.
* Each Book stores a reference to its Author.
* This is a two-way communication channel between the classes.

## When to Use Association in OOP

Use association when:
* Two classes need to collaborate.
* One class needs to send a message to or query another.
* You want to express relationships without implying ownership.
* You need flexibility—both objects should be reusable and independently manageable.

## Association vs. Other Relationships

| Relationship | Description | Lifecycle Dependency | Example |
|--------------|-------------|----------------------|---------|
| **Association** | Objects know about each other | Independent lifecycles | Student and Teacher |
| **Aggregation** | "Has-a" relationship (weak) | Container can exist without parts | Department and Employees |
| **Composition** | "Contains" relationship (strong) | Part cannot exist without container | House and Rooms |
| **Inheritance** | "Is-a" relationship | Subclass inherits from superclass | Car is a Vehicle |

> **Tip**: Choose association when you want to model a relationship between objects that can exist independently of each other, but need to interact to fulfill their responsibilities.

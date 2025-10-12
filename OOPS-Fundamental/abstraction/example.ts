// 1. Using Abstract class

abstract class Vehicle {
    brand : string;

    constructor(brand: string){
        this.brand = brand;
    }

    abstract start(): void; // abstract method must be implemented in derived classes

    displayBrand(): void { // concrete method that can be inherited
        console.log(`Brand: ${this.brand}`);
    }
}

class Bike extends Vehicle {
    constructor(brand: string){
        super(brand);
    }

    start(): void { // implementing the abstract method
        console.log(`${this.brand} bike is starting.`);
    }
}

class ElectricCar extends Vehicle {
    constructor(brand: string){
        super(brand);
    }

    start(): void { // implementing the abstract method
        console.log(`${this.brand} car is starting.`);
    }
}

// Explanation
// The abstract class Vehicle defines the structure. Every vehicle must have a brand and a way to start.
// The Bike subclass provides its own implementation of start().
// Users of Vehicle don’t care how the vehicle starts, they just call start().


// 2. Using Interfaces

class Doc {
    private content : string;

    constructor(content: string){
        this.content = content
    }

    getContent(): string {
        return this.content
    }
}

interface Printable {
    print(doc : Doc): void;
}

class PDFPrinter implements Printable {
    print(doc: Doc): void {
        console.log(`Printing PDF: ${doc.getContent()}`);
    }
}

class InkjetPrinter implements Printable {
    print(doc: Doc): void {
        console.log(`Printing Inkjet: ${doc.getContent()}`);
    }
}

// The Printable interface defines what printers must do — print(Doc doc).
// The implementations (PDFPrinter, InkjetPrinter) define how the printing happens.
// You can add new printers later without changing existing code.
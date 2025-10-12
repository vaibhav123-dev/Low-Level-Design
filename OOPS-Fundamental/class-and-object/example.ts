//1. Class

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

// This Car class defines what every car object should look like and what it can do.

// ------------------------------------------------------------------------------------------

//2. Object (Instance of class)

const corolla = new Car('Toyota', 'Corolla')
const mustang = new Car('Ford', 'Mustang')

corolla.accelarate(120)
mustang.accelarate(80)

corolla.displayInfo()
console.log('-------------------')
mustang.displayInfo()

// Here, corolla and mustang are objects of the Car class. They have their own brand , model , and speed fields and can use methods defined in the class.


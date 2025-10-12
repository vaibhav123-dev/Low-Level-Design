// ==========================================
// Example 1: Basic Inheritance
// ==========================================

// Parent class (superclass)
class Animal {
    // Protected properties can be accessed by child classes
    protected name: string;
    
    constructor(name: string) {
        this.name = name;
    }
    
    // Method that will be inherited by all subclasses
    eat(): void {
        console.log(`${this.name} is eating.`);
    }
    
    // Another method that will be inherited
    sleep(): void {
        console.log(`${this.name} is sleeping.`);
    }
}

// Child class (subclass) inheriting from Animal
class Dog extends Animal {
    // Adding a new property specific to Dog
    private breed: string;
    
    constructor(name: string, breed: string) {
        // Call the parent constructor using super()
        super(name);
        this.breed = breed;
    }
    
    // Adding a new method specific to Dog
    bark(): void {
        console.log(`${this.name} (a ${this.breed}) is barking.`);
    }
}

// Another child class inheriting from Animal
class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    // Adding a method specific to Cat
    meow(): void {
        console.log(`${this.name} is meowing.`);
    }
}

// Using the classes
const dog = new Dog("Rex", "German Shepherd");
dog.eat();    // Inherited from Animal: "Rex is eating."
dog.sleep();  // Inherited from Animal: "Rex is sleeping."
dog.bark();   // Defined in Dog: "Rex (a German Shepherd) is barking."

const cat = new Cat("Whiskers");
cat.eat();    // Inherited from Animal: "Whiskers is eating."
cat.sleep();  // Inherited from Animal: "Whiskers is sleeping."
cat.meow();   // Defined in Cat: "Whiskers is meowing."

// ==========================================
// Example 2: Method Overriding
// ==========================================

// Parent class
class Transport {
    protected make: string;
    protected model: string;
    
    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }
    
    // Method that will be inherited and potentially overridden
    startEngine(): void {
        console.log("Generic transport engine started");
    }
    
    getInfo(): string {
        return `${this.make} ${this.model}`;
    }
}

// Child class overriding a method
class ElectricTransport extends Transport {
    private batteryCapacity: number;
    
    constructor(make: string, model: string, batteryCapacity: number) {
        super(make, model);
        this.batteryCapacity = batteryCapacity;
    }
    
    // Override the startEngine method with a different implementation
    startEngine(): void {
        console.log(`${this.getInfo()} electric motor initialized silently`);
    }
    
    // Add a new method specific to electric vehicles
    chargeBattery(): void {
        console.log(`Charging ${this.getInfo()} battery (${this.batteryCapacity} kWh)`);
    }
}

// Another child class with its own implementation
class GasTransport extends Transport {
    private fuelType: string;
    
    constructor(make: string, model: string, fuelType: string) {
        super(make, model);
        this.fuelType = fuelType;
    }
    
    // Override the startEngine method
    startEngine(): void {
        console.log(`${this.getInfo()} ${this.fuelType} engine roaring to life`);
    }
    
    // Add a new method specific to gas vehicles
    refuel(): void {
        console.log(`Refueling ${this.getInfo()} with ${this.fuelType}`);
    }
}

// Using the classes to demonstrate method overriding
const electricCar = new ElectricTransport("Tesla", "Model 3", 75);
electricCar.startEngine();  // "Tesla Model 3 electric motor initialized silently"
electricCar.chargeBattery(); // "Charging Tesla Model 3 battery (75 kWh)"

const gasCar = new GasTransport("Ford", "Mustang", "gasoline");
gasCar.startEngine(); // "Ford Mustang gasoline engine roaring to life"
gasCar.refuel();      // "Refueling Ford Mustang with gasoline"

// ==========================================
// Example 3: Using super to extend parent methods
// ==========================================

class Employee {
    protected name: string;
    protected id: number;
    
    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
    
    getDetails(): string {
        return `Employee: ${this.name}, ID: ${this.id}`;
    }
}

class Manager extends Employee {
    private department: string;
    private directReports: number;
    
    constructor(name: string, id: number, department: string, directReports: number) {
        super(name, id);
        this.department = department;
        this.directReports = directReports;
    }
    
    // Extend the parent method using super
    getDetails(): string {
        // Call the parent method first, then add more information
        return `${super.getDetails()}, Department: ${this.department}, Direct Reports: ${this.directReports}`;
    }
}

const employee = new Employee("John Doe", 1001);
console.log(employee.getDetails()); // "Employee: John Doe, ID: 1001"

const manager = new Manager("Jane Smith", 2001, "Engineering", 5);
console.log(manager.getDetails()); // "Employee: Jane Smith, ID: 2001, Department: Engineering, Direct Reports: 5"

// ==========================================
// Example 4: Inheritance vs. Composition
// ==========================================

// INHERITANCE APPROACH (is-a relationship)

class Logger {
    log(message: string): void {
        console.log(`LOG: ${message}`);
    }
    
    error(message: string): void {
        console.error(`ERROR: ${message}`);
    }
}

// Using inheritance (not ideal in this case)
class FileManager extends Logger {
    readFile(filename: string): void {
        this.log(`Reading file: ${filename}`);
        // File reading logic...
    }
    
    writeFile(filename: string, data: string): void {
        this.log(`Writing to file: ${filename}`);
        // File writing logic...
    }
}

// COMPOSITION APPROACH (has-a relationship)

class BetterFileManager {
    // Composition: FileManager has a Logger
    private logger: Logger;
    
    constructor(logger: Logger) {
        this.logger = logger;
    }
    
    readFile(filename: string): void {
        this.logger.log(`Reading file: ${filename}`);
        // File reading logic...
    }
    
    writeFile(filename: string, data: string): void {
        this.logger.log(`Writing to file: ${filename}`);
        // File writing logic...
    }
}

// Using the composition approach
const logger = new Logger();
const fileManager = new BetterFileManager(logger);
fileManager.readFile("example.txt"); // "LOG: Reading file: example.txt"

// ==========================================
// Example 5: Real-world Example - Payment System
// ==========================================

// Abstract base class for all payment methods
abstract class PaymentMethod {
    protected amount: number;
    
    constructor(amount: number) {
        this.amount = amount;
    }
    
    // Common method for all payment methods
    getAmount(): number {
        return this.amount;
    }
    
    // Abstract method that must be implemented by all subclasses
    abstract processPayment(): boolean;
}

// Credit Card payment implementation
class CreditCardPayment extends PaymentMethod {
    private cardNumber: string;
    private expiryDate: string;
    private cvv: string;
    
    constructor(amount: number, cardNumber: string, expiryDate: string, cvv: string) {
        super(amount);
        this.cardNumber = cardNumber;
        this.expiryDate = expiryDate;
        this.cvv = cvv;
    }
    
    // Implementation of the abstract method
    processPayment(): boolean {
        console.log(`Processing credit card payment of $${this.amount}`);
        console.log(`Card Number: ${this.maskCardNumber()}`);
        // Credit card processing logic would go here
        return true;
    }
    
    // Helper method specific to credit card payments
    private maskCardNumber(): string {
        return this.cardNumber.slice(-4).padStart(this.cardNumber.length, '*');
    }
}

// PayPal payment implementation
class PayPalPayment extends PaymentMethod {
    private email: string;
    
    constructor(amount: number, email: string) {
        super(amount);
        this.email = email;
    }
    
    // Implementation of the abstract method
    processPayment(): boolean {
        console.log(`Processing PayPal payment of $${this.amount}`);
        console.log(`PayPal Account: ${this.email}`);
        // PayPal processing logic would go here
        return true;
    }
}

// Bitcoin payment implementation
class BitcoinPayment extends PaymentMethod {
    private walletAddress: string;
    
    constructor(amount: number, walletAddress: string) {
        super(amount);
        this.walletAddress = walletAddress;
    }
    
    // Implementation of the abstract method
    processPayment(): boolean {
        console.log(`Processing Bitcoin payment of $${this.amount}`);
        console.log(`Bitcoin Wallet: ${this.walletAddress}`);
        // Bitcoin processing logic would go here
        return true;
    }
}

// Order class that uses payment methods
class Order {
    private orderId: string;
    private items: string[];
    private paymentMethod!: PaymentMethod; // Using definite assignment assertion
    
    constructor(orderId: string, items: string[]) {
        this.orderId = orderId;
        this.items = items;
    }
    
    setPaymentMethod(paymentMethod: PaymentMethod): void {
        this.paymentMethod = paymentMethod;
    }
    
    checkout(): boolean {
        console.log(`Processing order ${this.orderId} with ${this.items.length} items`);
        return this.paymentMethod.processPayment();
    }
}

// Using the payment system
const order = new Order("ORD-12345", ["Laptop", "Mouse", "Keyboard"]);

// Customer chooses to pay with credit card
const creditCardPayment = new CreditCardPayment(1299.99, "4111111111111111", "12/25", "123");
order.setPaymentMethod(creditCardPayment);
order.checkout();

// Customer changes mind and wants to pay with PayPal
const paypalPayment = new PayPalPayment(1299.99, "customer@example.com");
order.setPaymentMethod(paypalPayment);
order.checkout();

// This demonstrates both inheritance (payment methods inherit from PaymentMethod)
// and composition (Order has-a PaymentMethod)

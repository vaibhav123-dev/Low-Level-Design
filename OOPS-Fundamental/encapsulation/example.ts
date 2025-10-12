// BankAccount
// In a banking system, you want users to deposit and withdraw funds, but you must prevent direct manipulation of the account balance. Here’s how encapsulation helps:

class BankAccount {
    private balance : number = 0;

    deposit(amount: number): void {
        if(amount <= 0) throw new Error('Deposit amount must be positive')
        this.balance += amount
    }

    withdrawal(amount: number): void {
        if(amount <= 0) throw new Error('Withdrawal amount must be positive')
        if(amount > this.balance) throw new Error('Insufficient funds')
        this.balance -= amount
    }

    getBalance(): number {
        return this.balance; // controlled access
    }
}

// balance is marked private, so no external class can access or modify it directly.
// deposit() and withdraw() are public entry points that validate user input before updating the state.
// getBalance() allows read-only access, without revealing the underlying variable or letting external code change it.
// This ensures the account remains in a valid state at all times and business rules are enforced through controlled interfaces.

// Example 2: PaymentProcessor
// Let’s take a more realistic example. You’re building a PaymentProcessor class that handles credit card transactions.

 class PaymentProcessor {
    private cardNumber: string;
    private amount: number;

    constructor(cardNumber: string, amount: number) {
        this.cardNumber = cardNumber;
        this.amount = amount;
    }

    private maskCardNumber(): string {
        return this.cardNumber.slice(-4).padStart(this.cardNumber.length, '*');
    }

    processPayment(): void {
        if(this.amount <= 0) throw new Error('Payment amount must be positive')
        console.log(`Processing payment of $${this.amount} for card ${this.maskCardNumber()}`);
        // Logic to process payment
    }
 }

 const payment = new PaymentProcessor('1234567812345678', 100);
 payment.processPayment(); // Processing payment of $100 for card ************5678

 // PaymentProcessor class accepts a card number and amount, but internally masks the card number to protect user privacy. Again, encapsulation allows us to hide implementation details while offering a clean interface.
 //The raw card number is never stored or exposed directly.
// Masking is handled internally via a private method.
// The external caller doesn’t need to know how masking is done, they just call processPayment().
// This design secures sensitive data and centralizes masking logic in one place, making the system safer and easier to maintain.


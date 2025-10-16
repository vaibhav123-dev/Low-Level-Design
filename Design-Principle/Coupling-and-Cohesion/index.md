# Coupling and Cohesion in Software Design

## 🧩 1. What It Is

### Coupling

**Definition:**
Coupling refers to how dependent modules or classes are on each other.
It measures the degree of interdependence between software components.

* **High coupling**: When one class is tightly dependent on another's implementation details.
* **Low coupling**: When classes interact through well-defined interfaces and minimal dependencies.

### Cohesion

**Definition:**
Cohesion refers to how closely related and focused the responsibilities of a single module or class are.
It measures how well a component performs one specific task.

* **High cohesion**: Each class or module does one well-defined job.
* **Low cohesion**: A class does many unrelated things.

## ⚙️ 2. Why We Need to Use It

| Concept | Why It Matters |
|---------|----------------|
| **Low Coupling** | Makes code easier to modify, test, and reuse. If one module changes, others are not broken. |
| **High Cohesion** | Increases readability, maintainability, and makes debugging easier. |
| **Together** | When both exist, you get modular, scalable, and flexible systems that are easier to evolve over time. |

## 🌍 3. Real-World Analogy

### Coupling Analogy:

Imagine a TV remote and a TV.

* If your remote works only with one TV brand, that's **high coupling**.
* If it works with any TV using a universal protocol, that's **low coupling**.

### Cohesion Analogy:

Think of a restaurant kitchen:

* A chef specializing in only desserts — **high cohesion**.
* A chef doing billing, cleaning, and cooking — **low cohesion**.

## 💻 4. Code Example

### ❌ Before (High Coupling + Low Cohesion)

```typescript
class OrderProcessor {
    processOrder(order: any): void {
        // Process payment directly here (tightly coupled)
        const paymentGateway = new PaymentGateway();
        paymentGateway.makePayment(order.amount);

        // Also send email (too many responsibilities)
        const emailService = new EmailService();
        emailService.send(order.customerEmail, "Order Confirmed");
    }
}
```

#### ➡️ Problems:

* OrderProcessor depends directly on PaymentGateway and EmailService (tight coupling).
* It handles both payment and email logic (low cohesion).

### ✅ After (Low Coupling + High Cohesion)

```typescript
interface PaymentProcessor {
    makePayment(amount: number): void;
}

interface Notifier {
    sendNotification(email: string, message: string): void;
}

class OnlinePayment implements PaymentProcessor {
    makePayment(amount: number): void {
        console.log(`💳 Payment of $${amount} made successfully.`);
    }
}

class EmailNotifier implements Notifier {
    sendNotification(email: string, message: string): void {
        console.log(`📧 Email sent to ${email}: "${message}"`);
    }
}

class OrderProcessor {
    constructor(private payment: PaymentProcessor, private notifier: Notifier) {}

    processOrder(order: { amount: number; customerEmail: string }): void {
        this.payment.makePayment(order.amount);
        this.notifier.sendNotification(order.customerEmail, "Order Confirmed");
    }
}
```

### ⚙️ Usage Example

```typescript
// Create dependencies
const paymentService = new OnlinePayment();
const emailService = new EmailNotifier();

// Inject dependencies into OrderProcessor
const orderProcessor = new OrderProcessor(paymentService, emailService);

// Simulate order
const order = {
    amount: 250,
    customerEmail: "john@example.com"
};

// Process the order
orderProcessor.processOrder(order);
```

### 🖥️ Output

```
💳 Payment of $250 made successfully.
📧 Email sent to john@example.com: "Order Confirmed"
```

#### ➡️ Benefits:

* OrderProcessor doesn't know how payment or notification are done — just that they exist.
* Each class focuses on a single task (cohesion).
* Components can be swapped easily — e.g., replace email with SMS (loose coupling).

### 🧠 Example: Swapping Dependency

Want to send SMS notifications instead of emails?

```typescript
class SMSNotifier implements Notifier {
    sendNotification(phone: string, message: string): void {
        console.log(`📱 SMS sent to ${phone}: "${message}"`);
    }
}

// Use new dependency
const smsService = new SMSNotifier();
const orderProcessor2 = new OrderProcessor(paymentService, smsService);
orderProcessor2.processOrder({ amount: 400, customerEmail: "+919876543210" });
```

#### Output:

```
💳 Payment of $400 made successfully.
📱 SMS sent to +919876543210: "Order Confirmed"
```

## 🧠 5. Conclusion

| Principle | Goal | Result |
|-----------|------|--------|
| **Low Coupling** | Minimize dependency between classes | Easier to change, test, reuse |
| **High Cohesion** | Keep related functionality together | Clear purpose, less complexity |
| **Together** | Foundation of clean architecture | Modular, scalable, maintainable system |

### ✅ When to Use:

* Always aim for low coupling and high cohesion in large or scalable projects.
* Use interfaces, dependency injection, and separation of layers (e.g., controller, service, repository) to achieve it.

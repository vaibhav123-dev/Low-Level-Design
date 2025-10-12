# Interfaces in Object-Oriented Programming

In object-oriented design, interfaces play a foundational role in building systems that are extensible, testable, and loosely coupled.

They define **what** a component should do, not **how** it should do it.

This separation of definition and implementation allows different parts of your system to work together through well-defined contracts, without needing to know each other's internal details.

## What is an Interface?

At its core, an interface is a contract: a list of methods that any implementing class must provide. It specifies a set of behaviors that a class agrees to implement but leaves the details of those behaviors up to each implementation.

> **An interface defines the "what", while classes provide the "how".**

### Real-World Analogy

Consider a remote control. It exposes a standard set of buttons:

* `play()`
* `pause()`
* `volumeUp()`
* `powerOff()`

The person using the remote doesn't care if it controls a TV, a soundbar, or a projector, they all understand the same set of commands.

The remote is the interface. The devices (TV, soundbar, projector) are the implementations.

Each device behaves differently when you press `play()`, but the contract remains consistent.

## Key Properties of Interfaces

Interfaces are more than just method declarations, they are the foundation of flexible software design.

Here are their most important characteristics:

### a) Defines Behavior Without Dictating Implementation

An interface only declares what operations are expected. It doesn't define how they are carried out.

This gives freedom to implementers to provide their own version of the logic, while still honoring the same contract.

### b) Enables Polymorphism

Different classes can implement the same interface in different ways. This allows your code to work with multiple implementations interchangeably.

### c) Promotes Decoupling

Code that depends on interfaces is insulated from changes in the concrete classes that implement them.

This makes your code easier to:

* **Extend** (add new implementations without modifying existing ones)
* **Test** (mock interfaces in unit tests)

## Code Example: Payment Gateway Interface

Let's say you're designing a payment processing module that supports multiple providers like Stripe, Razorpay, and PayPal.

You don't want your business logic to depend on a specific provider. You just want a common way to initiate a payment.

You can define a generic interface:

```typescript
interface PaymentGateway {
    initiatePayment(amount: number): void;
}
```

This interface defines the contract. Every payment gateway must provide an `initiatePayment()` method. But it doesn't specify how each provider processes payments.

Now you can create multiple implementations:

```typescript
class StripePayment implements PaymentGateway {
    initiatePayment(amount: number): void {
        console.log(`Payment processing via Stripe: ${amount}`)
    }
}

class RazorPayPayment implements PaymentGateway {
    initiatePayment(amount: number): void {
        console.log(`Payment processing via Razorpay: ${amount}`)
    }
}
```

Both `StripePayment` and `RazorpayPayment` implement the same interface, but the actual logic for processing the payment is different.

## Usage: Loose Coupling in Action

Now let's say you have a `CheckoutService` that processes payments. Instead of hardcoding a specific payment gateway, you inject the interface:

```typescript
class CheckoutService {
    private paymentGateway: PaymentGateway;

    constructor(paymentGateway: PaymentGateway) {
        this.paymentGateway = paymentGateway
    }

    setPaymentGateway(paymentGateway: PaymentGateway): void {
        this.paymentGateway = paymentGateway
    }

    checkout(amount: number): void {
        this.paymentGateway.initiatePayment(amount)
    }
}
```

Notice that `CheckoutService` depends only on the interface, not the implementation. This makes it easy to swap or extend payment providers without changing the checkout logic.

Now you can plug in any payment gateway at runtime:

```typescript
const stripeGateway = new StripePayment()
const service = new CheckoutService(stripeGateway)
service.checkout(120) // Output: Processing payment via Stripe: 120

const razorPayGateway = new RazorPayPayment()
service.setPaymentGateway(razorPayGateway)
service.checkout(180) // Output: Processing payment via Razorpay: 180
```

Here's the beauty of it:

* `CheckoutService` doesn't care which payment gateway is being used.
* You can replace, extend, or test different gateways without touching its code.

> **Tip**: Interfaces are most powerful when they're focused on a single responsibility. Keep them small and cohesive rather than creating large, monolithic interfaces.

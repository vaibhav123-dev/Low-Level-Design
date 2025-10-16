# Law of Demeter (LoD)

Have you ever called a method on an object... then chained another... and another... until the line looked like a trail of dots?

Or made a small internal change to one class... and suddenly had to update code across five other layers?

If yes, you've probably run into a violation of one of the most overlooked design principles in software engineering: **The Law of Demeter (LoD).**

## The Problem

Imagine you're building a simple e-commerce system.

You have:

* A Customer who owns a ShoppingCart
* The cart contains a list of CartItems
* Each CartItem refers to a Product
* And every Product has a Price

Now let's say you want to display the price of the first product in a customer's shopping cart.

A common (but flawed) way to write this would be:

```typescript
function displayFirstItemPrice(customer: Customer): void {
    const price = customer.getShoppingCart().getItems()[0].getProduct().getPrice();
    console.log(`Price of the first item: ${price.getAmount()}`);
}
```

This approach works, but it smells bad.

It's what we call a "train wreck" or "dot-chaining": one object reaching through several others to get what it wants.

You start with a Customer, go into their ShoppingCart, peek into its internal list of CartItems, grab the first one, extract the Product, and finally—get the Price.

## What's Wrong With This?

### 1. High Coupling

The OrderService method is now tightly coupled to the entire internal structure of the customer and their cart.

* If ShoppingCart changes how it stores items (e.g., using a Map instead of a List)
* If CartItem renames its getProduct() method
* Or if Product evolves to store pricing in a new way…

Boom. Your OrderService code breaks. Even though it had nothing to do with those decisions.

### 2. Encapsulation Violation

You're reaching deep into object internals—violating encapsulation at multiple levels.

* Customer exposes its ShoppingCart
* ShoppingCart exposes its internal list
* You assume the structure of that list
* And even dig through CartItem and Product just to get a price

This kind of reach-through breaks the principle of object-oriented design: objects should tell, not ask.

### 3. Maintenance Nightmare

Imagine this change: You switch from using a Money wrapper to a BigDecimal for price representation in Product.

Now, every part of your codebase that dot-chased its way to product.getPrice() must be updated.

Your implementation detail leaked—and now you're paying for it.

### 4. Testability Issues

Testing displayFirstItemPrice() becomes a mocking marathon.

To test it in isolation, you'd need to mock:

* A Customer
* That returns a ShoppingCart
* That returns a List
* That returns a CartItem
* That returns a Product
* That returns a Price

One function. Six mocks. Exhausting.

## Refactoring with LoD in Mind

### Step 1. Add a helper in Customer

```typescript
class Customer {
  private shoppingCart: ShoppingCart;

  constructor(cart: ShoppingCart) {
    this.shoppingCart = cart;
  }

  getFirstItemPrice(): number {
    return this.shoppingCart.getFirstItemPrice();
  }
}
```

### Step 2. Delegate to ShoppingCart

```typescript
class ShoppingCart {
  private items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  getFirstItemPrice(): number {
    return this.items[0].getPriceAmount();
  }
}
```

### Step 3. Let Item expose its price directly

```typescript
class Item {
  private product: Product;

  constructor(product: Product) {
    this.product = product;
  }

  getPriceAmount(): number {
    return this.product.getPrice().getAmount();
  }
}
```

### ✅ Step 4. Simplify the Caller

```typescript
function displayFirstItemPrice(customer: Customer): void {
  const price = customer.getFirstItemPrice();
  console.log(`Price of the first item: ${price}`);
}
```

## 🧠 Why This Follows LoD

* displayFirstItemPrice() only talks to its friend (Customer)
* It doesn't know about ShoppingCart, Item, or Product
* Each class is responsible for managing its own internal structure
* → Changes inside one class don't ripple everywhere

## Benefits of Law of Demeter

* **Low Coupling**: Code changes in one place don't ripple across your codebase.
* **Better Encapsulation**: Each class handles its own logic—no more peeking into internals.
* **Easier Refactoring**: You can evolve internal implementations without affecting consumers.
* **Improved Testability**: Fewer mocks needed. More focused tests.
* **Cleaner APIs**: Public methods are expressive, intentional, and meaningful.

## How does LoD relate to other SOLID principles?

LoD works hand-in-hand with other key design principles:

* **Encapsulation**: LoD reinforces encapsulation by discouraging external code from depending on internal structure.
* **Single Responsibility Principle (SRP)**: LoD encourages putting logic where it belongs. If OrderService needs pricing logic, LoD nudges you to push it into ShoppingCart or Customer—where the relevant data already lives.
* **Low Coupling**: This is the central theme. By limiting how far your code reaches, you reduce fragility and make your system easier to maintain, extend, and test.

In short: LoD is like a guardrail. It helps you avoid the slippery slope of exposing internals and tying your code together too tightly.

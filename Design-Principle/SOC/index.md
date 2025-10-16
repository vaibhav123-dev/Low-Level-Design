# Separation of Concerns (SoC) Principle

## 🧩 1. What is the Separation of Concerns (SoC) Principle?

### Definition:

Separation of Concerns means dividing a program into distinct sections, where each section handles a specific responsibility or concern — and nothing else.

A concern is simply a particular feature, functionality, or behavior of a program.

Each module/class/function should focus on one job, not mix multiple responsibilities.

## 💡 2. Why We Need to Use It

### ✅ Benefits:

* **Maintainability**: You can change one part of the code without breaking others.
* **Reusability**: Components that do one thing well are easier to reuse elsewhere.
* **Testability**: Small, focused units are simpler to test.
* **Scalability**: You can extend features without touching unrelated code.
* **Collaboration**: Teams can work on separate modules in parallel.

### ❌ Without SoC:
You get "spaghetti code" — hard to understand, hard to test, hard to change.

## 🏠 3. Real-World Analogy

Think of a restaurant kitchen 🍽️

* The chef cooks food
* The waiter serves food
* The cashier handles billing

If the waiter starts cooking and the chef handles payments — the system breaks down.

Each role (concern) must stay separate but collaborate through clear interfaces.

That's Separation of Concerns.

## 💻 4. Code Example (Before vs After)

### ❌ Before (Violates SoC)

```typescript
class UserService {
  createUser(name: string, email: string) {
    // Business logic
    const user = { name, email };

    // Database logic
    console.log("Saving user to database:", user);

    // Notification logic
    console.log("Sending welcome email to:", email);
  }
}
```

#### ➡️ Problem:
One class handles user creation, database operations, and notifications — three separate concerns.

### ✅ After (Follows SoC)

```typescript
class UserRepository {
  save(user: any) {
    console.log("Saving user to database:", user);
  }
}

class EmailService {
  sendWelcomeEmail(email: string) {
    console.log("Sending welcome email to:", email);
  }
}

class UserService {
  private repo: UserRepository;
  private emailService: EmailService;

  constructor(repo: UserRepository, emailService: EmailService) {
    this.repo = repo;
    this.emailService = emailService;
  }

  createUser(name: string, email: string) {
    const user = { name, email };
    this.repo.save(user);
    this.emailService.sendWelcomeEmail(email);
  }
}
```

### Usage:

```typescript
const userService = new UserService(new UserRepository(), new EmailService());
userService.createUser("Alice", "alice@example.com");
```

#### ➡️ Now:

* **UserRepository** → only handles data persistence
* **EmailService** → only handles communication
* **UserService** → only coordinates logic

You can modify or test each part independently.

## 🧠 5. Conclusion

| Aspect | Without SoC | With SoC |
|--------|-------------|----------|
| Code organization | Mixed, messy | Clear, modular |
| Maintenance | Hard | Easy |
| Reusability | Low | High |
| Testing | Complex | Simple |

Separation of Concerns is about clarity and control.

Each part of your system does one thing well, and together they build a robust application.

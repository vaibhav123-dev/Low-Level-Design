# YAGNI Principle: You Aren't Gonna Need It

## What Is the YAGNI Principle?

> "Always implement things when you actually need them, never when you just foresee that you need them." — Ron Jeffries, co-founder of Extreme Programming

YAGNI is a principle that encourages you to resist the temptation to build features or add flexibility until you are absolutely sure you need them.

In simple terms: **Don't build for tomorrow. Build for today.**

## The Real-World Problem

Suppose you are working on a project that involves uploading user profile pictures.

Your current requirement is simple:

* Accept an image
* Resize it
* Store it

But you start thinking ahead. What if:

* Tomorrow we need support for video uploads?
* We may want to switch from local file storage to cloud storage?
* We could support 3D avatars?

So you build a flexible, pluggable, extensible media-processing engine. You introduce interfaces, dependency injection, multiple handler classes, and a storage abstraction layer.

All of this before your first user even uploads a profile photo.

What's the result?

* A bloated, overly complex system
* Slower delivery of the core functionality
* More code to test, maintain, and debug
* Features no one asked for

## Why Premature Work Is Harmful

### 1. Wasted Time and Effort
Every hour spent building features that are not needed is time not spent building what actually matters.

### 2. Increased Complexity
Extra flexibility adds more moving parts. It becomes harder to understand, test, and modify your code.

### 3. Delayed Value
By working on "someday" features, you delay shipping the features users need today.

### 4. Higher Maintenance Costs
Even unused features have a cost. They can introduce bugs, require updates, and get in the way of refactoring.

## A Simpler Way with YAGNI

### The Needed Functionality

```typescript
class ImageUploader {
    private readonly resizer: ImageResizer;
    private readonly storage: LocalStorage;

    constructor(resizer: ImageResizer, storage: LocalStorage) {
        this.resizer = resizer;
        this.storage = storage;
    }

    uploadImage(imageFile: File): void {
        const resized = this.resizer.resize(imageFile, 300, 300);
        this.storage.save(resized);
    }
}
```

This code:

* Meets today's needs
* Is easy to read and test
* Can be extended later, when necessary

If the requirement to support cloud storage or video formats arises, that's the time to refactor and extend—not before.

## Final Thought

Software is not built to be perfect on day one. It is built to evolve.

The YAGNI principle reminds us to stay grounded in reality. Code for what is needed now. When the time comes to evolve or extend, you will have the clarity and simplicity to do it well.

So next time you think:

> "Let's add this now, just in case…"

Pause, and ask yourself: **"Is there a real need for this today?"**

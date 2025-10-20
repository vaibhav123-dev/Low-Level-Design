# Interface Segregation Principle (ISP)

## Definition

> "Clients should not be forced to depend on methods they do not use." — Robert C. Martin

## Breaking It Down

- **Focused Interfaces**: Keep interfaces small, specific, and focused on a single responsibility or role.
- **Client-Centric Design**: Design interfaces based on client needs, not implementer convenience.
- **No Unnecessary Dependencies**: Classes should only need to implement methods they actually use.

In simpler terms: Don't make classes implement methods they don't need by creating large, monolithic interfaces.

## The Problem

Have you ever encountered a situation where:
- You implemented an interface but had to write empty methods just to make the compiler happy?
- You updated a shared interface and suddenly multiple unrelated classes started breaking?
- You found yourself throwing `UnsupportedOperationException` in method implementations?

If yes, then your code is likely violating the Interface Segregation Principle.

## Example: Media Player

Let's consider an example involving a media player application that supports different types of media.

### ❌ ISP Violation (Bad)

```typescript
// One large interface that handles everything
interface MediaPlayer {
    playAudio(audioFile: string): void;
    stopAudio(): void;
    adjustAudioVolume(volume: number): void;

    playVideo(videoFile: string): void;
    stopVideo(): void;                
    adjustVideoBrightness(brightness: number): void;
    displaySubtitles(subtitleFile: string): void;
}

// Audio-only player forced to implement video methods
class AudioOnlyPlayer implements MediaPlayer {
    playAudio(audioFile: string): void {
        console.log(`Playing audio file: ${audioFile}`);
    }

    stopAudio(): void {
        console.log("Audio stopped.");
    }

    adjustAudioVolume(volume: number): void {
        console.log(`Audio volume set to: ${volume}`);
    }

    // 👎 Methods this class shouldn't care about:
    playVideo(videoFile: string): void {
        throw new Error("Not supported.");
    }

    stopVideo(): void { 
        // Empty implementation
    }

    adjustVideoBrightness(brightness: number): void {
        throw new Error("Not supported.");
    }

    displaySubtitles(subtitleFile: string): void {
        throw new Error("Not supported.");
    }
}
```

**Problems**:
- **Interface Pollution**: The `MediaPlayer` interface is doing too much, combining multiple unrelated responsibilities.
- **Fragile Code**: Adding a new method to the interface forces all implementations to update, even if they don't need that functionality.
- **Violates Liskov Substitution**: Clients expecting a `MediaPlayer` to support video will get exceptions when using an `AudioOnlyPlayer`.
- **Poor Maintainability**: Classes implement methods they don't need, leading to confusing code and potential bugs.

### ✅ ISP-compliant Approach (Good)

```typescript
// Smaller, focused interfaces
interface AudioPlayerControls {
    playAudio(audioFile: string): void;
    stopAudio(): void;
    adjustAudioVolume(volume: number): void;
}

interface VideoPlayerControls {
    playVideo(videoFile: string): void;
    stopVideo(): void;
    adjustVideoBrightness(brightness: number): void;
    displaySubtitles(subtitleFile: string): void;
}

// Audio-only player only implements what it needs
class ModernAudioPlayer implements AudioPlayerControls {
    playAudio(audioFile: string): void {
        console.log(`ModernAudioPlayer: Playing audio - ${audioFile}`);
    }

    stopAudio(): void {
        console.log("ModernAudioPlayer: Audio stopped.");
    }

    adjustAudioVolume(volume: number): void {
        console.log(`ModernAudioPlayer: Volume set to ${volume}`);
    }
}

// Video-only player only implements what it needs
class SilentVideoPlayer implements VideoPlayerControls {
    playVideo(videoFile: string): void {
        console.log(`SilentVideoPlayer: Playing video - ${videoFile}`);
    }

    stopVideo(): void {
        console.log("SilentVideoPlayer: Video stopped.");
    }

    adjustVideoBrightness(brightness: number): void {
        console.log(`SilentVideoPlayer: Brightness set to ${brightness}`);
    }

    displaySubtitles(subtitleFile: string): void {
        console.log(`SilentVideoPlayer: Subtitles from ${subtitleFile}`);
    }
}

// Full media player implements both interfaces
class ComprehensiveMediaPlayer implements AudioPlayerControls, VideoPlayerControls {
    playAudio(audioFile: string): void {
        console.log(`ComprehensiveMediaPlayer: Playing audio - ${audioFile}`);
    }

    stopAudio(): void {
        console.log("ComprehensiveMediaPlayer: Audio stopped.");
    }

    adjustAudioVolume(volume: number): void {
        console.log(`ComprehensiveMediaPlayer: Audio volume set to ${volume}`);
    }

    playVideo(videoFile: string): void {
        console.log(`ComprehensiveMediaPlayer: Playing video - ${videoFile}`);
    }

    stopVideo(): void {
        console.log("ComprehensiveMediaPlayer: Video stopped.");
    }

    adjustVideoBrightness(brightness: number): void {
        console.log(`ComprehensiveMediaPlayer: Brightness set to ${brightness}`);
    }

    displaySubtitles(subtitleFile: string): void {
        console.log(`ComprehensiveMediaPlayer: Subtitles from ${subtitleFile}`);
    }
}
```

**Benefits**:
- Each class only implements the interfaces it needs
- Interfaces are focused on specific capabilities
- No empty or exception-throwing methods
- Adding new methods to one interface doesn't affect unrelated classes
- Client code can depend on the specific interfaces it needs

## Real-World Analogy

Think of a restaurant menu:
- A traditional menu might have everything (appetizers, main courses, desserts, drinks) on one large menu
- But specialized restaurants often provide separate menus (drinks menu, dessert menu, etc.)
- This makes it easier for customers who only want specific items
- It also allows the restaurant to update one menu (e.g., seasonal cocktails) without reprinting everything

Similarly, segregated interfaces let clients "order" just the functionality they need without being overwhelmed by or dependent on methods they'll never use.

## Why We Need ISP

- **Increased Cohesion, Reduced Coupling**: Interfaces become highly focused, minimizing unnecessary dependencies.
- **Improved Flexibility & Reusability**: Smaller, role-specific interfaces are easier for classes to implement correctly.
- **Better Code Readability & Maintainability**: It's much clearer what a class can and cannot do.
- **Enhanced Testability**: When testing a client that uses a specific interface, you only need to mock the relevant methods.
- **Avoids "Interface Pollution" and LSP Violations**: Classes aren't forced to implement methods they don't need.

## Common Pitfalls While Applying ISP

1. **Over-Segregation ("Interface-itis")**: Creating a separate interface for every single method. This leads to too many tiny interfaces that are hard to manage. Instead, group related methods by logical roles or capabilities.

2. **Not Thinking from the Client's Perspective**: Designing interfaces based only on how implementers work, not how clients use them. ISP is about making life easier for the client. Design your interfaces by looking at what the client actually needs.

3. **Lack of Cohesion**: Creating interfaces that mix unrelated methods together. Make sure every method in an interface relates to a single, well-defined responsibility.

4. **Confusing ISP with Single Responsibility Principle**: While related, they're different. SRP focuses on classes having one reason to change, while ISP focuses on clients not depending on methods they don't use.

5. **Retrofitting Without Refactoring**: Adding ISP to existing code without properly refactoring client code, leading to a mix of old and new patterns.

## When to Apply ISP

- When designing new interfaces, especially in libraries or frameworks others will use
- When you notice classes implementing methods they don't use
- When interface changes frequently break unrelated implementations
- When you find yourself checking types before calling interface methods
- When you see implementations throwing `UnsupportedOperationException`
- When different clients use different subsets of an interface's methods

## Conclusion

The Interface Segregation Principle helps create more maintainable, flexible, and robust code by ensuring that interfaces are focused and clients only depend on what they actually need. By designing smaller, cohesive interfaces, you reduce coupling, improve clarity, and make your system more adaptable to change.

ISP works hand-in-hand with other SOLID principles, particularly the Single Responsibility Principle and Liskov Substitution Principle, to create systems that are both flexible and reliable.

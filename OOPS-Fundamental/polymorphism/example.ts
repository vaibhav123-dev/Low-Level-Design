// ==========================================
// Example 1: Runtime Polymorphism with Interfaces
// ==========================================

// Define a common interface for all shapes
interface Shape {
    calculateArea(): number;
    display(): void;
}

// Implement the Shape interface for different shapes
class Circle implements Shape {
    private radius: number;

    constructor(radius: number) {
        this.radius = radius;
    }

    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    display(): void {
        console.log(`Circle with radius ${this.radius}, area: ${this.calculateArea().toFixed(2)}`);
    }
}

class Rectangle implements Shape {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    calculateArea(): number {
        return this.width * this.height;
    }

    display(): void {
        console.log(`Rectangle with width ${this.width} and height ${this.height}, area: ${this.calculateArea()}`);
    }
}

class Triangle implements Shape {
    private base: number;
    private height: number;

    constructor(base: number, height: number) {
        this.base = base;
        this.height = height;
    }

    calculateArea(): number {
        return 0.5 * this.base * this.height;
    }

    display(): void {
        console.log(`Triangle with base ${this.base} and height ${this.height}, area: ${this.calculateArea()}`);
    }
}

// Function that works with any Shape
function printShapeInfo(shape: Shape): void {
    // We don't know or care what specific shape we're dealing with
    // We just know it has the methods defined in the Shape interface
    shape.display();
}

// Using the shapes polymorphically
const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const triangle = new Triangle(3, 8);

// The same function works with different shape types
printShapeInfo(circle);     // Output: Circle with radius 5, area: 78.54
printShapeInfo(rectangle);  // Output: Rectangle with width 4 and height 6, area: 24
printShapeInfo(triangle);   // Output: Triangle with base 3 and height 8, area: 12

// We can also store different shapes in an array
const shapes: Shape[] = [circle, rectangle, triangle];

// Process all shapes uniformly
shapes.forEach(shape => {
    console.log(`Area: ${shape.calculateArea()}`);
});

// ==========================================
// Example 2: Runtime Polymorphism with Abstract Classes
// ==========================================

// Abstract base class for all vehicles
abstract class TransportVehicle {
    protected make: string;
    protected model: string;

    constructor(make: string, model: string) {
        this.make = make;
        this.model = model;
    }

    // Common method for all vehicles
    getInfo(): string {
        return `${this.make} ${this.model}`;
    }

    // Abstract method that must be implemented by all subclasses
    abstract start(): void;
}

// Car implementation
class Automobile extends TransportVehicle {
    private numDoors: number;

    constructor(make: string, model: string, numDoors: number) {
        super(make, model);
        this.numDoors = numDoors;
    }

    // Implementation of the abstract method
    start(): void {
        console.log(`${this.getInfo()} car with ${this.numDoors} doors is starting...`);
    }
}

// Motorcycle implementation
class Motorcycle extends TransportVehicle {
    private engineSize: number;

    constructor(make: string, model: string, engineSize: number) {
        super(make, model);
        this.engineSize = engineSize;
    }

    // Implementation of the abstract method
    start(): void {
        console.log(`${this.getInfo()} motorcycle with ${this.engineSize}cc engine is revving up...`);
    }
}

// Function that works with any TransportVehicle
function startTransport(vehicle: TransportVehicle): void {
    console.log(`Starting a vehicle: ${vehicle.getInfo()}`);
    vehicle.start();
}

// Using vehicles polymorphically
const sedan = new Automobile("Honda", "Accord", 4);
const sportBike = new Motorcycle("Ducati", "Panigale", 1000);

startTransport(sedan);      // Works with Automobile
startTransport(sportBike);  // Works with Motorcycle

// ==========================================
// Example 3: Compile-time Polymorphism (Method Overloading)
// ==========================================

class MathOperations {
    // Method overloading in TypeScript
    add(a: number, b: number): number;
    add(a: string, b: string): string;
    add(a: any, b: any): any {
        if (typeof a === 'number' && typeof b === 'number') {
            return a + b;
        }
        return a.toString() + b.toString();
    }
}

const math = new MathOperations();
console.log(math.add(5, 10));          // Output: 15
console.log(math.add("Hello, ", "World"));  // Output: Hello, World

// ==========================================
// Example 4: Real-world Example - Media Player
// ==========================================

// Abstract base class for all media types
abstract class MediaFile {
    protected filename: string;
    protected fileSize: number;

    constructor(filename: string, fileSize: number) {
        this.filename = filename;
        this.fileSize = fileSize;
    }

    getInfo(): string {
        return `${this.filename} (${this.fileSize} MB)`;
    }

    // Abstract methods that must be implemented by all media types
    abstract play(): void;
    abstract pause(): void;
    abstract stop(): void;
}

// Audio file implementation
class AudioFile extends MediaFile {
    private artist: string;
    private duration: number; // in seconds

    constructor(filename: string, fileSize: number, artist: string, duration: number) {
        super(filename, fileSize);
        this.artist = artist;
        this.duration = duration;
    }

    play(): void {
        console.log(`🎵 Playing audio: ${this.filename} by ${this.artist} (${this.formatDuration()})`);
    }

    pause(): void {
        console.log(`⏸️ Paused audio: ${this.filename}`);
    }

    stop(): void {
        console.log(`⏹️ Stopped audio: ${this.filename}`);
    }

    private formatDuration(): string {
        const minutes = Math.floor(this.duration / 60);
        const seconds = this.duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Video file implementation
class VideoFile extends MediaFile {
    private resolution: string;
    private duration: number; // in seconds

    constructor(filename: string, fileSize: number, resolution: string, duration: number) {
        super(filename, fileSize);
        this.resolution = resolution;
        this.duration = duration;
    }

    play(): void {
        console.log(`🎬 Playing video: ${this.filename} at ${this.resolution} (${this.formatDuration()})`);
    }

    pause(): void {
        console.log(`⏸️ Paused video: ${this.filename}`);
    }

    stop(): void {
        console.log(`⏹️ Stopped video: ${this.filename}`);
    }

    private formatDuration(): string {
        const minutes = Math.floor(this.duration / 60);
        const seconds = this.duration % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
}

// Media player that can handle any media type
class MediaPlayer {
    private currentMedia: MediaFile | null = null;

    loadMedia(media: MediaFile): void {
        this.currentMedia = media;
        console.log(`Loaded media: ${media.getInfo()}`);
    }

    playMedia(): void {
        if (this.currentMedia) {
            this.currentMedia.play();
        } else {
            console.log("No media loaded");
        }
    }

    pauseMedia(): void {
        if (this.currentMedia) {
            this.currentMedia.pause();
        } else {
            console.log("No media loaded");
        }
    }

    stopMedia(): void {
        if (this.currentMedia) {
            this.currentMedia.stop();
        } else {
            console.log("No media loaded");
        }
    }
}

// Using the media player
const player = new MediaPlayer();

// Create different media types
const song = new AudioFile("song.mp3", 5.7, "The Beatles", 234);
const movie = new VideoFile("movie.mp4", 1200, "1080p", 7200);

// The player works with any MediaFile
player.loadMedia(song);
player.playMedia();  // Output: 🎵 Playing audio: song.mp3 by The Beatles (3:54)
player.pauseMedia(); // Output: ⏸️ Paused audio: song.mp3

player.loadMedia(movie);
player.playMedia();  // Output: 🎬 Playing video: movie.mp4 at 1080p (120:00)
player.stopMedia();  // Output: ⏹️ Stopped video: movie.mp4

// This demonstrates polymorphism - the MediaPlayer doesn't need to know
// what specific type of media it's playing, it just calls the appropriate methods
// and the correct implementation is determined at runtime.

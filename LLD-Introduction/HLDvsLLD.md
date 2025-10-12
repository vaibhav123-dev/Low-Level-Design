# High-Level Design vs. Low-Level Design

## The City Construction Analogy

In software engineering, building a complex system is like constructing a city.

You wouldn't start by laying bricks for a single house without a city plan. You first need to decide where the residential areas, commercial zones, power grids, and roads will go.

> This city plan is your **High-Level Design (HLD)**.

Once the city plan is approved, an architect takes a single plot of land in a residential zone and designs the detailed blueprint for a house specifying the number of rooms, the plumbing, the electrical wiring, and the materials to be used.

> This detailed house blueprint is your **Low-Level Design (LLD)**.

Both are essential, but they operate at different levels of abstraction and serve different purposes.

## Key Differences: HLD vs. LLD at a Glance

| Aspect | High-Level Design (HLD) | Low-Level Design (LLD) |
|--------|-------------------------|------------------------|
| **Focus** | What components exist | How each component is built |
| **Audience** | Architects, stakeholders | Engineers, developers |
| **Abstraction** | System-level | Module/class-level |
| **Artifacts** | System architecture diagrams, tech stack choices | Class diagrams, interaction diagrams, method definitions |
| **Example** | "We'll use a microservices architecture with services for users, orders, and payments" | "The OrderService will use a PaymentProcessor interface with two implementations: <br>- StripeProcessor<br>- RazorpayProcessor" |

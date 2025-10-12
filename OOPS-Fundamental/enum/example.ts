// Enum

enum OrderStatus {
    PLACED = 'PLACED',
    PENDING = 'PENDING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

// This enum defines a finite set of valid states an order can have. Nothing else is allowed.

// Using it in code:

const currentStatus : OrderStatus = OrderStatus.SHIPPED

if(currentStatus === OrderStatus.SHIPPED){
    console.log('Your package is on the way!')
}

// Enum with properties and methods

class Status {
  static Pending = new Status('PENDING', 'Waiting to start');
  static InProgress = new Status('IN_PROGRESS', 'Work in progress');
  static Completed = new Status('COMPLETED', 'Task completed');

  private constructor(
    public readonly code : string,
    public readonly label : string
  ){}

  isFinal() : boolean {
    return this == Status.Completed
  }

}

const currentStat = Status.InProgress;
console.log(currentStat.code) // In_PROGRESS
console.log(currentStat.label)  // Work in progress
console.log(currentStat.isFinal()) // false

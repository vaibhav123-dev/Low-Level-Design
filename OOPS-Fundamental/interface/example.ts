// Interface

interface PaymentGateway{
    initiatePayment(amount : number) : void;
}

// This interface defines the contract. Every payment gateway must provide a initiatePayment() method. But it doesn’t specify how each provider processes payments.

// Now you can create multiple implementations:

class StripePayment implements PaymentGateway {
    initiatePayment(amount: number): void {
        console.log(`Payment proccessing via Strip : ${amount} `)
    }
}

class RazorPayPayment implements PaymentGateway {
    initiatePayment(amount: number): void {
        console.log(`Payment processing via Razorpay : ${amount}`)
    }
}

// Both StripePayment and RazorpayPayment implement the same interface, but the actual logic for processing the payment is different.

class checkoutService {
    private paymentGateway : PaymentGateway;

    constructor(paymentGateway: PaymentGateway){
        this.paymentGateway = paymentGateway
    }

    setPaymentGateway(paymentGateway: PaymentGateway) : void {
        this.paymentGateway = paymentGateway
    }

    checkout( amount : number) : void {
        this.paymentGateway.initiatePayment(amount)
    }
}

const stripeGateway : StripePayment = new StripePayment()
const service = new checkoutService(stripeGateway)
service.checkout(120) //// Output: Processing payment via Stripe: 120

const razorPayGateway : RazorPayPayment = new RazorPayPayment()
service.setPaymentGateway(razorPayGateway)
service.checkout(180) // Output: Processing payment via Razorpay: 180
# Invoice payment flow

## Preview now
Navigation includes Pay an invoice. A direct link `#pay/AE-DEMO-1042` asks for code 482915. Lookup supports invoice ID or full service address plus code, then shows a fictional $300 invoice, explicit simulated payment and paid state. Invalid details use a generic error. The fixture and code are public demo data, not security. Refresh resets verification/payment state. No email, card data collection, charge or accounting change occurs.

## Production scope
1. Office issues an invoice from its chosen invoicing/accounting source and sends the customer a scoped invoice link with a code. Sending actual emails is not implemented or authorized by this preview.
2. Use an opaque random invoice reference in links. Verify an expiring code on the server before disclosing customer details or amounts. Hash codes, bind them to one invoice/customer, rate-limit attempts by invoice, IP and session, expire verification sessions and prevent enumeration. Never ship real invoice data or secrets in JavaScript or a public repository.
3. ID and address are identifiers, not proof of ownership. Address lookup requires full address including unit and ZIP plus an invoice-scoped code. If multiple invoices match, show only invoices authorized by the verified customer session. No public address search results. Recovery sends a new code only to the contact already recorded, with uniform responses and resend limits.
4. After verification, show scope, invoice ID, issued/due dates, itemized amounts, currency, balance and payment status from authoritative records. Office controls amounts; never trust a browser-supplied total.
5. Create a provider-hosted checkout server-side with invoice binding and idempotency. Provider choice remains an owner decision; Stripe Checkout is one supported design option. Keep payment details at the provider. Recheck outstanding balance and paid/void status before creating checkout; prevent duplicate active sessions and double charging.
6. A verified provider webhook establishes payment state, not the browser redirect. Verify signatures against raw payload, deduplicate events, handle retries and out-of-order updates, and reconcile paid amount/currency with the invoice. Support pending bank payments, failures, cancelled checkout, already-paid/void invoices, refunds and partial payments according to agreed office policy.
7. Send a receipt after authoritative settlement and reconcile with the invoicing system. Provide office audit history, refund permissions and a support path. Choose retention, tax and payment-method policies with the owner.

## Acceptance before live payments
Test provider sandbox: valid/invalid/expired codes; brute-force limits; cross-invoice access; shared addresses and units; invoice changes after checkout creation; double-click and duplicate webhooks; cancelled checkout; failed and asynchronous payments; already-paid/void states; refund reconciliation; mobile and keyboard navigation. Production requires backend hosting, provider account/configuration and signed webhook processing; GitHub Pages remains the frontend only.

References: [Stripe hosted checkout](https://docs.stripe.com/payments/checkout) and [webhook handling](https://docs.stripe.com/webhooks). This architecture is a proposed implementation, not a connected payment service.

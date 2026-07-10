'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

export default function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />
      {error && (
        <p role="alert" className="text-sm text-signal">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || submitting}
        className="focus-ring w-full rounded-md bg-amber px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-signal disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Processing…' : 'Pay & submit order'}
      </button>
    </form>
  );
}

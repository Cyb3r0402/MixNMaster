import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sendOrderNotification, sendCustomerConfirmation } from '@/lib/email';
import Stripe from 'stripe';

// Stripe needs the raw request body to verify the webhook signature.
export const runtime = 'nodejs';

const emailNotificationsEnabled = process.env.DISABLE_EMAIL_NOTIFICATIONS !== 'true';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent;
    const m = pi.metadata;

    const fileCount = Number(m.file_count || '0');
    const files = Array.from({ length: fileCount }, (_, i) => ({
      name: m[`file_${i}_name`] || `file-${i + 1}`,
      url: m[`file_${i}_url`] || '',
    })).filter((f) => f.url);

    const customerEmail = m.customer_email || pi.receipt_email || 'unknown';

    if (emailNotificationsEnabled) {
      try {
        await sendOrderNotification({
          customerName: m.customer_name || 'Unknown',
          customerEmail,
          service: m.service || 'Unknown service',
          revisions: m.revisions || '1',
          notes: m.notes || '',
          referenceLinks: m.reference_links || '',
          amountUsd: (pi.amount / 100).toFixed(2),
          files,
        });
      } catch (err) {
        console.error('Failed to send order notification email:', err);
        // Don't fail the webhook — Stripe will retry and you'd double-email.
        // Log this to your error tracker so you can resend manually if needed.
      }

      try {
        await sendCustomerConfirmation({
          customerName: m.customer_name || 'there',
          customerEmail,
          service: m.service || 'Unknown service',
          revisions: m.revisions || '1',
          amountUsd: (pi.amount / 100).toFixed(2),
          fileCount: files.length,
        });
      } catch (err) {
        console.error('Failed to send customer confirmation email:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}

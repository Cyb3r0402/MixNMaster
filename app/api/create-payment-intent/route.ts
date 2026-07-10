import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { priceInCents, SERVICES, type ServiceId } from '@/lib/pricing';

interface UploadedFile {
  url: string;
  name: string;
}

interface OrderPayload {
  name: string;
  email: string;
  service: ServiceId;
  revisions: number;
  notes: string;
  referenceLinks: string;
  files: UploadedFile[];
}

const MAX_FILES = 10;

export async function POST(request: Request) {
  const payload = (await request.json()) as OrderPayload;

  if (!payload.name || !payload.email || !payload.service) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
  }
  if (!SERVICES[payload.service]) {
    return NextResponse.json({ error: 'Invalid service selected.' }, { status: 400 });
  }
  if (!payload.files || payload.files.length === 0) {
    return NextResponse.json({ error: 'Please upload at least one file.' }, { status: 400 });
  }
  if (payload.files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Please zip your files — max ${MAX_FILES} individual uploads.` },
      { status: 400 },
    );
  }

  const amount = priceInCents(payload.service, payload.revisions || 1);

  const metadata: Record<string, string> = {
    customer_name: payload.name,
    customer_email: payload.email,
    service: SERVICES[payload.service].label,
    revisions: String(payload.revisions || 1),
    notes: (payload.notes || '').slice(0, 480),
    reference_links: (payload.referenceLinks || '').slice(0, 480),
    file_count: String(payload.files.length),
  };

  payload.files.forEach((file, i) => {
    metadata[`file_${i}_url`] = file.url.slice(0, 480);
    metadata[`file_${i}_name`] = file.name.slice(0, 100);
  });

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: 'Payment processing not configured.' }, { status: 500 });
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
    receipt_email: payload.email,
    metadata,
    description: `${SERVICES[payload.service].label} — ${payload.name}`,
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
    amount,
  });
}

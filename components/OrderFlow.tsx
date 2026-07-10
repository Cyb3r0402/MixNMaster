'use client';

import { useState, useRef } from 'react';
import { upload } from '@vercel/blob/client';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe-client';
import { SERVICES, priceInCents, type ServiceId } from '@/lib/pricing';
import CheckoutForm from './CheckoutForm';

type Step = 'details' | 'uploading' | 'payment' | 'done';

interface UploadedFile {
  name: string;
  url: string;
}

export default function OrderFlow() {
  const [step, setStep] = useState<Step>('details');
  const [service, setService] = useState<ServiceId>('mix_master');
  const [revisions, setRevisions] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [referenceLinks, setReferenceLinks] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const amount = priceInCents(service, revisions);

  async function handleDetailsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (files.length === 0) {
      setError('Add at least one audio file (or a zip of your stems).');
      return;
    }

    setStep('uploading');

    try {
      const uploaded: UploadedFile[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`Uploading ${i + 1} of ${files.length}: ${file.name}`);
        const blob = await upload(file.name, file, {
          access: 'private',
          handleUploadUrl: '/api/upload',
        });
        uploaded.push({ name: file.name, url: blob.url });
      }

      setUploadProgress('Creating your order…');
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service,
          revisions,
          notes,
          referenceLinks,
          files: uploaded,
        }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || 'Could not start checkout.');
      }

      const { clientSecret } = await res.json();
      setClientSecret(clientSecret);
      setStep('payment');
    } catch (err) {
      setError((err as Error).message);
      setStep('details');
    }
  }

  if (step === 'done') {
    return (
      <div className="rounded-lg border border-line bg-surface p-10 text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-safe">Order confirmed</p>
        <h3 className="mt-3 font-display text-3xl font-bold">Your files are in the queue.</h3>
        <p className="mt-3 text-paper/70">
          We emailed a receipt to {email}. You&apos;ll hear from us at that same address once your
          {' '}{SERVICES[service].label.toLowerCase()} is ready for review.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-line bg-surface p-6 sm:p-10">
      {step !== 'payment' ? (
        <form onSubmit={handleDetailsSubmit} className="space-y-8">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber">Step 1</span>
            <h3 className="font-display text-2xl font-bold">Choose your service</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {(Object.keys(SERVICES) as ServiceId[]).map((id) => (
                <button
                  type="button"
                  key={id}
                  onClick={() => setService(id)}
                  className={`focus-ring rounded-md border p-4 text-left transition ${
                    service === id
                      ? 'border-amber bg-amber/10'
                      : 'border-line hover:border-paper/40'
                  }`}
                >
                  <p className="font-display text-lg font-bold">{SERVICES[id].label}</p>
                  <p className="mt-1 text-sm text-paper/60">{SERVICES[id].description}</p>
                  <p className="mt-2 font-mono text-amber">${SERVICES[id].priceUsd}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber">Step 2</span>
            <h3 className="font-display text-2xl font-bold">Your details</h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <input
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="focus-ring rounded-md border border-line bg-ink px-4 py-3 placeholder:text-paper/40"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="focus-ring rounded-md border border-line bg-ink px-4 py-3 placeholder:text-paper/40"
              />
              <input
                placeholder="Reference tracks (links, optional)"
                value={referenceLinks}
                onChange={(e) => setReferenceLinks(e.target.value)}
                className="focus-ring rounded-md border border-line bg-ink px-4 py-3 placeholder:text-paper/40 sm:col-span-2"
              />
              <textarea
                placeholder="Notes — genre, mood, anything to know about the track"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="focus-ring rounded-md border border-line bg-ink px-4 py-3 placeholder:text-paper/40 sm:col-span-2"
              />
              <label className="flex items-center gap-2 text-sm text-paper/70">
                Revisions included
                <select
                  value={revisions}
                  onChange={(e) => setRevisions(Number(e.target.value))}
                  className="focus-ring rounded-md border border-line bg-ink px-3 py-2"
                >
                  <option value={1}>1 (included)</option>
                  <option value={2}>2 (+$25)</option>
                  <option value={3}>3 (+$50)</option>
                </select>
              </label>
            </div>
          </div>

          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber">Step 3</span>
            <h3 className="font-display text-2xl font-bold">Upload your stems or song</h3>
            <p className="mt-1 text-sm text-paper/60">
              WAV, AIFF, MP3, FLAC, or a ZIP of your stems. Up to 500MB per file.
            </p>
            <input
              ref={fileInputRef}
              required
              type="file"
              multiple
              accept="audio/*,.zip"
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="focus-ring mt-4 block w-full rounded-md border border-dashed border-line bg-ink px-4 py-6 text-sm file:mr-4 file:rounded file:border-0 file:bg-amber file:px-4 file:py-2 file:font-bold file:text-ink"
            />
            {files.length > 0 && (
              <ul className="mt-3 font-mono text-sm text-paper/70">
                {files.map((f) => (
                  <li key={f.name}>· {f.name}</li>
                ))}
              </ul>
            )}
          </div>

          {error && (
            <p role="alert" className="text-sm text-signal">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between border-t border-line pt-6">
            <p className="font-mono text-sm text-paper/60">
              Total:{' '}
              <span className="text-lg text-amber">${(amount / 100).toFixed(2)}</span>
            </p>
            <button
              type="submit"
              disabled={step === 'uploading'}
              className="focus-ring rounded-md bg-amber px-6 py-3 font-display text-lg font-bold uppercase tracking-wide text-ink transition hover:bg-signal disabled:opacity-50"
            >
              {step === 'uploading' ? uploadProgress || 'Uploading…' : 'Continue to payment'}
            </button>
          </div>
        </form>
      ) : (
        clientSecret && (
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber">Step 4</span>
            <h3 className="mb-6 font-display text-2xl font-bold">Payment</h3>
            <Elements
              stripe={getStripe()}
              options={{ clientSecret, appearance: stripeAppearance }}
            >
              <CheckoutForm onSuccess={() => setStep('done')} />
            </Elements>
          </div>
        )
      )}
    </div>
  );
}

const stripeAppearance = {
  theme: 'night' as const,
  variables: {
    colorPrimary: '#F2A93B',
    colorBackground: '#0E0D0C',
    colorText: '#F4EEE1',
    borderRadius: '6px',
    fontFamily: 'Inter, sans-serif',
  },
};

export type ServiceId = 'mix' | 'master' | 'mix_master';

export const SERVICES: Record<ServiceId, { label: string; description: string; priceUsd: number }> = {
  mix: {
    label: 'Mix only',
    description: 'Balance, EQ, compression, and space across your stems.',
    priceUsd: 150,
  },
  master: {
    label: 'Master only',
    description: 'Final polish and loudness on an already-mixed track.',
    priceUsd: 60,
  },
  mix_master: {
    label: 'Mix + Master',
    description: 'Full signal chain, stems to a release-ready master.',
    priceUsd: 190,
  },
};

export function priceInCents(service: ServiceId, revisions: number): number {
  const base = SERVICES[service].priceUsd;
  const extraRevisions = Math.max(0, revisions - 1) * 25; // first revision included
  return Math.round((base + extraRevisions) * 100);
}

// Local-first persistence for GigCrypt. Data lives only in the browser's
// localStorage under one key, so the app works offline and costs nothing
// to host. Export/import as JSON keeps the data portable.

import { createGig, type Gig, type GigKind, type GigStatus } from './types'

const STORAGE_KEY = 'gigcrypt.gigs.v1'

export function loadGigs(): Gig[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedGigs()
    const parsed = JSON.parse(raw) as Gig[]
    if (!Array.isArray(parsed)) return seedGigs()
    return parsed
  } catch {
    return []
  }
}

export function saveGigs(gigs: Gig[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gigs))
}

export function exportGigs(gigs: Gig[]): string {
  return JSON.stringify({ app: 'gigcrypt', version: 1, exportedAt: new Date().toISOString(), gigs }, null, 2)
}

const STATUSES: GigStatus[] = ['hunting', 'submitted', 'won', 'lost', 'paid']

const KIND_VALUES: GigKind[] = ['bounty', 'freelance', 'job', 'other']

const STATUS_VALUES: GigStatus[] = ['hunting', 'submitted', 'won', 'lost', 'paid']

function isValidDate(s: unknown): s is string {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s)
}

/** Validate one raw object from an import file. Unknown or missing
    fields fall back to safe defaults; unusable entries return null. */
function sanitizeGig(raw: unknown): Gig | null {
  if (!raw || typeof raw !== 'object') return null
  const r = raw as Record<string, unknown>
  if (typeof r.id !== 'string' || !r.id) return null
  if (typeof r.title !== 'string' || !r.title.trim()) return null
  if (!isValidDate(r.deadline)) return null
  const now = new Date().toISOString()
  return {
    id: r.id,
    title: r.title.trim(),
    platform: typeof r.platform === 'string' && r.platform.trim() ? r.platform.trim() : 'Unknown crypt',
    kind: KIND_VALUES.includes(r.kind as GigKind) ? (r.kind as GigKind) : 'other',
    prizeUsd: typeof r.prizeUsd === 'number' && Number.isFinite(r.prizeUsd) ? Math.max(0, r.prizeUsd) : 0,
    currency: 'USD',
    deadline: r.deadline,
    status: STATUS_VALUES.includes(r.status as GigStatus) ? (r.status as GigStatus) : 'hunting',
    notes: typeof r.notes === 'string' ? r.notes : '',
    createdAt: typeof r.createdAt === 'string' ? r.createdAt : now,
    updatedAt: typeof r.updatedAt === 'string' ? r.updatedAt : now,
  }
}

export interface ImportResult {
  gigs: Gig[]
  /** Entries that were skipped because they failed validation. */
  rejected: number
}

/**
 * Parse a GigCrypt JSON export (wrapped `{ gigs: [...] }`, or a bare
 * array for convenience). Throws on malformed JSON or a missing gigs
 * array; invalid entries are counted in `rejected`, never fatal.
 */
export function importGigs(json: string): ImportResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(json)
  } catch {
    throw new Error('That file is not valid JSON.')
  }
  const rawList = Array.isArray(parsed)
    ? parsed
    : (parsed as { gigs?: unknown } | null)?.gigs
  if (!Array.isArray(rawList)) {
    throw new Error('File is not a GigCrypt export (missing "gigs" array).')
  }
  const gigs: Gig[] = []
  let rejected = 0
  for (const raw of rawList) {
    const gig = sanitizeGig(raw)
    if (gig) gigs.push(gig)
    else rejected++
  }
  return { gigs, rejected }
}

// First-run demo data so a new visitor immediately sees the board alive.
// Marked clearly as samples; one click ("Bury the samples") clears them.
function seedGigs(): Gig[] {
  const iso = (daysFromNow: number) => {
    const d = new Date()
    d.setDate(d.getDate() + daysFromNow)
    return d.toISOString().slice(0, 10)
  }
  return [
    createGig({
      title: 'Build a haunted dashboard',
      platform: 'Kiroween 2026',
      kind: 'bounty',
      prizeUsd: 5000,
      currency: 'USD',
      deadline: '2026-12-04',
      status: 'hunting',
      notes: 'Sample gig — Costume Contest category. Delete me from the board.',
    }),
    createGig({
      title: 'Landing page for a local bakery',
      platform: 'Direct client',
      kind: 'freelance',
      prizeUsd: 150,
      currency: 'USD',
      deadline: iso(6),
      status: 'submitted',
      notes: 'Sample gig — proposal sent, waiting for the client.',
    }),
    createGig({
      title: 'Admin staff application',
      platform: 'Job portal',
      kind: 'job',
      prizeUsd: 0,
      currency: 'USD',
      deadline: iso(-2),
      status: 'submitted',
      notes: 'Sample gig — deadline passed, still waiting to hear back. Spooky.',
    }),
  ]
}

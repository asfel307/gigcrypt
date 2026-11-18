// GigCrypt data model. Everything is local-first: no account, no server,
// no tracking. A gig is any paid opportunity being chased — a coding
// bounty, a freelance job, a survey-free side task, a job application.

export type GigStatus = 'hunting' | 'submitted' | 'won' | 'lost' | 'paid'

export type GigKind = 'bounty' | 'freelance' | 'job' | 'other'

export interface Gig {
  id: string
  title: string
  platform: string
  kind: GigKind
  prizeUsd: number
  currency: 'USD'
  deadline: string // ISO date, e.g. "2026-12-04"
  status: GigStatus
  notes: string
  createdAt: string // ISO timestamp
  updatedAt: string // ISO timestamp
}

export const STATUS_LABELS: Record<GigStatus, string> = {
  hunting: '👻 Hunting',
  submitted: '📬 Submitted',
  won: '🏆 Won',
  lost: '🪦 Lost',
  paid: '💰 Paid',
}

export const KIND_LABELS: Record<GigKind, string> = {
  bounty: 'Bounty',
  freelance: 'Freelance',
  job: 'Job application',
  other: 'Other',
}

/** Days from today until the deadline. Negative = overdue (a risen dead-line). */
export function daysUntil(gig: Gig, now = new Date()): number {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const [y, m, d] = gig.deadline.split('-').map(Number)
  const due = new Date(y, m - 1, d)
  return Math.round((due.getTime() - today.getTime()) / 86_400_000)
}

export function isOverdue(gig: Gig, now = new Date()): boolean {
  return (
    (gig.status === 'hunting' || gig.status === 'submitted') &&
    daysUntil(gig, now) < 0
  )
}

/** A gig is "due soon" if it is still open and its deadline is within
    the next `days` days (including today). Overdue gigs are not "due
    soon" — they already rose. */
export function isDueSoon(gig: Gig, days = 3, now = new Date()): boolean {
  const open = gig.status === 'hunting' || gig.status === 'submitted'
  if (!open) return false
  const d = daysUntil(gig, now)
  return d >= 0 && d <= days
}

/** Seed demo gigs are marked by their notes prefix, so one click can
    bury all of them ("Bury the samples"). */
export function isSampleGig(gig: Gig): boolean {
  return gig.notes.startsWith('Sample gig')
}

export type GigSort = 'deadline-asc' | 'deadline-desc' | 'prize-desc' | 'newest'

export const SORT_LABELS: Record<GigSort, string> = {
  'deadline-asc': '⏳ Soonest deadline',
  'deadline-desc': '🗓️ Latest deadline',
  'prize-desc': '💰 Highest prize',
  newest: '✨ Newest added',
}

export function sortGigs(gigs: Gig[], sort: GigSort): Gig[] {
  const copy = [...gigs]
  switch (sort) {
    case 'deadline-asc':
      return copy.sort((a, b) => a.deadline.localeCompare(b.deadline) || b.createdAt.localeCompare(a.createdAt))
    case 'deadline-desc':
      return copy.sort((a, b) => b.deadline.localeCompare(a.deadline) || b.createdAt.localeCompare(a.createdAt))
    case 'prize-desc':
      return copy.sort((a, b) => b.prizeUsd - a.prizeUsd || a.deadline.localeCompare(b.deadline))
    case 'newest':
      return copy.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  }
}

/** Case-insensitive match against title, platform, kind and notes. */
export function matchesSearch(gig: Gig, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return [gig.title, gig.platform, gig.kind, gig.notes]
    .join(' ')
    .toLowerCase()
    .includes(q)
}

export function newGigId(): string {
  return `gig_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export function createGig(input: Omit<Gig, 'id' | 'createdAt' | 'updatedAt'>): Gig {
  const now = new Date().toISOString()
  return { ...input, id: newGigId(), createdAt: now, updatedAt: now }
}

# Design — GigCrypt

## Architecture
Single-page React app, no backend. State lives in `App.tsx`
(`useState<Gig[]>`), persistence in `src/lib/store.ts`
(localStorage), domain rules in `src/lib/types.ts`.

```
User input → App.tsx (state + update()) → localStorage
                ↓
        StatsBar (derived with useMemo)
        GigBoard (filter + list)
        GigForm (create)
```

Derived data (pipeline value, overdue count) is computed from the
gig list with `useMemo`, never stored separately — one source of
truth, no drift.

## Data model
```ts
Gig {
  id: string        // gig_<base36 time>_<random>
  title: string
  platform: string
  kind: 'bounty' | 'freelance' | 'job' | 'other'
  prizeUsd: number
  currency: 'USD'   // fixed in v1; multi-currency is v1.1
  deadline: string  // YYYY-MM-DD
  status: 'hunting' | 'submitted' | 'won' | 'lost' | 'paid'
  notes: string
  createdAt / updatedAt: ISO timestamps
}
```

## Visual design
- Palette: `#0d0716` background, `#1a1033` panels, `#ff7a1a`
  pumpkin primary, `#7dffb2` ectoplasm for healthy states,
  `#ff5470` blood red for overdue.
- One ghost mascot (👻, floating animation) in the hero; no other
  decorative animation, so the board stays fast and readable.
- Overdue cards: red left border + red glow + ☠️ text.

## Error handling
- Corrupt localStorage → fall back to an empty board (never crash).
- Bad import file → show an error message, keep existing data.
- Missing title or deadline → the Summon button stays disabled.

## Testing (manual, v1)
- Add → reload → gig is still there.
- Set a deadline in the past → card turns red with ☠️ copy.
- Move a gig to Paid → paid total increases, pipeline decreases.
- Export → clear browser data → import → gigs return.

# Requirements — GigCrypt (Kiroween 2026, Costume Contest)

## 1. Track gigs
- **R1.1** The user can add a gig with title, platform, kind
  (bounty / freelance / job / other), prize in USD, and deadline.
- **R1.2** The user can move a gig between statuses: Hunting →
  Submitted → Won → Paid, or Lost at any point.
- **R1.3** The user can delete ("bury") a gig.
- **R1.4** All gigs persist across page reloads (localStorage).

## 2. Deadlines that refuse to stay buried
- **R2.1** Each gig shows days left until its deadline.
- **R2.2** A gig past its deadline while still Hunting/Submitted is
  flagged "risen from the dead" (☠️, red glow) and counted separately.
- **R2.3** A gig due today is flagged "Due TODAY".

## 3. Money overview
- **R3.1** The header shows: total gigs, active gigs, pipeline value
  (sum of prizes of Hunting + Submitted), paid total, overdue count.
- **R3.2** Money is formatted in USD with no cents.

## 4. Find and move data
- **R4.1** The user can filter the board by status.
- **R4.2** The user can export all gigs as a JSON file.
- **R4.3** The user can import a previously exported JSON file.
  Done in v1.0 (19 Nov): wrapped `{ gigs: [...] }` or bare array,
  invalid entries rejected with a count, duplicate IDs skipped,
  existing data never wiped on a bad file.

## 5. Haunted experience (Costume Contest)
- **R5.1** Dark graveyard theme: near-black purple background,
  pumpkin-orange accents, ectoplasm green for healthy items.
- **R5.2** Spooky copy supports the function: "Summon a new gig",
  "The Crypt", "Bury", "risen dead-lines".
- **R5.3** The theme never hides information: overdue state is
  visible by text and color, never color alone.
- **R5.4** Works on a phone browser (responsive, tap targets ≥ 40px).

## 6. Free to run
- **R6.1** Zero runtime cost: static hosting, no server, no paid API.
- **R6.2** Works offline after first load; no network calls at runtime.

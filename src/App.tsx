import { useMemo, useRef, useState } from 'react'
import {
  createGig,
  daysUntil,
  isDueSoon,
  isOverdue,
  isSampleGig,
  matchesSearch,
  sortGigs,
  STATUS_LABELS,
  SORT_LABELS,
  type Gig,
  type GigKind,
  type GigSort,
  type GigStatus,
} from './lib/types'
import { exportGigs, importGigs, loadGigs, saveGigs } from './lib/store'
import './styles.css'

const STATUSES: GigStatus[] = ['hunting', 'submitted', 'won', 'lost', 'paid']

const EMPTY_COPY: Record<'all' | GigStatus, string> = {
  all: 'The crypt is empty. No gigs haunt this place… yet. 👻',
  hunting: 'Nothing being hunted right now. Summon a gig above and the hunt begins. 👻',
  submitted: 'No submissions yet — the mailbox is empty and the ghosts are bored. 📬',
  won: 'No wins in the crypt yet. Keep hunting — the next trophy is out there. 🏆',
  lost: 'No lost gigs. Either you never lose, or nothing has been buried here. 🪦',
  paid: 'No coins in the coffin yet. Move a won gig to Paid when the money lands. 💰',
}

function money(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function deadlineText(gig: Gig): string {
  const d = daysUntil(gig)
  if (gig.status === 'paid' || gig.status === 'won') return `Due ${gig.deadline}`
  if (d < 0) return `☠️ ${-d}d overdue — it rose from the dead!`
  if (d === 0) return '⏰ Due TODAY'
  if (d === 1) return '⏰ Due tomorrow'
  return `⏳ ${d} days left`
}

function dueSoonText(gig: Gig): string {
  const d = daysUntil(gig)
  if (d === 0) return `⏰ Due TODAY — the spirits won't wait!`
  if (d === 1) return '⏰ Due tomorrow — the clock tolls!'
  return `⌛ ${d} days left before the grave claims it`
}

export default function App() {
  const [gigs, setGigs] = useState<Gig[]>(loadGigs)
  const [title, setTitle] = useState('')
  const [platform, setPlatform] = useState('')
  const [kind, setKind] = useState<GigKind>('bounty')
  const [prizeUsd, setPrizeUsd] = useState('')
  const [deadline, setDeadline] = useState('')
  const [filter, setFilter] = useState<'all' | GigStatus>('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState<GigSort>('deadline-asc')
  const [notice, setNotice] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const update = (next: Gig[]) => {
    setGigs(next)
    saveGigs(next)
  }

  const stats = useMemo(() => {
    const active = gigs.filter((g) => g.status === 'hunting' || g.status === 'submitted')
    const paid = gigs.filter((g) => g.status === 'paid').reduce((s, g) => s + g.prizeUsd, 0)
    const pipeline = active.reduce((s, g) => s + g.prizeUsd, 0)
    const overdue = gigs.filter((g) => isOverdue(g)).length
    return { active: active.length, paid, pipeline, overdue, total: gigs.length }
  }, [gigs])

  const dueSoon = useMemo(
    () => gigs.filter((g) => isDueSoon(g, 3)).sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [gigs],
  )

  const sampleCount = useMemo(() => gigs.filter(isSampleGig).length, [gigs])

  const visible = useMemo(() => {
    const byStatus = filter === 'all' ? gigs : gigs.filter((g) => g.status === filter)
    const bySearch = byStatus.filter((g) => matchesSearch(g, search))
    return sortGigs(bySearch, sort)
  }, [gigs, filter, search, sort])

  const addGig = () => {
    if (!title.trim() || !deadline) return
    const gig = createGig({
      title: title.trim(),
      platform: platform.trim() || 'Unknown crypt',
      kind,
      prizeUsd: Math.max(0, Number(prizeUsd) || 0),
      currency: 'USD',
      deadline,
      status: 'hunting',
      notes: '',
    })
    update([gig, ...gigs])
    setTitle('')
    setPlatform('')
    setPrizeUsd('')
    setDeadline('')
  }

  const setStatus = (id: string, status: GigStatus) =>
    update(gigs.map((g) => (g.id === id ? { ...g, status, updatedAt: new Date().toISOString() } : g)))

  const removeGig = (id: string) => update(gigs.filter((g) => g.id !== id))

  const burySamples = () => {
    const kept = gigs.filter((g) => !isSampleGig(g))
    update(kept)
    setNotice(`🪦 Buried ${sampleCount} sample gig${sampleCount === 1 ? '' : 's'}. The crypt is yours now.`)
  }

  const downloadExport = () => {
    const blob = new Blob([exportGigs(gigs)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'gigcrypt-export.json'
    a.click()
    URL.revokeObjectURL(url)
    setNotice(`⬇ Exported ${gigs.length} gig${gigs.length === 1 ? '' : 's'} as gigcrypt-export.json.`)
  }

  const handleImportFile = async (file: File) => {
    try {
      const text = await file.text()
      const { gigs: incoming, rejected } = importGigs(text)
      const existingIds = new Set(gigs.map((g) => g.id))
      const fresh = incoming.filter((g) => !existingIds.has(g.id))
      const duplicates = incoming.length - fresh.length
      update([...fresh, ...gigs])
      const parts = [`✅ Imported ${fresh.length} gig${fresh.length === 1 ? '' : 's'}`]
      if (duplicates > 0) parts.push(`${duplicates} already in the crypt — skipped`)
      if (rejected > 0) parts.push(`${rejected} invalid ${rejected === 1 ? 'entry' : 'entries'} rejected`)
      setNotice(`${parts.join(' · ')}.`)
    } catch (err) {
      setNotice(`❌ Import failed: ${err instanceof Error ? err.message : 'unreadable file'}. Your gigs were not changed.`)
    }
  }

  return (
    <div className="crypt">
      <header className="hero">
        <div className="ghost" aria-hidden>👻</div>
        <h1>GigCrypt</h1>
        <p className="tagline">Where dead gigs rise again.</p>
        <p className="sub">
          One haunted board for every bounty, freelance gig and job application you are chasing —
          with deadlines that refuse to stay buried.
        </p>
      </header>

      <section className="stats" aria-label="Totals">
        <div className="stat"><span className="num">{stats.total}</span><span className="lbl">gigs in the crypt</span></div>
        <div className="stat"><span className="num">{stats.active}</span><span className="lbl">still hunting</span></div>
        <div className="stat"><span className="num">{money(stats.pipeline)}</span><span className="lbl">in the pipeline</span></div>
        <div className="stat"><span className="num">{money(stats.paid)}</span><span className="lbl">already paid 💰</span></div>
        <div className={`stat ${stats.overdue ? 'danger' : ''}`}><span className="num">{stats.overdue}</span><span className="lbl">risen dead-lines ☠️</span></div>
      </section>

      <section className="panel">
        <h2>🕯️ Summon a new gig</h2>
        <div className="form">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Gig title — e.g. Build a portfolio site" />
          <input value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Platform — e.g. make.fun" />
          <select value={kind} onChange={(e) => setKind(e.target.value as GigKind)}>
            <option value="bounty">Bounty</option>
            <option value="freelance">Freelance</option>
            <option value="job">Job application</option>
            <option value="other">Other</option>
          </select>
          <input value={prizeUsd} onChange={(e) => setPrizeUsd(e.target.value)} placeholder="Prize / pay (USD)" inputMode="decimal" />
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} aria-label="Deadline" />
          <button onClick={addGig} disabled={!title.trim() || !deadline}>Summon 👻</button>
        </div>
      </section>

      {dueSoon.length > 0 && (
        <section className="due-soon-strip" aria-label="Due soon">
          <h2 className="due-soon-heading">🕯️ Due in the next 3 days</h2>
          <ul className="due-soon-list">
            {dueSoon.map((gig) => (
              <li key={gig.id} className="due-soon-item">
                <span className="due-soon-title">{gig.title}</span>
                <span className="due-soon-platform">{gig.platform}</span>
                <span className="due-soon-time">{dueSoonText(gig)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="panel">
        <div className="board-head">
          <h2>⚰️ The Crypt</h2>
          <div className="filters">
            <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All</button>
            {STATUSES.map((s) => (
              <button key={s} className={filter === s ? 'on' : ''} onClick={() => setFilter(s)}>
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="board-tools">
          <input
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search the crypt… (title, platform, notes)"
            aria-label="Search gigs"
          />
          <select value={sort} onChange={(e) => setSort(e.target.value as GigSort)} aria-label="Sort gigs">
            {(Object.keys(SORT_LABELS) as GigSort[]).map((s) => (
              <option key={s} value={s}>{SORT_LABELS[s]}</option>
            ))}
          </select>
          <button className="ghost-btn" onClick={downloadExport}>⬇ Export JSON</button>
          <button className="ghost-btn" onClick={() => fileRef.current?.click()}>⬆ Import JSON</button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleImportFile(file)
              e.target.value = ''
            }}
          />
          {sampleCount > 0 && (
            <button className="ghost-btn" onClick={burySamples} title="Remove the demo sample gigs">
              🪦 Bury the samples ({sampleCount})
            </button>
          )}
        </div>

        {notice && (
          <p className="notice" role="status">
            {notice}
            <button className="notice-x" onClick={() => setNotice(null)} aria-label="Dismiss">✕</button>
          </p>
        )}

        {visible.length === 0 ? (
          <p className="empty">
            {search.trim()
              ? `No gigs match “${search.trim()}”. Try another word — the ghosts hide well. 🔍`
              : EMPTY_COPY[filter]}
          </p>
        ) : (
          <ul className="gigs">
            {visible.map((gig) => (
              <li key={gig.id} className={`gig ${isOverdue(gig) ? 'overdue' : ''}`}>
                <div className="gig-top">
                  <strong>{gig.title}</strong>
                  <span className="prize">{gig.prizeUsd > 0 ? money(gig.prizeUsd) : '—'}</span>
                </div>
                <div className="gig-meta">{gig.platform} · {gig.kind}</div>
                <div className="gig-deadline">{deadlineText(gig)}</div>
                {gig.notes && <div className="gig-notes">{gig.notes}</div>}
                <div className="gig-actions">
                  <select value={gig.status} onChange={(e) => setStatus(gig.id, e.target.value as GigStatus)} aria-label="Status">
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                  <button className="bury" onClick={() => removeGig(gig.id)} title="Bury this gig">🪦 Bury</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer>
        <p>GigCrypt · Kiroween 2026 · Built with Kiro · Your data never leaves your browser.</p>
      </footer>
    </div>
  )
}

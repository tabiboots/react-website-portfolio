import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { SidewaysBio } from '../components/SidewaysBio'
import { Media } from '../components/Media'
import { PROJECTS } from '../data/projects'
import { useIsMobile } from '../hooks/useIsMobile'

function ProjectRow({ p, isHover, anyHover, onHover, isLast }) {
  const dim = anyHover && !isHover
  return (
    <li
      onMouseEnter={() => onHover(p.slug)}
      onMouseLeave={() => onHover(null)}
      style={{ borderBottom: isLast ? 'none' : '1px solid var(--hairline)', opacity: dim ? 0.35 : 1, transition: 'opacity 240ms ease' }}
    >
      <Link
        to={`/project/${p.slug}`}
        style={{
          display: 'grid',
          gridTemplateColumns: 'clamp(180px, 25vw, 360px) 1fr auto',
          alignItems: 'center',
          gap: 32,
          padding: '28px 0',
          color: p.accent ? 'var(--accent)' : 'var(--fg)',
        }}
      >
        <div style={{ transform: isHover ? 'scale(1.02)' : 'scale(1)', transition: 'transform 380ms cubic-bezier(.2,.7,.2,1)' }}>
          <Media
            media={p.cover}
            style={{ aspectRatio: '16/10', filter: isHover ? 'none' : 'saturate(0.96)', transition: 'filter 240ms ease' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h2
            className="project-title"
            style={{
              fontSize: 26,
              fontWeight: 600,
              margin: 0,
              letterSpacing: '-0.012em',
              transform: isHover ? 'translateX(6px)' : 'translateX(0)',
              transition: 'transform 320ms cubic-bezier(.2,.7,.2,1)',
            }}
          >
            {p.title}
          </h2>
          <span className="mono" style={{ color: p.accent ? 'var(--accent)' : 'var(--muted)' }}>
            {p.year} &nbsp;·&nbsp; {p.medium}
          </span>
          <p
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 16,
              lineHeight: 1.45,
              color: 'var(--muted)',
              margin: '8px 0 0',
              maxWidth: 540,
              opacity: isHover ? 1 : 0.6,
              transform: isHover ? 'translateY(0)' : 'translateY(-2px)',
              transition: 'opacity 280ms ease, transform 280ms ease',
            }}
          >
            {p.summary}
          </p>
        </div>

        <span
          className="mono"
          style={{
            opacity: isHover ? 1 : 0,
            transform: isHover ? 'translateX(0)' : 'translateX(-6px)',
            transition: 'opacity 220ms ease, transform 220ms ease',
          }}
        >
          View →
        </span>
      </Link>
    </li>
  )
}

function MobileHome() {
  return (
    <div className="route-fade">
      <Header />
      <main style={{ padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '28px 0 16px', borderBottom: '1px solid var(--hairline)' }}>
          <span className="mono">Selected work</span>
          <span className="mono">{PROJECTS.length} projects</span>
        </div>

        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {PROJECTS.map((p, i) => (
            <li key={p.slug} style={{ borderBottom: i === PROJECTS.length - 1 ? 'none' : '1px solid var(--hairline)', padding: '24px 0 28px' }}>
              <Link to={`/project/${p.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 14, color: p.accent ? 'var(--accent)' : 'var(--fg)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span className="mono" style={{ color: p.accent ? 'var(--accent)' : 'var(--muted)' }}>{p.year}</span>
                </div>
                <Media media={p.cover} style={{ aspectRatio: '3/2' }} />
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 600, margin: 0, letterSpacing: '-0.012em', lineHeight: 1.15, textWrap: 'balance' }}>
                    {p.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--serif)', fontSize: 15, lineHeight: 1.5, color: 'var(--muted)', margin: '10px 0 0', textWrap: 'pretty' }}>
                    {p.summary}
                  </p>
                  <span className="mono" style={{ display: 'block', marginTop: 12 }}>{p.medium}</span>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </div>
  )
}

export default function Home() {
  const [hoverSlug, setHoverSlug] = useState(null)
  const mobile = useIsMobile()

  if (mobile) return <MobileHome />

  return (
    <div className="route-fade">
      <Header />
      <SidewaysBio />

      <main className="home-main" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', padding: '0 var(--gutter)', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <div />

        <section style={{ padding: '8px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '20px 0 18px', borderBottom: '1px solid var(--hairline)' }}>
            <span className="mono">Selected work, 2024 — {new Date().getFullYear()}</span>
            <span className="mono">{PROJECTS.length} projects</span>
          </div>

          <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {PROJECTS.map((p, i) => (
              <ProjectRow
                key={p.slug}
                p={p}
                index={i}
                isHover={hoverSlug === p.slug}
                anyHover={hoverSlug != null}
                onHover={setHoverSlug}
                isLast={i === PROJECTS.length - 1}
              />
            ))}
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  )
}

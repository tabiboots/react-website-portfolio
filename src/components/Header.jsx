import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { useTheme } from '../context/ThemeContext'
import { NAV, SOCIAL } from '../data/site'
import { useIsMobile } from '../hooks/useIsMobile'

export function Header() {
  const mobile = useIsMobile()
  if (mobile) return <MobileHeader />
  return <DesktopHeader />
}

function DesktopHeader() {
  const { pathname } = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        transition: 'background 220ms ease, border-color 220ms ease',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'start',
        gap: 30,
        padding: '10px 40px 10px',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      <div style={{ lineHeight: 0 }}><Logo /></div>

      <nav style={{ display: 'flex', gap: 56, paddingTop: 35, marginLeft: 32 }}>
        {NAV.map((n) => {
          const active =
            (n.to === '/' && (pathname === '/' || pathname.startsWith('/project'))) ||
            (n.to !== '/' && pathname === n.to)
          return (
            <Link
              key={n.label}
              to={n.to}
              style={{
                fontSize: 14,
                color: active ? 'var(--fg)' : 'var(--muted)',
                borderBottom: active ? '1px solid var(--fg)' : '1px solid transparent',
                paddingBottom: 2,
                transition: 'color 160ms ease, border-color 160ms ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = 'var(--muted)' }}
            >
              {n.label}
            </Link>
          )
        })}
      </nav>

      <div style={{ display: 'flex', gap: 32, paddingTop: 35, alignItems: 'center' }}>
        {SOCIAL.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            style={{ fontSize: 14, color: 'var(--muted)', transition: 'color 160ms ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
          >
            {s.label} ↗
          </a>
        ))}
        <ThemeToggle />
      </div>
    </header>
  )
}

function MobileHeader() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { theme } = useTheme()

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--bg)',
        transition: 'background 220ms ease',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px' }}>
        <Logo size={36} />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          style={{
            background: 'transparent',
            border: '1px solid var(--hairline)',
            color: 'var(--fg)',
            fontFamily: 'var(--mono)',
            fontSize: 10,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '8px 12px',
            cursor: 'pointer',
          }}
        >
          {open ? 'Close ✕' : 'Menu'}
        </button>
      </div>

      {open && (
        <div style={{ borderTop: '1px solid var(--hairline)', padding: '12px 20px 20px', display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--bg)' }}>
          {NAV.map((n) => {
            const active =
              (n.to === '/' && (pathname === '/' || pathname.startsWith('/project'))) ||
              (n.to !== '/' && pathname === n.to)
            return (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'var(--serif)',
                  fontStyle: 'italic',
                  fontSize: 30,
                  lineHeight: 1.1,
                  color: active ? 'var(--accent)' : 'var(--fg)',
                  letterSpacing: '-0.02em',
                }}
              >
                {n.label}
              </Link>
            )
          })}
          <div style={{ display: 'flex', gap: 18, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--hairline)', alignItems: 'center' }}>
            {SOCIAL.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="mono" style={{ color: 'var(--muted)' }}>
                {s.label} ↗
              </a>
            ))}
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      style={{
        background: 'transparent',
        border: 0,
        cursor: 'pointer',
        color: 'var(--muted)',
        fontSize: 14,
        fontFamily: 'inherit',
        padding: 0,
        transition: 'color 160ms ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--fg)')}
      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
    >
      {theme === 'light' ? '◑' : '◐'}
    </button>
  )
}

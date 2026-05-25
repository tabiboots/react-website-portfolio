import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'
import { useTheme } from '../context/ThemeContext'
import { NAV, SOCIAL } from '../data/site'

export function Header() {
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
      <Logo />

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
      </div>
    </header>
  )
}

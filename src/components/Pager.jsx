import { Link } from 'react-router-dom'

export function Pager({ prev, next }) {
  return (
    <nav
      style={{
        marginTop: 120,
        paddingTop: 32,
        borderTop: '1px solid var(--hairline)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
      }}
    >
      {prev ? (
        <Link to={`/project/${prev.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span className="mono">← Previous</span>
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 28, lineHeight: 1.1 }}>
            {prev.title}
          </span>
          <span className="mono">{prev.year}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={`/project/${next.slug}`}
          style={{ display: 'flex', flexDirection: 'column', gap: 8, textAlign: 'right', alignItems: 'flex-end' }}
        >
          <span className="mono">Next →</span>
          <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 28, lineHeight: 1.1 }}>
            {next.title}
          </span>
          <span className="mono">{next.year}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}

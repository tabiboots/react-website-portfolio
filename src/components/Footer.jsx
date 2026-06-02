export function Footer() {
  return (
    <footer
      style={{
        padding: '32px var(--gutter) 40px',
        borderTop: '1px solid var(--hairline)',
        display: 'flex',
        justifyContent: 'space-between',
        color: 'var(--muted)',
        fontSize: 12,
        fontFamily: 'var(--mono)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      <span>Tabi Cass</span>
      <span>New York / Toronto</span>
      <a href="mailto:tabiarchive@gmail.com" style={{ borderBottom: '1px solid currentColor' }}>
        tabiarchive@gmail.com
      </a>
    </footer>
  )
}

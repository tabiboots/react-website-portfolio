import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function Contact() {
  return (
    <div className="route-fade">
      <Header />
      <main style={{ padding: '0 56px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: 48, padding: '80px 0' }}>
          <span className="mono">Contact</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 640 }}>
            <h1
              style={{
                fontFamily: 'var(--serif)',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: 'clamp(36px, 4vw, 64px)',
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: '-0.02em',
              }}
            >
              Say hello.
            </h1>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '120px 1fr', rowGap: 14, columnGap: 24 }}>
              <dt className="mono">Email</dt>
              <dd style={{ margin: 0 }}>
                <a href="mailto:tabiarchive@gmail.com" style={{ borderBottom: '1px solid currentColor' }}>
                  tabiarchive@gmail.com
                </a>
              </dd>
              <dt className="mono">Studio</dt>
              <dd style={{ margin: 0 }}>Brooklyn, NY</dd>
              <dt className="mono">Instagram</dt>
              <dd style={{ margin: 0 }}>
                <a href="https://instagram.com/tabi.sock" target="_blank" rel="noreferrer" style={{ borderBottom: '1px solid currentColor' }}>
                  @tabi.sock ↗
                </a>
              </dd>
              <dt className="mono">LinkedIn</dt>
              <dd style={{ margin: 0 }}>
                <a href="https://www.linkedin.com/in/tabi-cass-29a228278/" target="_blank" rel="noreferrer" style={{ borderBottom: '1px solid currentColor' }}>
                  linkedin.com/in/tabi-cass ↗
                </a>
              </dd>
              <dt className="mono">CV</dt>
              <dd style={{ margin: 0 }}>
                <a href="/files/tabi-cass-cv.pdf" target="_blank" rel="noreferrer" style={{ borderBottom: '1px solid currentColor' }}>Download PDF ↗</a>
              </dd>
            </dl>
          </div>
          <span />
        </div>
      </main>
      <Footer />
    </div>
  )
}

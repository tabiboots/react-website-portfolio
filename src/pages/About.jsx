import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function About() {
  return (
    <div className="route-fade">
      <Header />
      <main style={{ padding: '0 56px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 200px', gap: 48, padding: '80px 0' }}>
          <span className="mono">About</span>
          <div style={{ maxWidth: 640, display: 'flex', flexDirection: 'column', gap: 24 }}>
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
              [Add your headline here]
            </h1>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.65, margin: 0 }}>
              [Add bio paragraph]
            </p>
          </div>
          <span />
        </div>
      </main>
      <Footer />
    </div>
  )
}

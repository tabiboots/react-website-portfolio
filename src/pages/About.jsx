import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Media } from '../components/Media'
import { cdn } from '../lib/cloudinary'

export default function About() {
  return (
    <div className="route-fade">
      <Header />
      <main style={{ padding: '0 56px', maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 48, padding: '80px 0', alignItems: 'center' }}>
          <Media
            media={{
              kind: 'image',
              src: cdn('q_auto/f_auto/v1777237883/headshot_dfpuvt.jpg'),
              ratio: '1/1',
              caption: 'Tabi Cass',
            }}
            style={{ height: 'auto' }}
          />
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
              About
            </h1>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.65, margin: 0 }}>
              Tabi Cass is a creative technologist whose work explores the tension between their
              fascination and unease regarding emerging technologies. Through experimental media,
              visual metaphor, and conceptual craft, they examine how technological systems shape
              perception, identity, and interpersonal relationships.
            </p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 19, lineHeight: 1.65, margin: 0 }}>
              Tabi graduated from Parsons School of Design in May 2026 with a focus on design and
              technology and is currently pursuing their MFA at NYU's ITP program.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

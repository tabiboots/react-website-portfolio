import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export default function NotFound() {
  return (
    <div className="route-fade">
      <Header />
      <main style={{ padding: '120px 56px', textAlign: 'center' }}>
        <p className="mono" style={{ marginBottom: 16 }}>404</p>
        <h1 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 48, margin: 0 }}>
          Not here.
        </h1>
        <p style={{ marginTop: 24 }}>
          <Link to="/" style={{ borderBottom: '1px solid currentColor' }}>← Back to index</Link>
        </p>
      </main>
      <Footer />
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Media } from '../components/Media'
import { Lightbox } from '../components/Lightbox'
import { Pager } from '../components/Pager'
import { EditorialBlock } from './blocks/EditorialBlock'
import { useProjectImages } from '../hooks/useProjectImages'
import { PROJECTS } from '../data/projects'

function MetaField({ label, value }) {
  if (!value) return null
  return (
    <div>
      <div className="mono" style={{ marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, lineHeight: 1.45 }}>{value}</div>
    </div>
  )
}

export function DetailEditorial({ project, prev, next }) {
  const [lightbox, setLightbox] = useState(null)
  const allImages = useProjectImages(project)
  const projectIdx = PROJECTS.findIndex((p) => p.slug === project.slug)

  const openLightbox = (media) => {
    const idx = allImages.findIndex((m) => m === media)
    setLightbox(idx >= 0 ? idx : 0)
  }

  return (
    <div className="route-fade">
      <Header />

      <main style={{ padding: '0 56px 80px' }}>
        {/* breadcrumb — full width */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '20px 0 28px', borderBottom: '1px solid var(--hairline)' }}>
          <Link to="/" className="mono" style={{ color: 'var(--muted)' }}>← Index</Link>
          <span className="mono">{project.year}</span>
        </div>

        {/* two-column layout: sidebar | content */}
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 56, paddingTop: 48 }}>

          {/* sticky sidebar */}
          <aside style={{ position: 'sticky', top: 'calc(var(--header-h) + 24px)', alignSelf: 'start', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span className="mono">No. {String(projectIdx + 1).padStart(2, '0')}</span>
            <div style={{ height: 1, background: 'var(--hairline)' }} />
            <MetaField label="Year" value={project.year} />
            <MetaField label="Medium" value={project.medium} />
            <MetaField label="Dimensions" value={project.dimensions} />
            <MetaField label="Venue" value={project.venue} />
            {project.links?.length > 0 && (
              <div>
                <div className="mono" style={{ marginBottom: 8 }}>Links</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {project.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} style={{ fontSize: 13, borderBottom: '1px solid currentColor', paddingBottom: 1 }}>
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>

          {/* main content column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {/* title + summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h1
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 'clamp(36px, 5vw, 72px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  margin: 0,
                  textWrap: 'balance',
                }}
              >
                {project.title}
              </h1>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.55, margin: 0, color: 'var(--muted)', maxWidth: 560 }}>
                {project.summary}
              </p>
            </div>

            {/* cover image */}
            {project.cover && (
              <figure style={{ margin: 0, cursor: 'zoom-in' }} onClick={() => openLightbox(project.cover)}>
                <Media media={project.cover} style={{ aspectRatio: project.cover.ratio || '3/2' }} />
                {project.cover.caption && (
                  <figcaption className="mono" style={{ marginTop: 12 }}>{project.cover.caption}</figcaption>
                )}
              </figure>
            )}

            {/* content blocks */}
            {(project.blocks || []).map((b, i) => (
              <EditorialBlock key={i} block={b} openLightbox={openLightbox} />
            ))}

            {/* press quotes */}
            {project.press?.length > 0 && (
              <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 28 }}>
                <div className="mono" style={{ marginBottom: 16 }}>Press</div>
                {project.press.map((q, i) => (
                  <blockquote key={i} style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, margin: 0 }}>
                    "{q.quote}"
                    <footer className="mono" style={{ marginTop: 8, fontStyle: 'normal' }}>— {q.source}</footer>
                  </blockquote>
                ))}
              </div>
            )}

            <Pager prev={prev} next={next} />
          </div>
        </div>
      </main>

      <Footer />

      <Lightbox
        images={allImages}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndex={setLightbox}
      />
    </div>
  )
}

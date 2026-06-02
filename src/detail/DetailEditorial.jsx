import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { Media } from '../components/Media'
import { Lightbox } from '../components/Lightbox'
import { Pager } from '../components/Pager'
import { EditorialBlock } from './blocks/EditorialBlock'
import { useProjectImages } from '../hooks/useProjectImages'
import { useIsMobile } from '../hooks/useIsMobile'
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
  const mobile = useIsMobile()

  const openLightbox = (media) => {
    const idx = allImages.findIndex((m) => m === media)
    setLightbox(idx >= 0 ? idx : 0)
  }

  if (mobile) {
    return (
      <div className="route-fade">
        <Header />
        <main style={{ padding: '0 20px 60px' }}>
          {/* breadcrumb */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '16px 0 24px', borderBottom: '1px solid var(--hairline)' }}>
            <Link to="/" className="mono" style={{ color: 'var(--muted)' }}>← Index</Link>
            <span className="mono">No. {String(projectIdx + 1).padStart(2, '0')} · {project.year}</span>
          </div>

          {/* title + summary */}
          <section style={{ paddingTop: 28 }}>
            <h1
              style={{
                fontFamily: 'var(--serif)',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(34px, 9vw, 48px)',
                lineHeight: 1.03,
                letterSpacing: '-0.02em',
                margin: 0,
                textWrap: 'balance',
              }}
            >
              {project.title}
            </h1>
            <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.55, color: 'var(--fg)', margin: '16px 0 0' }}>
              {project.summary}
            </p>
          </section>

          {/* cover image */}
          {project.cover && (
            <figure style={{ margin: '28px 0 0', cursor: 'zoom-in' }} onClick={() => openLightbox(project.cover)}>
              <Media media={project.cover} style={{ aspectRatio: project.heroRatio || project.cover.ratio || '3/2' }} />
              {project.cover.caption && <figcaption className="mono" style={{ marginTop: 10 }}>{project.cover.caption}</figcaption>}
            </figure>
          )}

          {/* meta strip */}
          <section style={{ marginTop: 32, paddingTop: 20, paddingBottom: 24, borderTop: '1px solid var(--hairline)', borderBottom: '1px solid var(--hairline)' }}>
            <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: 16, columnGap: 16 }}>
              {[['Year', project.year], ['Medium', project.medium], ['Dimensions', project.dimensions], ['Venue', project.venue]]
                .filter(([, v]) => v)
                .map(([label, value]) => (
                  <div key={label} style={{ minWidth: 0 }}>
                    <dt className="mono" style={{ marginBottom: 4 }}>{label}</dt>
                    <dd style={{ margin: 0, fontSize: 13, lineHeight: 1.45 }}>{value}</dd>
                  </div>
                ))}
            </dl>
            {project.links?.length > 0 && (
              <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px dashed var(--hairline)' }}>
                <div className="mono" style={{ marginBottom: 8 }}>Links</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {project.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} style={{ fontSize: 13, borderBottom: '1px solid currentColor' }}>{l.label} ↗</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* content blocks */}
          <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 36 }}>
            {(project.blocks || []).map((b, i) => (
              <EditorialBlock key={i} block={b} openLightbox={openLightbox} mobile />
            ))}

            {project.press?.length > 0 && (
              <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 22 }}>
                <div className="mono" style={{ marginBottom: 12 }}>Press</div>
                {project.press.map((q, i) => (
                  <blockquote key={i} style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.45, margin: 0 }}>
                    "{q.quote}"
                    <footer className="mono" style={{ marginTop: 6, fontStyle: 'normal', color: 'var(--muted)' }}>— {q.source}</footer>
                  </blockquote>
                ))}
              </div>
            )}
          </div>

          {/* pager — stacked */}
          <nav style={{ marginTop: 56, paddingTop: 24, borderTop: '1px solid var(--hairline)', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {prev && (
              <Link to={`/project/${prev.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="mono">← Previous</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.1 }}>{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link to={`/project/${next.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span className="mono">Next →</span>
                <span style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 22, lineHeight: 1.1 }}>{next.title}</span>
              </Link>
            )}
          </nav>
        </main>
        <Footer />
        <Lightbox images={allImages} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
      </div>
    )
  }

  return (
    <div className="route-fade">
      <Header />

      <main style={{ padding: '0 var(--gutter) 80px', maxWidth: 'var(--max-w)', margin: '0 auto' }}>
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
                <Media media={project.cover} style={{ aspectRatio: project.heroRatio || project.cover.ratio || '3/2' }} />
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

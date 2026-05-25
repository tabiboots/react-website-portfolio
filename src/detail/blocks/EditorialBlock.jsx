import { Media } from '../../components/Media'

// Renders a single content block in the Editorial layout.
// Add a new block kind by adding a case here and defining it in projects.js.
export function EditorialBlock({ block: b, openLightbox }) {
  if (b.kind === 'lede') {
    return (
      <p style={{ fontFamily: 'var(--serif)', fontSize: 26, lineHeight: 1.35, margin: 0, color: 'var(--fg)', textWrap: 'pretty' }}>
        {b.text}
      </p>
    )
  }

  if (b.kind === 'essay') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {b.body.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--serif)', fontSize: 18, lineHeight: 1.65, margin: 0, maxWidth: 640, textWrap: 'pretty' }}>
            {para}
          </p>
        ))}
      </div>
    )
  }

  if (b.kind === 'section') {
    return (
      <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid var(--hairline)' }}>
        <div className="mono" style={{ marginBottom: 12 }}>{b.eyebrow}</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: 38, lineHeight: 1.1, margin: 0, letterSpacing: '-0.015em' }}>
          {b.heading}
        </h3>
      </div>
    )
  }

  if (b.kind === 'image-pair') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {b.images.map((img, i) => (
          <figure key={i} style={{ margin: 0, cursor: 'zoom-in' }} onClick={() => openLightbox(img)}>
            <Media media={img} style={{ aspectRatio: img.ratio || '3/2' }} />
            {img.caption && <figcaption className="mono" style={{ marginTop: 10 }}>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    )
  }

  if (b.kind === 'image-grid') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${b.images.length}, 1fr)`, gap: 16 }}>
        {b.images.map((img, i) => (
          <figure key={i} style={{ margin: 0, cursor: 'zoom-in' }} onClick={() => openLightbox(img)}>
            <Media media={img} style={{ aspectRatio: img.ratio || '1/1' }} />
            {img.caption && <figcaption className="mono" style={{ marginTop: 10, fontSize: 10 }}>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    )
  }

  if (b.kind === 'code') {
    return (
      <figure style={{ margin: 0 }}>
        {b.caption && <figcaption className="mono" style={{ marginBottom: 8 }}>{b.caption}</figcaption>}
        <pre style={{ margin: 0, padding: 24, background: '#0e0e0e', color: '#f4f4f3', fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.6, overflowX: 'auto', border: '1px solid var(--hairline)' }}>
          <code>{b.body}</code>
        </pre>
      </figure>
    )
  }

  if (b.kind === 'video') {
    return (
      <figure style={{ margin: 0 }}>
        <div onClick={() => openLightbox(b.poster)} style={{ position: 'relative', cursor: 'zoom-in' }}>
          <Media media={b.poster} style={{ aspectRatio: '16/9' }} />
          <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.04)' }}>
            <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>▶</span>
          </span>
        </div>
        {b.caption && <figcaption className="mono" style={{ marginTop: 12 }}>{b.caption}</figcaption>}
      </figure>
    )
  }

  if (b.kind === 'credits') {
    return (
      <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 28 }}>
        <div className="mono" style={{ marginBottom: 16 }}>Credits</div>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '200px 1fr', rowGap: 10, columnGap: 24 }}>
          {b.rows.map((r) => (
            <span key={r.label} style={{ display: 'contents' }}>
              <dt className="mono">{r.label}</dt>
              <dd style={{ margin: 0, fontSize: 14, fontFamily: 'var(--serif)' }}>{r.value}</dd>
            </span>
          ))}
        </dl>
      </div>
    )
  }

  return null
}

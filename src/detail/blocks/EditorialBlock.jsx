import { Media } from '../../components/Media'

export function EditorialBlock({ block: b, openLightbox, mobile = false }) {
  if (b.kind === 'lede') {
    return (
      <p style={{ fontFamily: 'var(--serif)', fontSize: mobile ? 21 : 26, lineHeight: 1.35, margin: 0, color: 'var(--fg)', textWrap: 'pretty' }}>
        {b.text}
      </p>
    )
  }

  if (b.kind === 'essay') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 18 }}>
        {b.body.map((para, i) => (
          <p key={i} style={{ fontFamily: 'var(--serif)', fontSize: mobile ? 16 : 18, lineHeight: mobile ? 1.6 : 1.65, margin: 0, maxWidth: mobile ? 'none' : 1200, textWrap: 'pretty' }}>
            {para}
          </p>
        ))}
      </div>
    )
  }

  if (b.kind === 'section') {
    return (
      <div style={{ marginTop: mobile ? 20 : 32, paddingTop: mobile ? 22 : 32, borderTop: '1px solid var(--hairline)' }}>
        <div className="mono" style={{ marginBottom: mobile ? 8 : 12 }}>{b.eyebrow}</div>
        <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: mobile ? 28 : 38, lineHeight: 1.1, margin: 0, letterSpacing: '-0.015em', textWrap: 'balance' }}>
          {b.heading}
        </h3>
      </div>
    )
  }

  if (b.kind === 'image-pair') {
    return mobile ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {b.images.map((img, i) => (
          <figure key={i} style={{ margin: 0, cursor: 'zoom-in' }} onClick={() => openLightbox(img)}>
            <Media media={img} style={{ aspectRatio: img.ratio || '3/2' }} />
            {img.caption && <figcaption className="mono" style={{ marginTop: 8 }}>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    ) : (
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
    return mobile ? (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {b.images.map((img, i) => (
          <figure key={i} style={{ margin: 0, cursor: 'zoom-in' }} onClick={() => openLightbox(img)}>
            <Media media={img} style={{ aspectRatio: img.ratio || '1/1' }} />
            {img.caption && <figcaption className="mono" style={{ marginTop: 8 }}>{img.caption}</figcaption>}
          </figure>
        ))}
      </div>
    ) : (
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
        <pre style={{ margin: 0, padding: mobile ? 16 : 24, background: 'var(--code-bg)', color: 'var(--code-fg)', fontFamily: 'var(--mono)', fontSize: mobile ? 11 : 12, lineHeight: 1.6, overflowX: 'auto', border: '1px solid var(--hairline)' }}>
          <code>{b.body}</code>
        </pre>
      </figure>
    )
  }

  if (b.kind === 'video') {
    const btnSize = mobile ? 52 : 64
    return (
      <figure style={{ margin: 0 }}>
        {b.poster ? (
          <div onClick={() => openLightbox(b)} style={{ position: 'relative', cursor: 'zoom-in' }}>
            <Media media={b.poster} style={{ aspectRatio: '16/9' }} />
            <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.04)' }}>
              <span style={{ width: btnSize, height: btnSize, borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: mobile ? 14 : 18 }}>▶</span>
            </span>
          </div>
        ) : (
          <video
            src={b.src}
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            onClick={() => openLightbox(b)}
            style={{ maxHeight: 720, display: 'block', margin: '0 auto', cursor: 'zoom-in' }}
          />
        )}
        {b.caption && <figcaption className="mono" style={{ marginTop: mobile ? 10 : 12 }}>{b.caption}</figcaption>}
      </figure>
    )
  }

  if (b.kind === 'credits') {
    return (
      <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: mobile ? 22 : 28 }}>
        <div className="mono" style={{ marginBottom: mobile ? 12 : 16 }}>Credits</div>
        <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: mobile ? '110px 1fr' : '200px 1fr', rowGap: mobile ? 8 : 10, columnGap: mobile ? 14 : 24 }}>
          {b.rows.map((r) => (
            <span key={r.label} style={{ display: 'contents' }}>
              <dt className="mono">{r.label}</dt>
              <dd style={{ margin: 0, fontSize: mobile ? 13 : 14, fontFamily: 'var(--serif)' }}>{r.value}</dd>
            </span>
          ))}
        </dl>
      </div>
    )
  }

  return null
}

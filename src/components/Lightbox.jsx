import { useEffect } from 'react'
import { createPortal } from 'react-dom'

const btnStyle = {
  background: 'transparent',
  border: 0,
  color: '#bbb',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  textTransform: 'inherit',
  letterSpacing: 'inherit',
  padding: 0,
}

export function Lightbox({ images, index, onClose, onIndex }) {
  useEffect(() => {
    if (index == null) return
    // Prevent body scroll while open
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndex((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onIndex((index - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [index, images.length, onClose, onIndex])

  if (index == null) return null
  const img = images[index]

  // Portal so the overlay is always positioned relative to the viewport,
  // never trapped inside a transform-animated ancestor.
  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(8,8,8,0.94)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '64px 80px',
        animation: 'fade 180ms ease both',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: 'min(1400px, 90vw)',
          maxHeight: '78vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {img.kind === 'image' && img.src ? (
          <img
            src={img.src}
            alt={img.caption || ''}
            style={{ maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain' }}
          />
        ) : (
          <div
            className="placeholder"
            style={{ width: 720, aspectRatio: img.ratio || '4/3', background: '#1a1a1a', borderColor: '#222' }}
          >
            {img.label}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 24,
          marginTop: 24,
          color: '#bbb',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onIndex((index - 1 + images.length) % images.length) }}
          style={btnStyle}
        >
          ← prev
        </button>
        <span>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span>
        <button
          onClick={(e) => { e.stopPropagation(); onIndex((index + 1) % images.length) }}
          style={btnStyle}
        >
          next →
        </button>
        <button onClick={onClose} style={btnStyle}>close ✕</button>
      </div>

      {img.caption && (
        <p style={{ color: '#bbb', marginTop: 12, fontSize: 13, maxWidth: 720, textAlign: 'center' }}>
          {img.caption}
        </p>
      )}
    </div>,
    document.body
  )
}

import { createPortal } from 'react-dom'
import { BIO } from '../data/site'

export function SidewaysBio({ text = BIO }) {
  return createPortal(
    <p
      style={{
        position: 'fixed',
        left: 56,
        top: 'calc(var(--header-h) + 20px)',
        margin: 0,
        fontSize: 13,
        lineHeight: 1.55,
        color: 'var(--fg)',
        writingMode: 'vertical-rl',
        transform: 'rotate(180deg)',
        maxHeight: 'calc(100vh - var(--header-h) - 150px)',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {text}
    </p>,
    document.body
  )
}

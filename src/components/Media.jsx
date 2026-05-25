// Renders a real image or a striped placeholder depending on media.kind and media.src.
export function Media({ media, style, className }) {
  if (!media) return null

  if (media.kind === 'image' && media.src) {
    return (
      <img
        src={media.src}
        alt={media.caption || ''}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          aspectRatio: media.ratio || undefined,
          ...style,
        }}
      />
    )
  }

  return (
    <div
      className={['placeholder', className].filter(Boolean).join(' ')}
      style={{ aspectRatio: media.ratio || '4/3', width: '100%', ...style }}
    >
      {media.label || 'image'}
    </div>
  )
}

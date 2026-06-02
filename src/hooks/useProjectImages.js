// Flattens all images in a project into a single array for lightbox navigation.
export function useProjectImages(project) {
  const images = []
  if (project.cover) images.push(project.cover)
  for (const b of project.blocks || []) {
    if (b.kind === 'image' || b.kind === 'lede-image') images.push(b)
    if (b.kind === 'image-pair' || b.kind === 'image-grid') images.push(...b.images)
    if (b.kind === 'video') images.push(b.poster ?? b)
  }
  return images
}

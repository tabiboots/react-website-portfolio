// ─── HOW TO ADD A PROJECT ────────────────────────────────────────────────────
//
// 1. Create a new file in src/data/projects/my-project.js
//    Copy any existing project file as a starting point.
//
// 2. Every project file must export a default object with these fields:
//
//    slug        — URL-safe identifier, matches the filename (e.g. 'my-project')
//    title       — Display title
//    year        — String (e.g. '2025')
//    medium      — Materials / format
//    dimensions  — Physical or variable dimensions (optional)
//    venue       — Where it was shown (optional)
//    accent      — true to render the title in the red accent color (optional)
//    cover       — Media object (see below)
//    summary     — One-sentence description shown in the project index
//    blocks      — Array of content blocks (see kinds below)
//    press       — Array of { quote, source } (optional)
//    links       — Array of { label, href } (optional)
//
// ─── MEDIA OBJECTS ───────────────────────────────────────────────────────────
//
//    Image (Cloudinary or any URL):
//    { kind: 'image', src: 'https://...', ratio: '3/2', caption: '...' }
//
//    Placeholder (shown when no image is ready yet):
//    { kind: 'placeholder', label: 'Description of what goes here', ratio: '4/3' }
//
// ─── BLOCK KINDS ─────────────────────────────────────────────────────────────
//
//    lede        — Large opening statement
//    { kind: 'lede', text: '...' }
//
//    essay       — Body paragraphs (one string per paragraph)
//    { kind: 'essay', body: ['Para one.', 'Para two.'] }
//
//    section     — Divider with optional eyebrow + heading
//    { kind: 'section', eyebrow: 'Process', heading: '...' }
//
//    image-pair  — Two images side by side
//    { kind: 'image-pair', images: [mediaObject, mediaObject] }
//
//    image-grid  — Three or more images in a grid
//    { kind: 'image-grid', images: [mediaObject, ...] }
//
//    video       — Embedded video with optional poster image
//    { kind: 'video', src: 'https://...', poster: mediaObject, caption: '...' }
//
//    code        — Syntax-highlighted code excerpt
//    { kind: 'code', lang: 'python', caption: '...', body: `...` }
//
//    credits     — Label/value table for credits, colophon, etc.
//    { kind: 'credits', rows: [{ label: '...', value: '...' }] }
//
// ─── ORDERING ────────────────────────────────────────────────────────────────
//
// Projects appear on the home page in the order they are listed in the array
// below. Drag to reorder.

import indulge from './projects/indulge.jsx'
import tv from './projects/tv.jsx'
import keepingReceipts from './projects/keeping-receipts'

export const PROJECTS = [
    tv,
    indulge,
    keepingReceipts

]

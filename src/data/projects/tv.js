// Image srcs are Cloudinary URLs, e.g.:
// src: 'https://res.cloudinary.com/<your-cloud>/image/upload/v.../filename.jpg'

import {cdn} from "../../lib/cloudinary.js";

export default {
  slug: 'tv',
  title: "It's The End of the World and My TV Won't Turn Off",
  year: '2025',
  medium: 'Monitors, dirt, 60 minutes of television footage, television remote',
  dimensions: 'Variable',
  venue: '//PIXELMOUTH at La MaMa Galleria, NYC',
  cover: { kind: 'image', src: cdn('q_auto/f_auto/v1777235252/iteotw-cover_dxfjxc.jpg'), ratio: '16/9' },
  summary: '[One-sentence summary of the installation]',
  blocks: [
    { kind: 'lede', text: '[Opening statement — the hook]' },
    {
      kind: 'essay',
      body: [
        '[First paragraph — context and concept]',
        '[Second paragraph — description of the physical piece]',
        '[Third paragraph — intent and subtext]',
      ],
    },
    {
      kind: 'image-pair',
      images: [
        {
          kind: 'image',
          src: '/uploads/Screenshot 2026-05-25 at 12.21.26 PM.png',
          caption: '[Caption for this image]',
        },
        {
          kind: 'placeholder',
          label: 'Detail — remote on dirt',
          ratio: '3/2',
          caption: '[Caption for detail shot]',
        },
      ],
    },
    { kind: 'section', eyebrow: 'Process', heading: '[Process section heading]' },
    {
      kind: 'essay',
      body: ['[Description of the technical process — how the piece was built]'],
    },
    {
      kind: 'code',
      lang: 'python',
      caption: 'TouchDesigner — channel router (excerpt)',
      body: `# Add your code excerpt here`,
    },
    {
      kind: 'image-grid',
      images: [
        { kind: 'placeholder', label: 'Process shot 1', ratio: '1/1', caption: '[Caption]' },
        { kind: 'placeholder', label: 'Process shot 2', ratio: '1/1', caption: '[Caption]' },
        { kind: 'placeholder', label: 'Process shot 3', ratio: '1/1', caption: '[Caption]' },
      ],
    },
    { kind: 'section', eyebrow: 'Note', heading: '[Reflective section heading]' },
    {
      kind: 'essay',
      body: [
        '[Reflection on what happened / what you learned]',
        '[What comes next or how this informs future work]',
      ],
    },
    {
      kind: 'video',
      src: null,
      poster: { kind: 'placeholder', label: 'Video — installation walkthrough', ratio: '16/9' },
      caption: '[Video caption]',
    },
    {
      kind: 'credits',
      rows: [
        { label: 'Commissioned by', value: '//PIXELMOUTH' },
        { label: 'Venue', value: 'La MaMa Galleria, NYC' },
        { label: 'Dates', value: 'March 14 – April 6, 2025' },
        { label: 'Sound', value: 'Cable broadcast, unaltered' },
        { label: 'Thanks', value: '[Names]' },
      ],
    },
  ],
  press: [
    { quote: '[Press quote]', source: '[Publication]' },
  ],
  links: [
    { label: '//PIXELMOUTH show page', href: '#' },
  ],
}

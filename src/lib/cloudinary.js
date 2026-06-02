const BASE = import.meta.env.VITE_CLOUDINARY_URL
const VIDEO_BASE = BASE.replace('/image/upload', '/video/upload')

export const cdn = (id) => `${BASE}/${id}`
export const cdnVideo = (id) => `${VIDEO_BASE}/${id}`

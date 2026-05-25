const BASE = import.meta.env.VITE_CLOUDINARY_URL

export const cdn = (id) => `${BASE}/${id}`

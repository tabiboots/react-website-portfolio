import { Link } from 'react-router-dom'

export function Logo({ size = 80 }) {
  return (
    <Link to="/" aria-label="Tabi Cass — home" style={{ display: 'inline-flex', lineHeight: 0 }}>
      <img
        src="https://res.cloudinary.com/dhokowg6q/image/upload/q_auto/f_auto/v1777237889/interrobang_256_u76lcn.png"
        alt="Tabi Cass"
        className="logo-img"
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    </Link>
  )
}

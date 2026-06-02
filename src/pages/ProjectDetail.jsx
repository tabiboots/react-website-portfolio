import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PROJECTS } from '../data/projects'
import { DetailEditorial } from '../detail/DetailEditorial'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const idx = PROJECTS.findIndex((p) => p.slug === slug)

  // Arrow keys to step between projects, Escape to return to index
  useEffect(() => {
    if (idx < 0) return
    const onKey = (e) => {
      if (e.target?.tagName === 'INPUT' || e.target?.tagName === 'TEXTAREA') return
      if (document.body.style.overflow === 'hidden') return
      if (e.key === 'ArrowRight' && idx < PROJECTS.length - 1) navigate(`/project/${PROJECTS[idx + 1].slug}`)
      else if (e.key === 'ArrowLeft' && idx > 0) navigate(`/project/${PROJECTS[idx - 1].slug}`)
      else if (e.key === 'Escape') navigate('/')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [idx, navigate])

  if (idx < 0) return <NotFound />

  const project = PROJECTS[idx]
  const prev = idx > 0 ? PROJECTS[idx - 1] : null
  const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null

  return <DetailEditorial project={project} prev={prev} next={next} />
}

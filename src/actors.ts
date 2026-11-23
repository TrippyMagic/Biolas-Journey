import { content } from './content'
import type { Destination } from './journey'
import './actors.css'

type Role = keyof typeof content.characters
type Pose = 'idle' | 'jump' | 'front'

function pose(element: HTMLElement, role: Role, state: Pose) {
  const { idle } = content.characters[role]
  const selected = role === 'traveler' ? content.characters.traveler[state] : idle
  const clip = selected.src ? selected : idle
  element.dataset.pose = state
  const frame = element.firstElementChild as HTMLElement
  element.style.aspectRatio = clip.frameWidth + ' / ' + clip.frameHeight
  frame.style.backgroundImage = 'url(' + JSON.stringify(import.meta.env.BASE_URL + clip.src) + ')'
  frame.style.backgroundSize = clip.frames * 100 + '% 100%'
  frame.style.animation = clip.frames > 1
    ? `sprite-frames ${clip.frames / clip.fps}s steps(${clip.frames},jump-none) infinite`
    : 'none'
}

export function actor(role: Role, state: Pose = 'idle') {
  const element = document.createElement('i')
  element.className = 'actor ' + role
  element.setAttribute('aria-hidden', 'true')
  element.append(document.createElement('i'))
  pose(element, role, state)
  return element
}

function surface(chart: HTMLElement, id?: Destination) {
  return chart.querySelector<HTMLElement>(`[data-action="${id}"] .island-art`)
}

export function placeTraveler(chart: HTMLElement, equipped: boolean, origin?: Destination) {
  const figure = actor('traveler', equipped && !origin ? 'jump' : 'idle')
  figure.classList.add('map-traveler')
  const island = surface(chart, origin) ?? chart
  island.append(figure)
}

export async function jumpTo(scene: HTMLElement, id: Destination) {
  const target = surface(scene, id)
  const figure = scene.querySelector<HTMLElement>('.map-traveler')
  if (!target || !figure) return
  const initial = figure.getBoundingClientRect()
  target.append(figure)
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const end = figure.getBoundingClientRect()
  const dx = initial.left - end.left
  const dy = initial.bottom - end.bottom
  figure.classList.toggle('faces-left', dx > 0)
  pose(figure, 'traveler', 'jump')
  const height = Math.min(125, Math.max(42, Math.hypot(dx,dy) * .27))
  const arc = Array.from({ length: 17 }, (_, i) => {
    const t = i / 16
    return { transform: `translate(${dx*(1-t)}px,${dy*(1-t)-4*height*t*(1-t)}px)` }
  })
  figure.classList.add('boost')
  const flight = figure.animate(arc, { duration: 650, easing: 'ease-in-out' })
  const stop = () => flight.cancel()
  scene.addEventListener('depart', stop, { once: true })
  try { await flight.finished } catch { /* Navigation interrupted the jump. */ }
  figure.classList.remove('boost')
  scene.removeEventListener('depart', stop)
  pose(figure, 'traveler', 'idle')
}

export async function arrive(figure: HTMLElement) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
  pose(figure, 'traveler', 'jump')
  const landing = figure.animate([
    { transform: 'translate(-30vw,-90%) rotate(-6deg)' },
    { transform: 'translate(-7vw,0)', offset: .65 },
    { transform: 'translate(-3vw,-3%)', offset: .82 },
    { transform: 'translate(0,0)' },
  ], { duration: 2100, easing: 'ease-in-out' })
  await landing.finished
}

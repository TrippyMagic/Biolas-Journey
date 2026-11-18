import '@fontsource/spectral/latin-500.css'
import '@fontsource/dm-sans/latin-400.css'
import './styles.css'
import './interiors.css'
import './map.css'
import { jumpTo } from './actors'
import { syncDetail } from './detail'
import { clearGame } from './sudoku'
import { animate } from 'motion/mini'
import { content } from './content'
import { isIsland, readProgress, resolveScene, unlocked, type Scene } from './journey'
import { makeScene, resetAlbum } from './scenes'

const key = 'biolas-journey:v1'
let raw = null
try { raw = localStorage.getItem(key) } catch { /* Private browsing can deny storage. */ }
let progress = readProgress(raw)
function save() {
  try { localStorage.setItem(key, JSON.stringify({ ...progress, jetpackCollected: progress.flight === 'equipped' })) } catch { /* Keep session state. */ }
}
const world = document.querySelector<HTMLElement>('#world')!
world.innerHTML = '<div class="sky" aria-hidden="true"><div class="day"></div><div class="stars"></div><div class="cloud high"></div><div class="horizon"></div><div class="cloud left"></div><div class="cloud right"></div></div>'
const stars = world.querySelector('.stars')!
for (let i = 1; i <= 95; i++) {
  const point = document.createElement('i')
  point.style.left = ((i * 73.67) % 100) + '%'
  point.style.top = ((i * i * 19.73) % 94) + '%'
  stars.append(point)
}
let scene: HTMLElement | undefined
let current: Scene
let fromPlane = false
let revision = 0
let pending: ReturnType<typeof animate>[] = []
const reduced = matchMedia('(prefers-reduced-motion: reduce)')
async function display(id: Scene) {
  const ticket = ++revision
  for (const animation of pending) animation.stop()
  pending = []
  world.querySelectorAll('section').forEach(el => { if (el !== scene) el.remove() })
  scene?.dispatchEvent(new Event('depart'))
  const old = scene
  const from = current
  const next = makeScene(id, progress, from === 'finale' || isIsland(from) ? from : undefined)
  scene = next
  current = id
  world.dataset.flight = progress.flight
  const enteringFromPlane = fromPlane && id === 'mappa'
  fromPlane = false
  if (id === 'mappa' && (enteringFromPlane || progress.flight === 'over')) next.classList.add('flight-entry')
  world.dataset.location = id
  world.classList.toggle('crossing-cloud', from === 'intro' && id === 'mappa')
  world.append(next)
  if (old) {
    old.inert = next.inert = true
    const map = id === 'mappa' ? next : old
    const marker = map.querySelector<HTMLElement>('[data-action="' + (id === 'mappa' ? from : id) + '"]')
    if (marker) {
      const rect = marker.getBoundingClientRect()
      map.style.transformOrigin = (rect.left + rect.width / 2) + 'px ' + (rect.top + rect.height / 2 + scrollY) + 'px'
    }
    const travel = { duration: reduced.matches ? .1 : id === 'mappa' ? .5 : .65, ease: [.45, 0, .25, 1] as [number,number,number,number] }
    const zoom = reduced.matches ? 'scale(1)' : 'scale(1.08)'
    pending = [
      animate(old, { opacity: 0, transform: old === map ? zoom : 'scale(1)' }, travel),
      animate(next, { opacity: [0, 1], transform: [next === map ? zoom : 'scale(.99)', 'scale(1)'] }, travel),
    ]
    await Promise.all(pending.map(animation => animation.finished)).catch(() => {})
    if (ticket !== revision) return
    old.remove()
  }
  if (id === 'mappa' && (enteringFromPlane || progress.flight === 'over')) {
    next.inert = true
    if (enteringFromPlane) {
      const traveler = next.querySelector<HTMLElement>('.map-traveler')!
      next.classList.add('falling')
      const fatal = progress.flight === 'over'
      await fall(traveler, '-100vh', fatal ? '80vh' : '0px', fatal ? 1220 : 850)
      if (ticket !== revision) return
    }
    if (progress.flight === 'over') {
      const title = document.createElement('h1')
      title.tabIndex = -1
      title.textContent = content.ui.gameOver
      const retry = document.createElement('button')
      retry.dataset.action = 'retry'
      retry.textContent = content.ui.retry
      next.className = 'game-over'
      next.replaceChildren(title, retry)
    } else next.classList.remove('flight-entry','falling')
  }
  next.inert = false
  next.dispatchEvent(new Event('active'))
  syncDetail(next)
  if (id !== 'intro' && progress.flight !== 'over') progress.entered = true
  if (isIsland(id) && !progress.visits.includes(id)) progress.visits.push(id)
  if (id === 'mappa' && unlocked(progress) && !progress.revealed) {
    next.classList.add('reveal')
    document.querySelector('#announcement')!.textContent = content.revealed
    progress.revealed = true
  }
  save()
  const focus = next.querySelector<HTMLElement>('[data-action="' + from + '"]') ?? next.querySelector('h1')
  focus?.focus({ preventScroll: true })
}
async function fall(figure: HTMLElement, start: string, end: string, duration: number) {
  if (reduced.matches) return
  const animation = figure.animate([{ transform: 'translateY(' + start + ')' }, { transform: 'translateY(' + end + ')' }], { duration, easing: 'ease-in', fill: 'forwards' })
  await animation.finished
  animation.cancel()
}
function sync() {
  const id = resolveScene(location.hash, progress)
  if (id !== 'intro' && id !== 'mappa' && !history.state?.fromMap) {
    history.replaceState(null, '', '#mappa')
    history.pushState({ fromMap: true }, '', '#' + id)
  } else if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id)
  if (current !== id) void display(id)
  else if (scene) syncDetail(scene)
}
world.addEventListener('click', async event => {
  const action = (event.target as Element).closest<HTMLButtonElement>('button')?.dataset.action ?? (current === 'intro' ? 'mappa' : undefined)
  if (!action || !scene || scene.inert || scene.dataset.jumping) return
  if (action === 'equip') {
    if (current !== 'intro' || progress.flight !== 'retry') return
    progress.flight = 'equipped'
    world.dataset.flight = progress.flight
    scene.querySelector('.pack-pickup')?.remove()
    document.querySelector('#announcement')!.textContent = content.ui.equipped
    scene.querySelector<HTMLButtonElement>('.enter')?.focus()
    save()
    return
  }
  if (action === 'retry') {
    progress.flight = 'retry'
    save()
    history.replaceState(null, '', '#intro')
    sync()
    return
  }
  if (current === 'intro') {
    const launch = scene
    launch.inert = true
    await fall(launch.querySelector('.traveler')!, '0px', '90vh', 800)
    if (scene !== launch) return
    fromPlane = true
    if (progress.flight !== 'equipped') progress.flight = 'over'
    save()
  }
  if (current === 'mappa' && (isIsland(action) || action === 'finale')) {
    const departing = scene
    departing.dataset.jumping = 'true'
    await jumpTo(departing, action)
    delete departing.dataset.jumping
    if (scene !== departing || location.hash !== '#mappa') return
  }
  if (action === 'reset') {
    if (!confirm(content.confirmReset)) return
    progress = readProgress(null)
    clearGame()
    resetAlbum()
    document.querySelector('#announcement')!.textContent = ''
    history.replaceState(null, '', '#intro')
  } else if (action === 'back') {
    scene!.inert = true
    history.go(history.state?.detail ? -2 : -1)
    return
  } else if (current === 'intro') history.replaceState(null, '', '#mappa')
  else history.pushState({ fromMap: true }, '', '#' + action)
  sync()
})
window.addEventListener('popstate', sync)
window.addEventListener('hashchange', sync)
sync()

import { mountAlbum, resetAlbum } from './album'
import { mountGarden } from './memories'
import { actor, placeTraveler } from './actors'
import { mountRoom } from './room'
export { resetAlbum }
import { content } from './content'
import { canVisit, isIsland, islands, type Destination, type Scene, type Progress } from './journey'
import photographs from './art/fotografie.svg'
import willow from './art/giardino.svg'
import cottage from './art/giochi.svg'
import { mountFinale } from './finale'
import planet from './art/finale.svg'

const art = { fotografie: photographs, giardino: willow, giochi: cottage, finale: planet }
export const star = '<svg viewBox="0 0 32 40" aria-hidden="true"><path fill="currentColor" d="M16 0l3 13 3 4 10 3-10 3-3 4-3 13-3-13-3-4L0 20l10-3 3-4z"/></svg>'
function button(action: string, label: string, className: string) {
  const el = document.createElement('button')
  el.dataset.action = action
  el.className = className
  el.textContent = label
  return el
}
function heading(text: string) {
  const h = document.createElement('h1')
  h.textContent = text
  h.tabIndex = -1
  return h
}
function motif(id: Destination) {
  const img = new Image()
  img.src = art[id]
  img.alt = ''
  return img
}
function intro(el: HTMLElement, progress: Progress) {
  const center = document.createElement('div')
  center.className = 'intro-center'
  const phrase = document.createElement('p')
  phrase.textContent = content.intro
  const enter = button('mappa', '', 'enter')
  enter.setAttribute('aria-label', content.enter)
  enter.insertAdjacentHTML('afterbegin', star)
  const plane = document.createElement('div')
  plane.className = 'airplane'
  plane.append(actor('traveler'))
  if (progress.flight === 'retry') {
    const pickup = button('equip', '', 'pack-pickup')
    pickup.setAttribute('aria-label', content.ui.equip)
    plane.append(pickup)
  }
  center.append(plane, heading(content.title), phrase, enter)
  el.append(center)
}
function map(el: HTMLElement, progress: Progress, origin?: Destination) {
  const title = heading(content.ui.map)
  title.className = 'sr'
  const chart = document.createElement('nav')
  chart.className = 'chart'
  chart.setAttribute('aria-label', content.ui.islands)
  const ids: Destination[] = [...islands]
  if (canVisit('finale', progress)) ids.push('finale')
  for (const id of ids) {
    const item = button(id, '', 'island ' + id)
    item.disabled = !canVisit(id, progress)
    const label = document.createElement('span')
    label.textContent = content.names[id]
    if (id !== 'finale' && progress.visits.includes(id)) {
      label.insertAdjacentHTML('beforeend', star)
      item.setAttribute('aria-label', content.names[id] + ', ' + content.ui.visited)
    }
    const surface = document.createElement('div')
    surface.className = 'island-art'
    surface.append(motif(id))
    item.append(surface, label)
    chart.append(item)
  }
  placeTraveler(chart, origin)
  const clouds = document.createElement('div')
  clouds.className = 'map-clouds'
  clouds.setAttribute('aria-hidden','true')
  for (let layer = 0; layer < 4; layer++) {
    const band = document.createElement('div')
    band.className = 'cloud-band'
    clouds.append(band)
  }
  el.append(clouds, title, chart, button('reset', content.reset, 'reset'))
}
export function makeScene(id: Scene, progress: Progress, origin?: Destination) {
  const el = document.createElement('section')
  el.dataset.scene = id
  if (id === 'intro') intro(el, progress)
  else if (id === 'mappa') map(el, progress, origin)
  else if (isIsland(id)) {
    el.className = 'interior'
    el.append(button('back', content.back, 'back'), heading(content.names[id]))
    if (id === 'fotografie') mountAlbum(el)
    if (id === 'giardino') mountGarden(el)
    if (id === 'giochi') mountRoom(el)
    const figure = actor('traveler')
    figure.classList.add('scene-traveler')
    const set = el.querySelector('.room-set') ?? el
    set.append(figure)
  } else {
    el.className = 'planet-scene'
    const title = heading(content.names[id])
    title.className = 'sr'
    el.append(button('back', content.back, 'back'), title)
    mountFinale(el)
  }
  return el
}

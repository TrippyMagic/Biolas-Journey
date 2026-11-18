import { mountAlbum, mountGarden, resetAlbum } from './memories'
import { mountRoom } from './room'
export { resetAlbum }
import { content } from './content'
import { isIsland, islands, unlocked, type Destination, type Scene, type Progress } from './journey'
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
function intro(el: HTMLElement) {
  const center = document.createElement('div')
  center.className = 'intro-center'
  const phrase = document.createElement('p')
  phrase.textContent = content.intro
  const enter = button('mappa', '', 'enter')
  enter.setAttribute('aria-label', content.enter)
  enter.insertAdjacentHTML('afterbegin', star)
  center.append(heading(content.title), phrase, enter)
  el.append(center)
}
function map(el: HTMLElement, progress: Progress) {
  const title = heading(content.ui.map)
  title.className = 'sr'
  const chart = document.createElement('nav')
  chart.className = 'chart'
  chart.setAttribute('aria-label', content.ui.islands)
  const ids: Destination[] = [...islands]
  if (unlocked(progress)) ids.push('finale')
  for (const id of ids) {
    const item = button(id, '', 'island ' + id)
    const label = document.createElement('span')
    label.textContent = content.names[id]
    if (id !== 'finale' && progress.visits.includes(id)) {
      label.insertAdjacentHTML('beforeend', star)
      item.setAttribute('aria-label', content.names[id] + ', ' + content.ui.visited)
    }
    item.append(motif(id), label)
    chart.append(item)
  }
  el.append(title, chart, button('reset', content.reset, 'reset'))
}
export function makeScene(id: Scene, progress: Progress) {
  const el = document.createElement('section')
  el.dataset.scene = id
  if (id === 'intro') intro(el)
  else if (id === 'mappa') map(el, progress)
  else if (isIsland(id)) {
    el.className = 'interior'
    el.append(button('back', content.back, 'back'), heading(content.names[id]))
    if (id === 'fotografie') mountAlbum(el)
    if (id === 'giardino') mountGarden(el)
    if (id === 'giochi') mountRoom(el)
  } else {
    el.className = 'planet-scene'
    const title = heading(content.names[id])
    title.className = 'sr'
    el.append(button('back', content.back, 'back'), title)
    mountFinale(el)
  }
  return el
}

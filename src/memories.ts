import { content, type Photo } from './content'
import { control, openDetail, registerDetail } from './detail'

let lastIndex = 0
export function resetAlbum() { lastIndex = 0 }
function photoImage(photo: Photo, thumbnail = false) {
  const image = new Image()
  image.alt = photo.alt
  image.src = import.meta.env.BASE_URL + (thumbnail && photo.thumbnail || photo.src)
  image.onerror = () => { image.style.visibility = 'hidden' }
  return image
}
export function mountAlbum(scene: HTMLElement) {
  const photos = content.photos
  if (!photos.length) return
  const stage = document.createElement('div')
  stage.className = 'clothesline'
  stage.innerHTML = '<svg aria-hidden="true" viewBox="0 0 1000 30" preserveAspectRatio="none"><path d="M0 1Q500 48 1000 1" fill="none" stroke="#785f70" stroke-width="3"/></svg>'
  const prints = document.createElement('div')
  prints.className = 'prints'
  stage.append(prints)
  const count = () => matchMedia('(min-width:768px)').matches ? 4 : 2
  const page = () => Math.floor(lastIndex / count())
  function move(step: number) {
    lastIndex = (page() + step) * count()
    draw()
  }
  const prev = control('←', () => move(-1))
  const next = control('→', () => move(1))
  prev.setAttribute('aria-label', content.ui.previousLine)
  next.setAttribute('aria-label', content.ui.nextLine)
  const controls = document.createElement('div')
  controls.className = 'line-controls'
  controls.append(prev, next)
  scene.append(stage, controls)
  function draw() {
    const start = page() * count()
    prints.replaceChildren()
    for (const photo of photos.slice(start, start + count())) {
      const print = control('', () => openDetail(scene, photo.id))
      print.className = 'print'
      print.dataset.open = photo.id
      const paper = document.createElement('span')
      paper.className = 'paper'
      paper.append(photoImage(photo, true))
      print.append(paper)
      prints.append(print)
    }
    prev.disabled = !start
    next.disabled = start + count() >= photos.length
  }
  draw()
  const layout = matchMedia('(min-width:768px)')
  layout.addEventListener('change', draw)
  scene.addEventListener('depart', () => layout.removeEventListener('change', draw), { once: true })
  registerDetail(scene, (id, body) => {
    const index = photos.findIndex(photo => photo.id === id)
    if (index < 0) return
    lastIndex = index
    draw()
    const image = photoImage(photos[index])
    image.className = 'focused-photo'
    const arrows = document.createElement('nav')
    arrows.className = 'photo-nav'
    for (const step of [-1, 1]) {
      const neighbor = photos[index + step]
      const arrow = control(step < 0 ? content.ui.previousPhoto : content.ui.nextPhoto, () => {
        if (neighbor) {
          openDetail(scene, neighbor.id, true)
          const buttons = body.querySelectorAll<HTMLButtonElement>('nav button')
          const same = buttons[step < 0 ? 0 : 1]
          const target = same.disabled ? buttons[step < 0 ? 1 : 0] : same
          target.focus()
        }
      })
      arrow.disabled = !neighbor
      arrows.append(arrow)
    }
    body.append(image, arrows)
    if (photos[index + 1]) photoImage(photos[index + 1])
  })
}

const anchors = [[18,30],[78,32],[50,48],[22,69],[80,71],[47,21],[16,49],[79,51],[48,74],[60,61]]
export function mountGarden(scene: HTMLElement) {
  const meadow = document.createElement('div')
  meadow.className = 'meadow'
  scene.append(meadow)
  content.messages.slice(0,10).forEach((message, index) => {
    const light = control('', () => openDetail(scene, message.id))
    light.className = 'firefly'
    light.dataset.open = message.id
    light.setAttribute('aria-label', content.ui.firefly + ' ' + (index + 1))
    light.style.left = anchors[index][0] + '%'
    light.style.top = anchors[index][1] + '%'
    light.style.setProperty('--delay', -index * .8 + 's')
    meadow.append(light)
  })
  registerDetail(scene, (id, body) => {
    const note = document.createElement('p')
    note.className = 'note'
    note.textContent = content.messages.find(message => message.id === id)?.text ?? ''
    body.append(note)
  })
}

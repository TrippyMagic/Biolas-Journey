import { content, type Photo } from './content'
import { control, openDetail, registerDetail } from './detail'
import './album.css'

let lastGroup = 0
export function resetAlbum() { lastGroup = 0 }

function photoImage(photo: Photo, thumbnail = false) {
  const image = new Image()
  image.alt = photo.alt
  if (thumbnail) image.loading = 'lazy'
  image.src = import.meta.env.BASE_URL + (thumbnail && photo.thumbnail || photo.src)
  image.onerror = () => { image.style.visibility = 'hidden' }
  return image
}

export function mountAlbum(scene: HTMLElement) {
  const groups = content.photoGroups.filter(group => group.photos.length)
  if (!groups.length) return
  const photos = groups.flatMap(group => group.photos)
  const reel = document.createElement('div')
  reel.className = 'album-reel'
  const reduced = matchMedia('(prefers-reduced-motion: reduce)')
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) entry.target.classList.toggle('on-film', entry.isIntersecting)
  }, { root: reel, threshold: .28 })
  const pages = groups.map((group, index) => {
    const page = document.createElement('article')
    page.className = 'album-page'
    const caption = document.createElement('h2')
    caption.id = 'caption-' + index
    caption.textContent = group.caption
    page.setAttribute('aria-labelledby', caption.id)
    const line = document.createElement('div')
    line.className = 'photo-line'
    for (const [order, photo] of group.photos.entries()) {
      const print = control('', () => openDetail(scene, photo.id))
      print.className = 'print'
      print.dataset.open = photo.id
      print.style.setProperty('--order', String(order))
      const paper = document.createElement('span')
      paper.className = 'paper'
      paper.append(photoImage(photo, true))
      print.append(paper)
      line.append(print)
      observer.observe(print)
    }
    page.append(caption, line)
    reel.append(page)
    return page
  })
  function go(index: number, smooth = false) {
    reel.scrollTo({ left: index * reel.clientWidth, behavior: smooth && !reduced.matches ? 'smooth' : 'instant' })
  }
  const previous = control('←', () => go(lastGroup - 1, true))
  const next = control('→', () => go(lastGroup + 1, true))
  previous.setAttribute('aria-label', content.ui.previousLine)
  next.setAttribute('aria-label', content.ui.nextLine)
  const position = document.createElement('output')
  const controls = document.createElement('nav')
  controls.className = 'line-controls'
  controls.append(previous, position, next)
  scene.append(reel, controls)
  function mark(index: number) {
    lastGroup = index
    pages.forEach((page, i) => { page.inert = index !== i })
    previous.disabled = index === 0
    next.disabled = index === pages.length - 1
    position.textContent = (index + 1) + ' / ' + pages.length
  }
  mark(Math.min(lastGroup, pages.length - 1))
  // The coordinator attaches the scene after mounting its contents.
  const frame = requestAnimationFrame(() => go(lastGroup))
  reel.addEventListener('scroll', () => {
    if (!reel.clientWidth) return
    const index = Math.round(reel.scrollLeft / reel.clientWidth)
    if (pages[index] && index !== lastGroup) mark(index)
  })
  scene.addEventListener('depart', () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
  }, { once: true })

  registerDetail(scene, (id, body) => {
    const index = photos.findIndex(photo => photo.id === id)
    if (index < 0) return
    const group = groups.findIndex(group => group.photos.some(photo => photo.id === id))
    go(group)
    mark(group)
    const image = photoImage(photos[index])
    image.className = 'focused-photo'
    const arrows = document.createElement('nav')
    arrows.className = 'photo-nav'
    for (const step of [-1, 1]) {
      const neighbor = photos[index + step]
      const arrow = control(step < 0 ? content.ui.previousPhoto : content.ui.nextPhoto, () => {
        if (!neighbor) return
        openDetail(scene, neighbor.id, true)
        const buttons = body.querySelectorAll<HTMLButtonElement>('nav button')
        const same = buttons[step < 0 ? 0 : 1]
        const target = same.disabled ? buttons[step < 0 ? 1 : 0] : same
        target.focus()
      })
      arrow.disabled = !neighbor
      arrows.append(arrow)
    }
    body.append(image, arrows)
    if (photos[index + 1]) photoImage(photos[index + 1])
  })
}

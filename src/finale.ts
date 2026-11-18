import { content } from './content'
import './finale.css'

export function mountFinale(scene: HTMLElement) {
  const { photo, dedication, photoPlaceholder } = content.finale
  const reading = document.createElement('div')
  reading.className = 'planet-reading'
  const spread = document.createElement('div')
  spread.className = 'planet-spread'
  const print = document.createElement('div')
  print.className = 'planet-print'
  print.textContent = photoPlaceholder
  if (photo.src) {
    const image = new Image()
    image.alt = photo.alt
    image.onerror = () => { print.textContent = photoPlaceholder }
    print.replaceChildren(image)
    image.src = import.meta.env.BASE_URL + photo.src
  }

  const letter = document.createElement('article')
  letter.className = 'planet-letter'
  for (const text of dedication) {
    const paragraph = document.createElement('p')
    paragraph.textContent = text
    letter.append(paragraph)
  }
  spread.append(print, letter)
  const landscape = document.createElement('div')
  landscape.className = 'planet-landscape'
  landscape.setAttribute('role', 'img')
  landscape.setAttribute('aria-label', content.finale.landscapeAlt)
  reading.append(spread, landscape)
  scene.append(reading)
}

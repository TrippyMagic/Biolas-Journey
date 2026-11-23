import { content } from './content'
import './finale.css'
import { actor, arrive } from './actors'

export function mountFinale(scene: HTMLElement) {
  const { photo, dedication, dedicationSignature, postScriptum, photoPlaceholder } = content.finale
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
  const date = document.createElement('time')
  date.dateTime = '2026-11-24'
  date.textContent = '24 Novembre 2026'
  letter.append(date)
  for (const text of dedication) {
    const paragraph = document.createElement('p')
    paragraph.textContent = text
    letter.append(paragraph)
  }
  if (dedicationSignature || postScriptum) {
    const ending = document.createElement('footer')
    if (dedicationSignature) {
      const signature = document.createElement('p')
      signature.className = 'letter-signature'
      signature.textContent = dedicationSignature
      ending.append(signature)
    }
    if (postScriptum) {
      const postscript = document.createElement('p')
      postscript.className = 'letter-postscript'
      postscript.textContent = 'P.S. ' + postScriptum
      ending.append(postscript)
    }
    letter.append(ending)
  }
  if (photo.src) spread.append(print)
  spread.append(letter)
  const landscape = document.createElement('div')
  landscape.className = 'planet-landscape'
  landscape.setAttribute('role', 'img')
  landscape.setAttribute('aria-label', content.finale.landscapeAlt)
  const traveler = actor('traveler')
  traveler.hidden = true
  landscape.append(actor('host'), traveler)
  reading.append(spread)
  scene.append(reading, landscape)
  scene.addEventListener('active', () => { traveler.hidden = false; arrive(traveler) }, { once: true })
}

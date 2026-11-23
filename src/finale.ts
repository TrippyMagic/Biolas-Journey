import { content } from './content'
import { preparedPhoto } from './photos'
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
  const prepared = preparedPhoto(photo.src, photo.alt)
  if (prepared) print.replaceChildren(prepared.image)

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
  const nicco = actor('host')
  const couple = actor('couple')
  couple.hidden = true
  landscape.append(nicco, traveler, couple)
  reading.append(spread)
  scene.append(reading, landscape)
  scene.addEventListener('active', async () => {
    traveler.hidden = false
    await arrive(traveler)
    traveler.hidden = nicco.hidden = true
    couple.hidden = false
  }, { once: true })
}

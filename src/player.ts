import { content } from './content'
import { control } from './detail'
import turntable from './art/turntable.svg?raw'
import './player.css'

function deck() {
  const el = document.createElement('div')
  el.className = 'record-deck'
  el.innerHTML = turntable
  return el
}

export function roomPlayer(scene: HTMLElement) {
  const audio = new Audio()
  const tracks = content.tracks.filter(track => track.src.trim()).slice(0, 3)
  const miniature = deck()
  let selection = 0
  let loaded = false
  let failed = false
  let revision = 0
  let updatePanel = () => {}

  function refresh() {
    miniature.classList.toggle('spinning', !audio.paused)
    miniature.style.setProperty('--label', ['#d48681','#8caba1','#b59cc7'][selection])
    updatePanel()
  }
  function start(index: number) {
    if (!tracks[index]) return
    const request = ++revision
    failed = false
    if (!loaded || index !== selection) {
      selection = index
      audio.src = import.meta.env.BASE_URL + tracks[index].src
      loaded = true
      scene.querySelectorAll('.disc-loader').forEach(disc => {
        if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
          disc.animate([{ transform: 'translate(-18px,-34px)', opacity: 0 }, { transform: 'translate(0,0)', opacity: 1 }], { duration: 450, easing: 'ease-out' })
      })
    }
    void audio.play().catch(() => {
      if (request === revision) { failed = true; loaded = false; refresh() }
    })
    refresh()
  }
  audio.onplay = audio.onpause = refresh
  audio.onerror = () => { if (audio.hasAttribute('src')) { failed = true; loaded = false; refresh() } }
  audio.onended = () => start((selection + 1) % tracks.length)
  scene.addEventListener('depart', () => {
    revision++
    audio.onended = audio.onplay = audio.onpause = audio.onerror = null
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
  }, { once: true })

  function panel(body: HTMLElement) {
    const title = document.createElement('h2')
    title.textContent = content.ui.turntable
    const large = deck()
    const choices = document.createElement('div')
    choices.className = 'record-sleeves'
    const buttons = tracks.map((track, i) => {
      const button = control(track.title, () => start(i))
      choices.append(button)
      return button
    })
    const toggle = control('', () => {
      if (audio.paused) start(selection)
      else { revision++; audio.pause() }
    })
    toggle.className = 'play-toggle'
    const status = document.createElement('p')
    status.className = 'player-status'
    status.setAttribute('role','status')
    body.append(title, large, choices, toggle, status)
    updatePanel = () => {
      large.classList.toggle('spinning', !audio.paused)
      large.style.setProperty('--label', miniature.style.getPropertyValue('--label'))
      toggle.hidden = !tracks.length
      toggle.textContent = audio.paused ? (loaded ? content.ui.resume : content.ui.play) : content.ui.pause
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === selection && loaded)))
      status.textContent = failed ? content.ui.audioError : tracks.length ? '' : content.ui.emptyTracks
    }
    refresh()
  }
  return { miniature, panel }
}

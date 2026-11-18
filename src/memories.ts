import { content } from './content'
import { control, openDetail, registerDetail } from './detail'
import './garden.css'

const anchors = [[18,30],[78,32],[50,48],[22,69],[80,71],[47,21],[16,49],[79,51],[48,74],[60,61]]
export function mountGarden(scene: HTMLElement) {
  const meadow = document.createElement('div')
  meadow.className = 'meadow'
  const mist = document.createElement('div')
  mist.className = 'meadow-mist'
  meadow.append(mist)
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

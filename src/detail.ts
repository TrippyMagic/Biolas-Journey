import { content } from './content'

type DetailRenderer = (id: string, body: HTMLElement) => void
const renderers = new WeakMap<HTMLElement, DetailRenderer>()
export function registerDetail(scene: HTMLElement, render: DetailRenderer) {
  renderers.set(scene, render)
}
export function control(label: string, click: () => void) {
  const button = document.createElement('button')
  button.textContent = label
  button.onclick = click
  return button
}
export function openDetail(scene: HTMLElement, id: string, replace = false) {
  const state = { ...history.state, detail: id }
  if (replace) history.replaceState(state, '')
  else history.pushState(state, '')
  syncDetail(scene)
}
export function syncDetail(scene: HTMLElement) {
  const render = renderers.get(scene)
  if (!render) return
  const id = history.state?.detail
  let dialog = scene.querySelector<HTMLDialogElement>('dialog[open]')
  if (!id) {
    if (dialog) {
      const target = dialog.dataset.detail
      dialog.close()
      if (!dialog.hasAttribute('data-minimized')) dialog.remove()
      Array.from(scene.querySelectorAll<HTMLElement>('[data-open]')).find(el => el.dataset.open === target)?.focus()
    }
    return
  }
  if (dialog?.dataset.detail === id) return
  const minimized = scene.querySelector<HTMLDialogElement>('dialog[data-minimized]')
  if (!dialog && minimized && minimized.dataset.detail === id) {
    delete minimized.dataset.minimized
    minimized.showModal()
    return
  }
  if (!dialog) {
    dialog = document.createElement('dialog')
    dialog.setAttribute('aria-label', content.names[scene.dataset.scene as keyof typeof content.names])
    const back = control(content.back, () => history.go(-2))
    const close = control(content.ui.close, () => history.back())
    const bar = document.createElement('header')
    bar.append(back, close)
    const body = document.createElement('div')
    body.className = 'detail-body'
    dialog.append(bar, body)
    dialog.oncancel = event => { event.preventDefault(); history.back() }
    scene.append(dialog)
    dialog.showModal()
  }
  dialog.dataset.detail = id
  const body = dialog.querySelector<HTMLElement>('.detail-body')!
  body.replaceChildren()
  render(id, body)
  if (dialog.contains(document.activeElement) === false) dialog.querySelector('button')?.focus()
}

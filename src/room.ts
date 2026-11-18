import { control, openDetail, registerDetail } from './detail'
import { content } from './content'
import { roomPlayer } from './player'
import { loadGame, saveGame, initialGame, complete, puzzleFor, puzzles, enterDigit } from './sudoku'

function notebook(body: HTMLElement) {
  let game = loadGame()
  let selected = puzzleFor(game).givens.indexOf('0')
  const grid = document.createElement('div')
  grid.className = 'sudoku-grid'
  const pad = document.createElement('div')
  pad.className = 'number-pad'
  const status = document.createElement('p')
  status.className = 'game-status'
  status.setAttribute('role','status')
  function select(index: number) {
    selected = index
    refresh()
    cells[selected].focus()
  }
  function write(digit: string) {
    game = enterDigit(game,selected,digit)
    saveGame(game)
    refresh()
  }
  const cells = Array.from({length:81}, (_,i) => {
    const cell = control('', () => select(i))
    cell.onkeydown = event => {
      const shifts: Record<string,number> = { ArrowUp:-9, ArrowDown:9, ArrowLeft:-1, ArrowRight:1 }
      if (event.key in shifts) select(Math.max(0,Math.min(80,selected + shifts[event.key])))
      else if (/^[1-9]$/.test(event.key)) write(event.key)
      else if (['Delete','Backspace','0'].includes(event.key)) write('0')
      else return
      event.preventDefault()
    }
    grid.append(cell)
    return cell
  })
  for (const digit of '1234567890') pad.append(control(digit === '0' ? content.ui.erase : digit, () => write(digit)))
  function refresh() {
    const puzzle = puzzleFor(game)
    cells.forEach((cell,i) => {
      const value = game.values[i]
      const fixed = puzzle.givens[i] !== '0'
      const wrong = value !== '0' && value !== puzzle.solution[i]
      cell.textContent = value === '0' ? '' : value
      cell.tabIndex = i === selected ? 0 : -1
      cell.classList.toggle('fixed',fixed)
      cell.classList.toggle('selected',i === selected)
      cell.classList.toggle('related',i%9 === selected%9 || Math.floor(i/9) === Math.floor(selected/9))
      cell.classList.toggle('wrong',wrong)
      cell.setAttribute('aria-label', `Riga ${Math.floor(i/9)+1}, colonna ${i%9+1}, ${cell.textContent || 'vuota'}${fixed ? ', indizio' : ''}${wrong ? ', errata' : ''}`)
    })
    const value = game.values[selected]
    status.textContent = complete(game) ? content.ui.completed : value !== '0' && value !== puzzle.solution[selected] ? content.ui.wrong : ''
  }
  function restart(next: boolean) {
    const puzzle = puzzleFor(game)
    if (!complete(game) && game.values !== puzzle.givens && !confirm(content.ui.replaceGame)) return
    game = initialGame((puzzles.indexOf(puzzle) + Number(next)) % puzzles.length)
    saveGame(game)
    select(puzzleFor(game).givens.indexOf('0'))
  }
  const actions = document.createElement('div')
  actions.className = 'game-actions'
  actions.append(control(content.ui.restartGame, () => restart(false)), control(content.ui.nextGame, () => restart(true)))
  const layout = document.createElement('div')
  layout.className = 'game-layout'

  const title = document.createElement('h2')
  title.textContent = content.ui.sudoku
  const sheet = document.createElement('div')
  sheet.className = 'puzzle-sheet'
  sheet.append(title, grid)
  layout.append(sheet, pad)
  body.append(layout,status,actions)
  refresh()
}
export function mountRoom(scene: HTMLElement) {
  const room = document.createElement('div')
  room.className = 'room-set'
  const book = control(content.ui.sudoku, () => openDetail(scene,'sudoku'))
  book.dataset.open = 'sudoku'
  book.className = 'table-item book-item'
  book.innerHTML = '<i class="book-cover" aria-hidden="true"></i><span></span>'
  book.lastElementChild!.textContent = content.ui.sudoku
  const player = roomPlayer(scene)
  const record = control('', () => openDetail(scene,'giradischi'))
  record.dataset.open = 'giradischi'
  record.className = 'table-item turntable-item'
  const label = document.createElement('span')
  label.textContent = content.ui.turntable
  record.append(player.miniature, label)
  const signs = document.createElement('div')
  signs.className = 'signs'
  for (const sign of content.signs) {
    if (!sign.url) continue
    let url: URL
    try { url = new URL(sign.url) } catch { continue }
    if (!['https:','http:'].includes(url.protocol)) continue
    const link = document.createElement('a')
    link.href = url.href
    link.rel = 'noopener'
    link.target = '_blank'
    link.textContent = sign.label
    link.setAttribute('aria-label', sign.label + ', ' + content.ui.newTab)
    signs.append(link)
  }
  const computer = control('', () => openDetail(scene,'computer'))
  computer.className = 'table-item computer-item'
  computer.dataset.open = 'computer'
  const computerLabel = document.createElement('span')
  computerLabel.textContent = content.computer.title
  computer.append(document.createElement('i'), computerLabel)
  room.append(signs, record, book, computer)
  scene.append(room)
  registerDetail(scene, (id,body) => {
    if (id === 'giradischi') return player.panel(body)
    if (id !== 'computer') return notebook(body)
    const dialog = body.closest('dialog')!
    const screen = document.createElement('iframe')
    screen.title = content.computer.site
    screen.src = content.computer.url
    const external = document.createElement('a')
    external.href = content.computer.url
    external.target = '_blank'
    external.rel = 'noopener noreferrer'
    external.textContent = content.computer.open
    const minimize = control(content.computer.minimize, () => {
      dialog.dataset.minimized = 'true'
      history.back()
    })
    dialog.querySelector('header')!.insertBefore(minimize, dialog.querySelector('header')!.lastChild)
    body.append(screen, external)
  })
}

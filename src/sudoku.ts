export const puzzles = [
  {
    "id": "quaderno-1",
    "givens": "530008012072000348008000500800060000420850091703904856961507084080000600000280170",
    "solution": "534678912672195348198342567859761423426853791713924856961537284287419635345286179"
  },
  {
    "id": "quaderno-2",
    "givens": "602908034480002090500000286724800650000760000963000800040509300257300948090020060",
    "solution": "672958134481632795539174286724891653815763429963245817146589372257316948398427561"
  },
  {
    "id": "quaderno-3",
    "givens": "203810065758006010600007080801642039320570840046080270000060023100003000432000000",
    "solution": "293814765758236914614957382871642539329571846546389271987465123165723498432198657"
  },
  {
    "id": "quaderno-4",
    "givens": "006532400098006320000948700040765090670000000200480050020807030500004108100050000",
    "solution": "716532489498176325352948761841765293675329814239481657924817536563294178187653942"
  },
  {
    "id": "quaderno-5",
    "givens": "029000005083010629100000703000732508300008900000600372030000001400026050007040230",
    "solution": "629873145783415629145269783964732518372158964518694372236587491491326857857941236"
  },
  {
    "id": "quaderno-6",
    "givens": "000370500000000629000926000090000804730018002480200060003502006600130000028607400",
    "solution": "962371548317845629854926173295763814736418952481259367143582796679134285528697431"
  }
] as const

const key = 'biolas-journey:sudoku:v1'
export interface Game { id: string; values: string }
let session: Game | undefined
export function initialGame(index = 0): Game {
  const puzzle = puzzles[index]
  return { id: puzzle.id, values: puzzle.givens }
}
export function puzzleFor(game: Game) {
  return puzzles.find(puzzle => puzzle.id === game.id) ?? puzzles[0]
}
export function loadGame(): Game {
  if (session) return session
  try {
    const game = JSON.parse(localStorage.getItem(key) ?? 'null')
    const puzzle = puzzles.find(entry => entry.id === game?.id)
    if (puzzle && typeof game.values === 'string' && /^\d{81}$/.test(game.values) &&
      [...puzzle.givens].every((n,i) => n === '0' || n === game.values[i])) return game
  } catch { /* Use a fresh puzzle when storage is unavailable. */ }
  return initialGame()
}
export function clearGame() {
  session = initialGame()
  try { localStorage.removeItem(key) } catch { /* Session was reset above. */ }
}
export function saveGame(game: Game) {
  session = game
  try { localStorage.setItem(key, JSON.stringify(game)) } catch { /* Retain the session copy. */ }
}
export function enterDigit(game: Game, index: number, digit: string): Game {
  if (!/^[0-9]$/.test(digit) || puzzleFor(game).givens[index] !== '0') return game
  return { ...game, values: game.values.slice(0,index) + digit + game.values.slice(index+1) }
}
export function complete(game: Game) { return game.values === puzzleFor(game).solution }

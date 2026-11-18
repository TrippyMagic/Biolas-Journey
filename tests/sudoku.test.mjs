import test from 'node:test'
import assert from 'node:assert/strict'
import { puzzles, enterDigit, complete, initialGame } from '../src/sudoku.ts'

for (const [index, puzzle] of puzzles.entries()) {
  test(puzzle.id + ' has a unique solution reachable by forced single digits', () => {
    const cells = [...puzzle.givens]
    while (cells.includes('0')) {
      let advanced = false
      cells.forEach((digit, i) => {
        if (digit !== '0') return
        const peers = cells.filter((_,j) => Math.floor(i/9) === Math.floor(j/9) ||
          i%9 === j%9 || Math.floor(i/27) === Math.floor(j/27) && Math.floor(i%9/3) === Math.floor(j%9/3))
        const possible = [...'123456789'].filter(n => !peers.includes(n))
        assert.ok(possible.length > 0)
        if (possible.length === 1) { cells[i] = possible[0]; advanced = true }
      })
      assert.ok(advanced)
    }
    assert.equal(cells.join(''), puzzle.solution)
    let game = initialGame(index)
    const fixed = [...puzzle.givens].findIndex(n => n !== '0')
    assert.equal(enterDigit(game,fixed,'0'),game)
    assert.equal(complete(game),false)
    cells.forEach((n,i) => { game = enterDigit(game,i,n) })
    assert.equal(complete(game),true)
  })
}

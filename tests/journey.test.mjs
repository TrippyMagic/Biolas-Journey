import test from 'node:test'
import assert from 'node:assert/strict'
import { readProgress, resolveScene } from '../src/journey.ts'

const equipped = { flight: 'equipped', jetpackCollected: true, entered: true }

test('each island opens the next, while completed destinations remain available', () => {
  const progress = readProgress(JSON.stringify(equipped))
  const route = ['giochi', 'giardino', 'fotografie', 'finale']
  for (const [index, destination] of route.entries()) {
    for (const id of route) assert.equal(
      resolveScene('#' + id, progress),
      route.indexOf(id) <= index ? id : 'mappa',
    )
    if (destination !== 'finale') progress.visits.push(destination)
  }
})

test('older saves retain their visits without skipping a missing prerequisite', () => {
  const partial = readProgress(JSON.stringify({ ...equipped, visits: ['giochi','giochi','fotografie'], revealed: true }))
  assert.equal(resolveScene('#fotografie', partial), 'mappa')
  assert.equal(resolveScene('#finale', partial), 'mappa')
  partial.visits.push('giardino')
  assert.equal(resolveScene('#finale', readProgress(JSON.stringify({ ...equipped, ...partial }))), 'finale')
})
test('entry, resume, direct islands and invalid fragments', () => {
  const fresh = readProgress('invalid')
  assert.equal(resolveScene('', fresh), 'intro')
  assert.equal(resolveScene('#giochi', fresh), 'intro')
  assert.equal(resolveScene('#missing', fresh), 'intro')
  assert.equal(resolveScene('#missing', readProgress(JSON.stringify(equipped))), 'mappa')
  assert.equal(resolveScene('', { ...fresh, entered: true }), 'intro')
})

test('game over survives reload and retry leads back to the airplane', () => {
  const lost = readProgress('{"flight":"over"}')
  assert.equal(resolveScene('#giardino', lost), 'mappa')
  assert.equal(resolveScene('#mappa', readProgress('{"flight":"retry"}')), 'intro')
  assert.equal(readProgress('{"entered":true}').flight, 'first')
  assert.equal(readProgress('{"entered":true,"flight":"equipped"}').flight, 'first')
  assert.equal(readProgress('{"jetpackCollected":true,"flight":"equipped"}').flight, 'equipped')
  assert.equal(resolveScene('#mappa', readProgress('{"entered":true}')), 'intro')
  assert.equal(readProgress(null).flight, 'first')
})

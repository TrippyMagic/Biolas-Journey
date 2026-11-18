import test from 'node:test'
import assert from 'node:assert/strict'
import { readProgress, resolveScene, unlocked } from '../src/journey.ts'

test('duplicate visits and the presentation flag cannot unlock the lookout', () => {
  const partial = readProgress('{"visits":["giochi","giochi","fotografie"],"revealed":true}')
  assert.equal(unlocked(partial), false)
  assert.equal(resolveScene('#finale', partial), 'mappa')
  partial.visits.push('giardino')
  assert.equal(resolveScene('#finale', readProgress(JSON.stringify(partial))), 'finale')
})
test('entry, resume, direct islands and invalid fragments', () => {
  const fresh = readProgress('invalid')
  assert.equal(resolveScene('', fresh), 'intro')
  assert.equal(resolveScene('#giardino', fresh), 'giardino')
  assert.equal(resolveScene('#missing', fresh), 'mappa')
  assert.equal(resolveScene('', { ...fresh, entered: true }), 'mappa')
})

test('game over survives reload and retry leads back to the airplane', () => {
  const lost = readProgress('{"flight":"over"}')
  assert.equal(resolveScene('#giardino', lost), 'mappa')
  assert.equal(resolveScene('#mappa', readProgress('{"flight":"retry"}')), 'intro')
  assert.equal(readProgress('{"entered":true}').flight, 'equipped')
  assert.equal(readProgress(null).flight, 'first')
})

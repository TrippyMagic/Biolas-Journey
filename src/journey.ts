export const islands = ['giochi', 'giardino', 'fotografie'] as const
const route = [...islands, 'finale'] as const
export type Island = typeof islands[number]
export type Destination = Island | 'finale'
export type Scene = Destination | 'intro' | 'mappa'
export interface Progress { flight: 'first' | 'over' | 'retry' | 'equipped'; entered: boolean; visits: Island[]; revealed: boolean }

export function isIsland(value: string): value is Island {
  return islands.some(id => id === value)
}
export function readProgress(raw: string | null): Progress {
  try {
    const value = JSON.parse(raw ?? '{}')
    return {
      flight: value.flight === 'equipped' && value.jetpackCollected === true ? 'equipped'
        : value.flight === 'retry' || value.flight === 'over' ? value.flight : 'first',
      entered: value.entered === true,
      visits: islands.filter(id => Array.isArray(value.visits) && value.visits.includes(id)),
      revealed: value.revealed === true,
    }
  } catch {
    return { flight: 'first', entered: false, visits: [], revealed: false }
  }
}
export function canVisit(id: Destination, progress: Progress) {
  return islands.slice(0, route.indexOf(id)).every(island => progress.visits.includes(island))
}
export function resolveScene(hash: string, progress: Progress): Scene {
  const id = hash.slice(1)
  if (progress.flight === 'over') return 'mappa'
  if (progress.flight !== 'equipped') return 'intro'
  if (!id) return progress.entered ? 'mappa' : 'intro'
  if (id === 'intro' || ((isIsland(id) || id === 'finale') && canVisit(id, progress))) return id
  return 'mappa'
}

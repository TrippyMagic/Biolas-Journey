export const islands = ['fotografie', 'giardino', 'giochi'] as const
export type Island = typeof islands[number]
export type Destination = Island | 'finale'
export type Scene = Destination | 'intro' | 'mappa'
export interface Progress { entered: boolean; visits: Island[]; revealed: boolean }

export function isIsland(value: string): value is Island {
  return islands.some(id => id === value)
}
export function readProgress(raw: string | null): Progress {
  try {
    const value = JSON.parse(raw ?? '{}')
    return {
      entered: value.entered === true,
      visits: islands.filter(id => Array.isArray(value.visits) && value.visits.includes(id)),
      revealed: value.revealed === true,
    }
  } catch {
    return { entered: false, visits: [], revealed: false }
  }
}
export function unlocked(progress: Progress) {
  return islands.every(id => progress.visits.includes(id))
}
export function resolveScene(hash: string, progress: Progress): Scene {
  const id = hash.slice(1)
  if (!id) return progress.entered ? 'mappa' : 'intro'
  if (isIsland(id) || id === 'intro' || (id === 'finale' && unlocked(progress))) return id
  return 'mappa'
}

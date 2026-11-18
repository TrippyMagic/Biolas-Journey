import data from './data/contenuti.json'
import type { Destination } from './journey'

export interface Photo { id: string; src: string; alt: string; thumbnail?: string }
interface Content extends Omit<typeof data, 'photos' | 'names' | 'messages' | 'signs'> {
  photos: Photo[]
  messages: { id: string; text: string }[]
  signs: { label: string; url?: string }[]
  names: Record<Destination, string>
}
export const content: Content = data

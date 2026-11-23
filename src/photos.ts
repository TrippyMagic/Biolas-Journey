import { content } from './content'

const sources = new Set([
  ...content.photoGroups.flatMap(group => group.photos.flatMap(photo => [photo.src, photo.thumbnail])),
  content.finale.photo.src,
])
const photos = new Map<string, HTMLImageElement>()

export const photosReady = Promise.all([...sources].filter((src): src is string => Boolean(src)).map(async src => {
  const image = new Image()
  image.src = import.meta.env.BASE_URL + src
  try {
    await image.decode()
    photos.set(src, image)
  } catch {
    // The scene keeps its fallback when a photo is unavailable.
  }
}))

export function preparedPhoto(src: string, alt: string) {
  const source = photos.get(src)
  if (!source) return
  const image = source.cloneNode() as HTMLImageElement
  image.alt = alt
  return { image, ratio: source.naturalWidth / source.naturalHeight }
}

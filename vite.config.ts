import { cpSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { defineConfig } from 'vite'
import data from './src/data/contenuti.json' with { type: 'json' }

const media = [
  ...data.photoGroups.flatMap(group => group.photos.flatMap(photo =>
    [photo.src, 'thumbnail' in photo && typeof photo.thumbnail === 'string' ? photo.thumbnail : ''])),
  data.finale.photo.src,
  ...data.tracks.map(track => track.src),
  ...Object.values(data.characters).flatMap(character => Object.values(character).map(pose => pose.src)),
]

export default defineConfig({
  base: '/Biolas-Journey/',
  build: { copyPublicDir: false },
  plugins: [{
    name: 'publish-configured-media',
    apply: 'build',
    writeBundle({ dir }) {
      for (const file of new Set(media.filter(Boolean))) {
        const destination = join(dir!, file)
        mkdirSync(dirname(destination), { recursive: true })
        cpSync(join('public', file), destination)
      }
    },
  }],
})

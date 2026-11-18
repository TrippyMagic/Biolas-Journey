import type { Destination } from './journey'

export const content = {
  title: 'Our Little Universe',
  intro: '[Frase introduttiva per Viola]',
  enter: 'Tocca la stella',
  reset: 'Ricomincia il viaggio',
  confirmReset: 'Ricominciare il viaggio e cancellare le visite salvate?',
  back: '← Mappa',
  revealed: 'Una nuova isola è apparsa: il belvedere.',
  names: {
    fotografie: 'Fotografie', giardino: 'Giardino delle lucciole',
    giochi: 'Stanza dei giochi', finale: 'Belvedere',
  } satisfies Record<Destination, string>,
}

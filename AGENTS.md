# Biolas-Journey

Esperienza web da regalare a Viola il 24 novembre 2026. La mappa collega tre piccole isole illustrate e un pianeta dal quale si vede la Terra in basso. Progettare prima per telefono e mantenere il viaggio continuo anche su desktop.

## Invarianti

- Registrare la prima visita quando una delle tre scene diventa attiva. Il finale appare sulla mappa solo dopo l'apertura di fotografie, giardino e giochi, in qualunque ordine. Foto viste, messaggi letti e partita Sudoku sono indipendenti dallo sblocco.
- Ogni scena esplorabile offre il ritorno immediato alla mappa. Conservare visite e partita localmente. Il finale resta accessibile fino al riavvio esplicito del viaggio.
- Tenere testi e riferimenti ai media in una configurazione tipizzata. Usare placeholder espliciti finché l'autore consegna i contenuti. Le foto dell'album sono prive di didascalia. Pubblicare solo materiali scelti per un sito statico pubblico.
- Preservare e verificare EXIF, IPTC e XMP nelle conversioni delle fotografie. Tenere gli originali fuori dalla cartella pubblicata.

## Sviluppo

Usare Vite, TypeScript, CSS modulare, HTML/SVG e Motion per le sequenze coordinate. Preferire funzioni e composizione, responsabilità circoscritte e commenti limitati alle decisioni poco evidenti. Il coordinatore possiede navigazione e transizioni. Ciascuna scena possiede le sue interazioni locali. Backend, framework UI, game engine e pipeline CI/CD sono fuori ambito.

Seguire [il piano tecnico](docs/PLAN.md) per logica, verifiche mirate e pubblicazione manuale sotto `/Biolas-Journey/`. Seguire [la specifica visiva](docs/VISUAL_DESIGN.md) per composizione, asset e movimento. Dopo ogni modifica aggiornare qui e nei due documenti lo stato effettivo.

Sono implementati intro, mappa, album, giardino, stanza con Sudoku e finale spaziale. Per i contenuti modificare `src/data/contenuti.json` e copiare le foto in `public/media/photos/`. La sezione `finale` dello stesso JSON configura una foto e i paragrafi della dedica. Usare Node 24, `npm ci`, `npm run dev`, `npm test` e `npm run build`. Pubblicazione manuale con `npm run deploy` su `gh-pages`.

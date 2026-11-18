# Biolas-Journey

Esperienza web da regalare a Viola il 24 novembre 2026. La mappa collega tre piccole isole illustrate e un pianeta dal quale si vede la Terra in basso. Progettare prima per telefono e mantenere il viaggio continuo anche su desktop.

## Invarianti

- Registrare la prima visita quando una delle tre scene diventa attiva. Il finale appare sulla mappa solo dopo l'apertura di fotografie, giardino e giochi, in qualunque ordine. Foto viste, messaggi letti e partita Sudoku sono indipendenti dallo sblocco.
- Ogni scena esplorabile offre il ritorno immediato alla mappa. Conservare visite e partita localmente. Il finale resta accessibile fino al riavvio esplicito del viaggio.
- Tenere testi e riferimenti ai media in una configurazione tipizzata. Usare placeholder espliciti finché l'autore consegna i contenuti. Raggruppare 3–4 foto sotto una didascalia comune. Ogni stampa ha il proprio testo alternativo. Pubblicare solo materiali scelti per un sito statico pubblico.
- Preservare e verificare EXIF, IPTC e XMP nelle conversioni delle fotografie. Tenere gli originali fuori dalla cartella pubblicata.

## Sviluppo

Usare Vite, TypeScript, CSS modulare, HTML/SVG e Motion per le sequenze coordinate. Preferire funzioni e composizione, responsabilità circoscritte e commenti limitati alle decisioni poco evidenti. Il coordinatore possiede navigazione e transizioni. Ciascuna scena possiede le sue interazioni locali. Backend, framework UI, game engine e pipeline CI/CD sono fuori ambito.

Seguire [il piano tecnico](docs/PLAN.md) per logica, verifiche mirate e pubblicazione manuale sotto `/Biolas-Journey/`. Seguire [la specifica visiva](docs/VISUAL_DESIGN.md) per composizione, asset e movimento. Dopo ogni modifica aggiornare qui e nei due documenti lo stato effettivo.

Viola appare nell’intro, salta fra le isole prima dell’apertura e raggiunge il compagno sul pianeta finale. La mappa ha quattro correnti di nuvole. L’album scorre per gruppi, il giardino notturno ha vento e foschia e la Stanza delle varie cosine contiene il giradischi e il Sudoku su carta. Per i contenuti modificare `src/data/contenuti.json` e copiare le foto in `public/media/photos/`. `photoGroups` ordina gruppi e didascalie. Per il giradischi configurare `tracks` e copiare l’audio in `public/media/audio/`. Le sprite di LibreSprite vanno in `public/media/characters/`, con pose e fotogrammi in `characters`. La sezione `finale` dello stesso JSON configura una foto e i paragrafi della dedica. Usare Node 24, `npm ci`, `npm run dev`, `npm test` e `npm run build`. Pubblicazione manuale con `npm run deploy` su `gh-pages`.

Il primo tocco sull’intro fa cadere Viola dall’aeroplano fino al game over. Ricomincia rivela il jetpack sulla nuvola. Dopo averlo indossato, Viola entra dall’alto e resta sospesa al centro della mappa fino alla scelta.

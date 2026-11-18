# Biolas-Journey

Esperienza web da regalare a Viola il 24 novembre 2026. La mappa collega tre piccole isole illustrate e un pianeta dal quale si vede la Terra in basso. Progettare prima per telefono e mantenere il viaggio continuo anche su desktop.

## Invarianti

- Registrare la prima visita quando una delle tre scene diventa attiva. Il finale appare sulla mappa solo dopo l'apertura di fotografie, giardino e giochi, in qualunque ordine. Foto viste, messaggi letti e partita Sudoku sono indipendenti dallo sblocco.
- Ogni scena esplorabile offre il ritorno immediato alla mappa. Conservare visite e partita localmente. Il finale resta accessibile fino al riavvio esplicito del viaggio.
- Tenere testi e riferimenti ai media in una configurazione tipizzata. Usare placeholder espliciti finché l'autore consegna i contenuti. Raggruppare le foto di ciascuna sottocartella sotto una didascalia comune. Ogni stampa ha il proprio testo alternativo. Pubblicare solo materiali scelti per un sito statico pubblico.
- Preservare e verificare EXIF, IPTC e XMP nelle conversioni delle fotografie. Tenere gli originali fuori dalla cartella pubblicata.

## Sviluppo

Usare Vite, TypeScript, CSS modulare, HTML/SVG e Motion per le sequenze coordinate. Preferire funzioni e composizione, responsabilità circoscritte e commenti limitati alle decisioni poco evidenti. Il coordinatore possiede navigazione e transizioni. Ciascuna scena possiede le sue interazioni locali. Backend, framework UI, game engine e ulteriori pipeline CI/CD sono fuori ambito.

Seguire [il piano tecnico](docs/PLAN.md) per logica, verifiche mirate e pubblicazione da `main` sotto `/Biolas-Journey/`. Seguire [la specifica visiva](docs/VISUAL_DESIGN.md) per composizione, asset e movimento. Dopo ogni modifica aggiornare qui e nei due documenti lo stato effettivo.

Viola appare nell’intro, salta fra le isole prima dell’apertura e raggiunge il compagno sul pianeta finale. La mappa ha quattro correnti di nuvole. L’album scorre per gruppi, il giardino notturno ha vento e foschia e la Stanza delle varie cosine contiene il giradischi e il Sudoku su carta. Per i contenuti modificare `src/data/contenuti.json` e copiare le foto in `public/media/photos/`. `photoGroups` ordina gruppi e didascalie. Per il giradischi configurare `tracks` e copiare l’audio in `public/media/audio/`. Le sprite di LibreSprite vanno in `public/media/characters/`, con pose e fotogrammi in `characters`. La sezione `finale` dello stesso JSON configura una foto e i paragrafi della dedica. Usare Node 24, `npm ci`, `npm run dev`, `npm test` e `npm run build`. Ogni push su `main` pubblica `dist` tramite GitHub Actions.

Il primo tocco sull’intro fa cadere Viola dall’aeroplano fino al game over. Ricomincia rivela il jetpack dietro Viola sull’aeroplano. Dopo averlo indossato, Viola entra dall’alto e resta sospesa al centro della mappa fino alla scelta.

Le cinque sezioni dell’album seguono le sottocartelle di `public/media/photos/Biolas`. Le didascalie si modificano in `photoGroups`. La build copia i media configurati. Il finale mostra la sola dedica finché il campo della foto è vuoto.

Il primo disco del giradischi è «I miei sogni d’anarchia». Gli altri due posti sono disponibili.

Solo il tocco sullo zaino dopo il game over registra la raccolta. Prima della raccolta la schiena di Viola è libera.

Le polaroid adottano le proporzioni della fotografia orientata. Viola compare in basso a sinistra nell’album, in basso a destra in giardino e al fianco del tavolo nella stanza. Il computer grigio apre Vinted in una finestra pixel art. Minimizza conserva la pagina per la riapertura dal computer, Chiudi la scarica. Il disco continua a suonare fra le scene. I comandi usano Pixelify Sans e il game over ha un gradiente pastello con teschi saltellanti.

# Biolas-Journey · Piano di sviluppo

Il percorso parte da una stella, attraversa una mappa esplorabile e si conclude sul pianeta finale. L'ordine delle tre visite è libero. La prima versione dovrà essere percorribile da cima a fondo con contenuti provvisori. La [regia delle scene](VISUAL_DESIGN.md) definisce inquadrature e raccordi da conservare anche con asset provvisori.

## Struttura e navigazione

**Stato al 18 novembre.** Sono attivi album, messaggi e Sudoku con salvataggio. Il finale mostra la Terra dal suolo di un altro pianeta, una foto singola e una dedica scorrevole. Avvio locale con Node 24, `npm ci` e `npm run dev`. Per provare il sito compilato usare `npm run build` e `npm run preview` al percorso `/Biolas-Journey/`.

Una pagina Vite con TypeScript mantiene cielo, contenitore di scena e controlli di navigazione. Sei moduli indipendenti ricevono dal coordinatore il contenitore, i contenuti e le azioni di navigazione. Ciascun modulo monta il proprio HTML e restituisce una funzione di pulizia per eventi e animazioni. Separare CSS condiviso e stili delle scene. Motion serve alle sequenze coordinate tra piani, CSS alle reazioni locali.

| Ingresso o azione | Comportamento |
|---|---|
| Apertura senza frammento | Intro al primo accesso. La stella registra l'ingresso e apre la mappa. Agli accessi successivi si parte dalla mappa. |
| Frammento di scena | Accettare `#intro`, `#mappa`, `#fotografie`, `#giardino`, `#giochi` e `#finale`. Un'isola raggiunta direttamente conta come visita quando diventa attiva. Un frammento sconosciuto o un finale ancora bloccato viene sostituito con la mappa. |
| Isola selezionata | Preparare il fondale, raccordare la camera all'oggetto scelto, attivare la destinazione e registrare la visita una sola volta. Smontare il piano uscente. |
| Indietro | Dal dettaglio chiudere foto, foglietto o quaderno e restituire il focus all'oggetto. Dall'isola tornare alla mappa. Preparare una voce mappa anche all'ingresso diretto in un'isola. |
| Comando Mappa | Da qualunque dettaglio o isola tornare direttamente alla mappa, con focus sulla destinazione appena lasciata. Evitare voci di cronologia duplicate. |

Il coordinatore arbitra cronologia e transizione. Ignora un secondo tocco sulla stessa destinazione. Se interviene Indietro, interrompe la sequenza pendente e allinea scena e focus alla voce di cronologia raggiunta. Solo la scena attiva riceve input. Nei dettagli modali includere il ritorno alla mappa fra i comandi raggiungibili. Gestire chiusura anche con Escape.

## Stato del viaggio

Usare chiavi versionate con prefisso `biolas-journey` in localStorage. Conservare ingresso nel mondo, insieme degli ID delle isole visitate, rivelazione già presentata e partita Sudoku. Tenere foto corrente e tratto di filo in memoria per la sessione. Controllare i dati in lettura e usare valori iniziali per quelli illeggibili. Se lo storage è indisponibile, continuare in memoria.

Derivare l'accesso al pianeta finale dalla presenza di tutti e tre gli ID. Al primo ritorno utile sulla mappa presentare la rivelazione e ricordare che è stata mostrata. La disponibilità del finale sopravvive anche a un'interruzione dell'animazione. Il comando discreto «Ricomincia il viaggio» sulla mappa richiede conferma, azzera solo i dati del progetto, compresa la partita, e riapre l'intro.

## Contratto dei contenuti

Modificare `src/data/contenuti.json`, importato da `src/content.ts`. Le liste ordinate controllano stampe, messaggi e cartelli. La consegna contiene nove illustrazioni segnaposto, sette messaggi e un cartello inattivo. Usare ID univoci e stabili. I dettagli hanno una voce nella cronologia e si chiudono con Indietro, Escape o Chiudi. Mappa salta direttamente dal dettaglio alla mappa.

| Campo | Dati modificabili |
|---|---|
| `title`, `intro` | Saluto e frase iniziale forniti dall’autore. |
| `photos` | ID stabile, percorso relativo del WebP/AVIF, testo alternativo e miniatura facoltativa. Prevedere 8–12 foto di proporzioni miste. |
| `messages` | Da 5 a 10 voci con ID stabile e testo. |
| `signs` | ID, etichetta, URL facoltativo. Creare un link solo per URL web validi HTTP(S), con nuova scheda, `noopener` e nome accessibile che annuncia l'apertura. |
| `ui`, `names` e testi di navigazione | Etichette di album, giardino e Sudoku, nomi delle isole e conferma di riavvio. |
| `finale` | `photo.src` relativo alla base e `photo.alt`; `photoPlaceholder` per un percorso vuoto o illeggibile; `dedication` con una stringa per paragrafo; `landscapeAlt` descrive il panorama. |

Per aggiungere uno scatto copiare l'immagine in `public/media/photos/` e aggiungere la voce con percorso relativo, per esempio `media/photos/01.webp`. Risolvere questi percorsi sulla base di Vite. Usare la stessa convenzione per la foto finale. Durante la preparazione usare sagome neutre per i media assenti. Lo sblocco fa parte del racconto. I contenuti distribuiti sono pubblicamente raggiungibili.

Caricare all'inizio cielo e sagome della mappa. Preparare il fondale della destinazione selezionata durante il raccordo. Nell'album dare priorità al tratto visibile, poi alla foto adiacente in ingrandimento. Se manca un'immagine mantenerne lo spazio e lasciare disponibili navigazione e ritorno.

## Sudoku

Tre schemi facili 9×9 predefiniti, ciascuno con ID, indizi e soluzione unica verificata. Proteggere gli indizi. Selezione tramite tocco o tastiera, inserimento tramite tastierino o cifre fisiche, cancellazione della cella modificabile. Evidenziare cella, riga e colonna. Confrontare la cifra con la soluzione, mantenendo correggibile una cifra errata. Accompagnare l'errore con un segno e un riscontro accessibile. Confermare il completamento quando tutte le celle corrispondono.

Salvare ID e valori dopo ogni modifica e riprenderli alla riapertura. «Ricomincia partita» ripristina gli indizi dello schema attuale. «Altro schema» passa ciclicamente al successivo. Chiedere conferma prima di sostituire una partita in corso.

## Roadmap e verifiche

| Novembre 2026 | Consegna futura | Criterio di completamento |
|---|---|---|
| 18–19 | Struttura, token, intro e mappa | Da telefono il primo tocco apre tre destinazioni distinguibili dalla sagoma. |
| 19–20 | Coordinatore, transizioni e stato | Andata, ritorno, ricarica, doppio tocco e Indietro mantengono coerenti scena e visite. |
| 20–21 | Fotografie e giardino | Percorrere album da 8 e 12 scatti e aprire tutti i messaggi con 5 e 10 luci. |
| 21–22 | Stanza, quaderno e cartelli | Lasciare e riprendere una partita fino al completamento. Aggiungere un cartello dalla sola configurazione. |
| 22–23 | Rivelazione, finale e contenuti disponibili | Aprire e riaprire il finale dopo tre visite anche lasciando intatti album, messaggi e Sudoku. |
| 23 | Rifinitura, build e pubblicazione manuale | Percorso completo su telefono e desktop, verifica del sito pubblicato e ricarica diretta di una scena. Tenere il 24 come margine. |

Limitare i test automatici a tre gruppi. Verificare lo sblocco in ordini diversi, dopo duplicati e ricarica. Per la navigazione coprire accesso diretto, finale protetto, ritorno dal dettaglio e input rapidi. Per il Sudoku verificare coerenza degli indizi, una sola soluzione per ogni schema, immutabilità delle celle fisse e condizione di completamento. Eseguire inoltre il controllo TypeScript e la build Vite. Verificare manualmente a 320 px, su telefono con barre del browser visibili, su desktop, da tastiera e con movimento ridotto.

La base Vite è `/Biolas-Journey/`. Eseguire `npm run deploy` per compilare e pubblicare `dist` sul ramo `gh-pages`. In Settings → Pages scegliere Deploy from a branch, `gh-pages`, `/(root)`. Per ogni aggiornamento dei sorgenti ripetere il comando di deploy dopo le verifiche locali.

Il saluto e il testo introduttivo sono definitivi per questa fase. Restano da scegliere gli scatti, i messaggi, le destinazioni dei cartelli e i contenuti del finale.

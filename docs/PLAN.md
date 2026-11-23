# Biolas-Journey · Piano di sviluppo

Il percorso parte da una stella, attraversa una mappa esplorabile e si conclude sul pianeta finale. L’ordine delle visite è Stanza delle cosine, Giardino, Fotografie e pianeta finale. La prima versione dovrà essere percorribile da cima a fondo con contenuti provvisori. La [regia delle scene](VISUAL_DESIGN.md) definisce inquadrature e raccordi da conservare anche con asset provvisori.

## Struttura e navigazione

**Stato al 18 novembre.** Sono attivi l’album a gruppi, il giardino notturno, il giradischi e il Sudoku con salvataggio. La viaggiatrice accompagna il percorso dall’intro all’incontro sul pianeta. Il finale mostra la Terra dal suolo di un altro pianeta, una foto singola e una dedica scorrevole. Avvio locale con Node 24, `npm ci` e `npm run dev`. Per provare il sito compilato usare `npm run build` e `npm run preview` al percorso `/Biolas-Journey/`.

Una pagina Vite con TypeScript mantiene cielo, contenitore di scena e controlli di navigazione. Sei moduli indipendenti ricevono dal coordinatore il contenitore, i contenuti e le azioni di navigazione. Ciascun modulo monta il proprio HTML e restituisce una funzione di pulizia per eventi e animazioni. Separare CSS condiviso e stili delle scene. Motion serve alle sequenze coordinate tra piani, CSS alle reazioni locali.

| Ingresso o azione | Comportamento |
|---|---|
| Apertura senza frammento | Intro al primo accesso. La stella registra l'ingresso e apre la mappa. Agli accessi successivi si parte dalla mappa. |
| Frammento di scena | Accettare `#intro`, `#mappa`, `#fotografie`, `#giardino`, `#giochi` e `#finale`. Prima del volo con il jetpack, i collegamenti di scena riportano all’intro. Dopo il volo, una destinazione già accessibile può essere aperta anche direttamente e conta come visita quando diventa attiva. I frammenti sconosciuti o bloccati riportano alla mappa. |
| Isola selezionata | Sulla mappa completare il salto della viaggiatrice dalla posizione attuale alla meta. Preparare il fondale, raccordare la camera all'oggetto scelto, attivare la destinazione e registrare la visita una sola volta. Smontare il piano uscente. |
| Indietro | Dal dettaglio chiudere foto, foglietto, giradischi, quaderno o computer e restituire il focus all'oggetto. Dall'isola tornare alla mappa. Preparare una voce mappa anche all'ingresso diretto in un'isola. |
| Comando Mappa | Dalla vista principale di ogni isola o del finale tornare alla mappa, con focus sulla destinazione appena lasciata. Evitare voci di cronologia duplicate. |

Il coordinatore arbitra cronologia e transizione. Ignora un secondo tocco sulla stessa destinazione. Se interviene Indietro, interrompe la sequenza pendente e allinea scena e focus alla voce di cronologia raggiunta. Solo la scena attiva riceve input. I dettagli modali si chiudono anche con Escape. Il comando Mappa si usa dalla vista principale della scena.

## Stato del viaggio

Usare chiavi versionate con prefisso `biolas-journey` in localStorage. Conservare ingresso nel mondo, insieme degli ID delle isole visitate, rivelazione già presentata e partita Sudoku. Tenere foto corrente e tratto di filo in memoria per la sessione. Controllare i dati in lettura e usare valori iniziali per quelli illeggibili. Se lo storage è indisponibile, continuare in memoria.

Richiedere tutte le visite precedenti nell’ordine del percorso per accedere a una destinazione. Le visite dei salvataggi esistenti continuano a contare. Il pianeta resta fuori dalla mappa fino alle tre visite. Al primo ritorno utile sulla mappa presentare la rivelazione e ricordare che è stata mostrata. La disponibilità del finale sopravvive anche a un'interruzione dell'animazione. Il comando discreto «Ricomincia il viaggio» sulla mappa richiede conferma, azzera solo i dati del progetto, compresa la partita, e riapre l'intro.

## Contratto dei contenuti

Modificare `src/data/contenuti.json`, importato da `src/content.ts`. Le liste ordinate controllano stampe, messaggi e cartelli. La consegna contiene 22 fotografie distribuite nelle cinque sottocartelle di Biolas, dieci messaggi, due personaggi provvisori, quattro tracce sul giradischi e nessun cartello configurato. Usare ID univoci e stabili. I dettagli hanno una voce nella cronologia e si chiudono con Indietro, Escape o Chiudi. Dalla stanza si torna alla mappa dopo aver chiuso o minimizzato il dettaglio dell’oggetto.

| Campo | Dati modificabili |
|---|---|
| `title`, `intro` | Saluto e frase iniziale forniti dall’autore. |
| `photoGroups` | Ogni gruppo ha `caption` e una lista `photos` delle immagini della sottocartella. Ogni foto ha `id` univoco nell’album, `src`, `alt` e `thumbnail` facoltativa. |
| `tracks` | Voci in ordine di riproduzione con `title` e `src` relativo alla base. Il giradischi ignora i percorsi vuoti e avanza alla traccia successiva quando termina quella in riproduzione. |
| `characters` | Fogli sprite per `traveler.idle`, `traveler.jump` e `host.idle`. |
| `messages` | Da 5 a 10 voci con ID stabile e testo. |
| `signs` | ID, etichetta, URL facoltativo. Creare un link solo per URL web validi HTTP(S), con nuova scheda, `noopener` e nome accessibile che annuncia l'apertura. |
| `ui`, `names` e testi di navigazione | Etichette di album, giardino e Sudoku, nomi delle isole e conferma di riavvio. |
| `finale` | `photo.src` relativo alla base e `photo.alt`; `photoPlaceholder` per un percorso vuoto o illeggibile; `dedication` con una stringa per paragrafo; `dedicationSignature` e `postScriptum` per la chiusura; `landscapeAlt` descrive il panorama. |

Per aggiungere uno scatto copiare l'immagine in `public/media/photos/` e aggiungere la voce al gruppo con percorso relativo, per esempio `media/photos/01.webp`. Risolvere questi percorsi sulla base di Vite. Usare la stessa convenzione per la foto finale. Durante la preparazione usare sagome neutre per i media assenti. Lo sblocco fa parte del racconto. I contenuti distribuiti sono pubblicamente raggiungibili.

Caricare all'inizio cielo e sagome della mappa. Preparare il fondale della destinazione selezionata durante il raccordo. All’avvio scaricare e decodificare tutte le foto configurate, incluse le miniature e la foto finale. Album e finale si aprono quando le immagini sono pronte. Se manca un'immagine mantenerne lo spazio e lasciare disponibili navigazione e ritorno.

## Giradischi e personaggi

Copiare i file audio destinati al regalo in `public/media/audio/`. Per esempio, una voce può avere `"title": "Il nostro disco"` e `"src": "media/audio/disco-1.mp3"`. Il primo gesto avvia il disco scelto. Pausa e ripresa conservano il punto di ascolto. Si può cambiare disco durante la riproduzione. Al termine passa al brano successivo e dall’ultimo torna al primo. La musica prosegue chiudendo il dettaglio e giocando a Sudoku. L’ascolto continua sulla mappa e nelle altre scene. Il riavvio del viaggio ferma la riproduzione.

In LibreSprite esportare ciascuna posa come PNG trasparente con i fotogrammi in **una riga orizzontale**, tutti della stessa misura, senza margini fra i riquadri. Tenere i piedi alla stessa altezza e orientare i personaggi verso destra. Copiare i PNG in `public/media/characters/`. Per ogni posa impostare `src`, `frameWidth`, `frameHeight`, `frames` e `fps`. Per esempio, quattro fotogrammi da 24×32 richiedono un PNG da 96×32, `frames: 4` e, per sei fotogrammi al secondo, `fps: 6`. Una posa singola usa `frames: 1`. Con il percorso di salto vuoto viene usata la posa ferma lungo tutta la traiettoria.

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
| 23 | Rifinitura, build e pubblicazione da `main` | Percorso completo su telefono e desktop, verifica del sito pubblicato e ricarica diretta di una scena. Tenere il 24 come margine. |

Limitare i test automatici a tre gruppi. Verificare l’ordine obbligatorio, i link verso destinazioni bloccate e la ripresa da salvataggi precedenti o con duplicati. Per la navigazione coprire accesso diretto, finale protetto, ritorno dal dettaglio e input rapidi. Per il Sudoku verificare coerenza degli indizi, una sola soluzione per ogni schema, immutabilità delle celle fisse e condizione di completamento. Eseguire inoltre il controllo TypeScript e la build Vite. Verificare manualmente a 320 px, su telefono con barre del browser visibili, su desktop, da tastiera e con movimento ridotto.

La base Vite è `/Biolas-Journey/`. Ogni push su `main` esegue il workflow Pages con Node 24 e pubblica la build `dist` come artefatto. In Settings → Pages la sorgente è GitHub Actions.

Il saluto e il testo introduttivo sono definitivi per questa fase. Restano da consegnare scatti e didascalie di gruppo, audio, sprite definitive, messaggi, destinazioni dei cartelli e contenuti del finale.

Il prologo salva in `flight` il primo tentativo, il game over, il nuovo tentativo o il jetpack equipaggiato. Ricomincia dal game over abilita la raccolta dietro Viola sull’aeroplano. Il riavvio completo del viaggio azzera anche il prologo. I vecchi salvataggi privi della conferma di raccolta ripartono dal primo volo quando si apre la mappa, conservando visite e partita.

### Sprite di coppia in LibreSprite

Per le pose singole usare 24×32 px e un punto di appoggio comune per i piedi. Per le interazioni preparare una tela trasparente da 64×40 px con entrambi i personaggi su livelli distinti. Tenere identica la linea del terreno. Preparare clip separate per incontro (4 fotogrammi di avvicinamento), abbraccio (4–6, braccia che si chiudono e posa tenuta), bacio (4–6, avvicinamento, contatto e pausa) e intimità giocosa (6–8, abbraccio sotto una coperta, cuoricini e ritorno alla quiete). Esportare una striscia PNG orizzontale per clip, senza spaziatura né ritaglio automatico. Le interazioni di coppia sono indicazioni per la produzione artistica. Il finale attuale usa due sprite indipendenti.

Lo zaino è un accessorio separato. Lo stato spento mostra solo il corpo del jetpack. La fiamma attuale usa quattro celle da 8×12 px in fila in `src/art/exhaust.svg`. Per ridisegnarla tenere fermo l’ugello e alternare scintilla, fiamma corta, piena e in contrazione.

Le 22 foto sono divise in cinque sezioni che seguono le sottocartelle di `public/media/photos/Biolas`. Le didascalie si modificano in `photoGroups`. I paletti laterali arrivano al fondo della scena e sostengono i fili, che proseguono tra i gruppi. Uno swipe orizzontale nella scena o le frecce selezionano il gruppo adiacente. La build copia i media configurati. Il sito precarica tutte le fotografie all’avvio e mostra album e finale dopo la decodifica. La cornice del finale segue le proporzioni della foto e si adatta alla larghezza e all’altezza disponibili. Le foto aperte hanno frecce senza testo visibile. Si torna alla mappa dopo aver chiuso la foto. La lettera in corsivo mostra la data del 24 Novembre 2026 in alto a destra, con firma e post scriptum separati dal corpo. Se il campo della foto è vuoto, mostra la sola dedica. Le fotografie pubblicate oltre 2 MB sono state ricompresse mantenendo risoluzione e metadati.

Il giradischi mostra i soli titoli. Da «I miei sogni d’anarchia» passa a «Flower In A Hurricane», «Time Is Running Out», «Alors on danse» e «MY LOVE SONG», poi torna al primo brano.

Solo il tocco sullo zaino dopo il game over registra la raccolta. Prima della raccolta la schiena di Viola è libera.

Le polaroid adottano le proporzioni della fotografia orientata. In giardino Viola è frontale, con lievi riflessi nei ricci e pieghe sul maglione. Nella stanza sta di profilo senza zaino a sinistra del giradischi. Viola supera il piano del tavolo nella stanza e occupa circa un terzo della scena anche in giardino. Nell’intro sta di fronte sull’ala superiore. Nell’album vola in alto a sinistra con il jetpack acceso. In volo il profilo resta fermo e la fiamma del jetpack pulsa. Viola è leggermente più grande sull’ala e sulla mappa. Sul pianeta Nicco aspetta Viola di profilo. Dopo l’avvicinamento, abbraccio e bacio si alternano. Nicco ha le tempie leggermente arretrate, rivolge il viso a Viola durante l’abbraccio e nel bacio la basetta unisce barba e capelli. Ogni otto secondi un cuore sale dalla coppia oltre il bordo superiore dello schermo. Con movimento ridotto resta l’abbraccio. Il quaderno contiene sei Sudoku. La Clessidra autistica conta anni, mesi, giorni, ore, minuti e secondi dalla mezzanotte del 29 ottobre 2022 a Roma. Nella stanza, pareti, battiscopa e pavimento continuano fino ai bordi dello schermo. Gli arredi rimangono centrati. Il computer grigio apre Vinted in una finestra pixel art. Minimizza conserva la pagina per la riapertura dal computer, Chiudi la scarica. Il disco continua a suonare fra le scene. I comandi usano Pixelify Sans e il game over ha un gradiente pastello con teschi saltellanti. I messaggi delle lucciole usano il corsivo Spectral della dedica su carta con bordi a gradini e una X in alto a destra. Mappa resta nella vista del giardino. Le cifre della griglia e del tastierino del Sudoku usano DM Sans. Ogni voce in `messages` genera una lucciola, fino a dieci.

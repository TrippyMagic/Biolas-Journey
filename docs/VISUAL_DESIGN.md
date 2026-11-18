# Biolas-Journey · Specifica visiva

La mappa è il soggetto principale. Ogni isola anticipa un oggetto che Viola ritroverà ingrandito nella scena. Il filo, il salice, la finestra e la Terra bassa sul suolo craterizzato guidano l'occhio durante il viaggio. Il cielo lega le sei inquadrature, dal crepuscolo dell'intro al tramonto delle fotografie, alla luce della lampada, fino al cielo profondo del pianeta finale.

## Materiali e token condivisi

**Stato realizzato.** Tre sagome di nuvola con profili distinti attraversano il cielo sopra i rilievi. La mappa lascia il cielo libero dal titolo. Album con stampe oscillanti, radura con salice e lucciole, stanza illustrata con quaderno e vista Sudoku sono navigabili. La quarta destinazione apre il panorama spaziale con fotografia e dedica.

| Token CSS previsto | Valore | Impiego |
|---|---|---|
| `--night` | `#25243F` | Testo su carta, ombra profonda e zenit notturno |
| `--lavender` | `#7779A7` | Lontananze e orizzonte notturno |
| `--sky` | `#BCC7EF` | Fascia di foschia |
| `--rose` | `#EAC3DA` | Riflessi del tramonto |
| `--peach` | `#F5D6BE` | Orizzonte della mappa e luce della stanza |
| `--cream` | `#FFF2E6` | Carta, stelle e testo sul cielo scuro |
| `--sage` | `#84988D` | Fogliame |
| `--gold` | `#F6DFA0` | Lucciole e lampada |

Il gradiente verticale della mappa passa da lavanda ad azzurro al 60% e finisce in pesca. Il cielo notturno passa da blu notte a lavanda. Usare carta crema quasi opaca per il testo su sfondo variabile. Mantenere almeno 4,5:1 di contrasto per i testi normali.

- **Caratteri.** Spectral Medium locale per frase iniziale e dedica, Georgia di riserva. DM Sans locale per messaggi, navigazione e cifre, con sans-serif di sistema. Titoli 28–44 px, lettura 17–20 px con interlinea 1,5, comandi 15–16 px. Lunghezza massima della riga della lettera circa 54 caratteri.
- **Spazio.** Scala di 4, 8, 12, 16, 24, 32 e 48 px. Margine telefono 16 px oltre le safe area. Stampe con raggio di 3 px e ombra `0 3px 8px #25243F26`. Carta e comandi con raggio di 10 px e bordo sottile.
- **Disegno.** Pixel art frontale con scorcio del piano superiore, luce dall'alto a sinistra, contorno in tinta locale e tre valori per materiale. Disegnare le isole su circa 96×64 pixel e renderle a bordi netti. Usare HTML nitido per testi, controlli e fotografie, SVG per i fili, CSS per gradienti e aloni.
- **Viewport.** Impostare la composizione a 360×740, verificare a 320 px e ridisporre i piani da 768 px. Altezza minima in `svh`, safe area anche in basso. Nei viewport bassi ridurre la scenografia e consentire scroll verticale. Mantenere lo zoom del browser. Confinare le decorazioni ai bordi evitando overflow orizzontale.
- **Interazione.** Nelle isole e nel finale «Mappa» occupa lo stesso angolo superiore entro la safe area. Riservare spazio al comando anche nei dettagli. Prevedere focus visibile, nome accessibile, feedback alla pressione e utilizzo da tastiera. L'hover può anticipare il feedback disponibile al tocco.

## Regia delle sei scene

### 1 · Intro

Tre sagome di nuvola accompagnano il cielo stellato. Al centro appare «Ciao amore...» e subito sotto «So che non ti piacciano i giochini ma dovrai attraversare questa pixel art scadente». La stella crema è l’unico comando, con nome accessibile e area tattile di almeno 56 px. Su desktop il gruppo rimane al centro.

All'ingresso emerge il gradiente notturno. Alternare lentamente l'opacità di due cieli. Il primo tocco rischiara la stella e fa attraversare il primo piano a una nuvola. Dietro si distingue il profilo delle isole.

### 2 · Mappa

Organizzare la scena in tre piani. Stelle e foschia delineano il fondo, le isole occupano il piano nitido, pochi lembi di nuvola incorniciano il primo piano. I centri seguenti sono percentuali x/y dell'area illustrata utile, esclusi comandi e safe area.

| Isola | Telefono | Desktop | Sagoma principale |
|---|---|---|---|
| Fotografie | 29%, 29% | 21%, 44% | Due pali con tre stampe chiare |
| Giardino | 69%, 51% | 51%, 61% | Salice ricadente con tre luci basse |
| Giochi | 32%, 74% | 79%, 43% | Tetto spiovente, finestra ambrata e tavolino visibile |
| Un altro pianeta | 73%, 17% | 54%, 22% | Disco azzurro sopra una falce di roccia rosata |

Le tre isole iniziali disegnano una S sul telefono e misurano circa un terzo della larghezza ciascuna. Nome breve e sagoma appartengono allo stesso pulsante. Alla pressione l'isola sale di 2 px, quindi la camera converge sul suo oggetto. Al ritorno una stella piena segna la visita anche con il nome accessibile «visitata».

Prima delle tre visite, il settore del pianeta finale contiene solo cielo. Alla prima apertura utile della mappa, le tre stelle brillano in sequenza e una nuvola si apre sul pianeta. Durata complessiva circa 900 ms. Lasciare attivi i controlli. Nelle aperture successive il pianeta fa già parte del paesaggio.

### 3 · Fotografie

Avvicinare la camera al filo finché i due pali escono dai bordi. Sul cielo pesca e rosa stendere una corda SVG con una leggera curva. Appendere immagini HTML con bordo crema e mollette pixel art. Mostrare due stampe grandi per tratto su telefono, quattro su desktop. Le frecce ai lati fanno avanzare di un tratto, incluso l'ultimo parzialmente occupato.

Le stampe oscillano di circa un grado attorno alla molletta. Toccandone una, fermarla e portarla in primo piano su fondo notte. Usare l'intera foto in proporzione naturale, anche panoramica o verticale. In ingrandimento le frecce percorrono tutto l'album. Alla chiusura mostrare il tratto contenente l'ultima foto selezionata e restituirle il focus. Alla partenza verso la mappa riprendere il filo. Per le prove alternare sagome di carta orizzontali, verticali e quadrate. Lasciare il bordo privo di didascalie.

### 4 · Giardino delle lucciole

Entrare seguendo la chioma del salice da sinistra. L'erba occupa il quarto inferiore. Il centro è una radura scura con luci fra il 20% e il 75% dell'altezza. Distribuire dieci ancoraggi fissi su file sfalsate, assegnando i primi cinque a zone distanti. Verificare che a 320 px i bersagli siano separati. Su desktop allargare la radura lasciando le luci vicine alle fronde e al prato.

Disegnare la lucciola dentro un pulsante HTML fermo di almeno 48×48 px. Muovere solo la luce in un'orbita di 3–5 px ogni 5–8 s. Al tocco intensificare l'alone, attenuare le altre luci e aprire il foglietto crema dal basso. Su desktop il foglio compare a destra del salice. Usare segnaposto progressivi come `[Messaggio 01]`. Alla chiusura restituire focus e luminosità. All'uscita la camera ritrova il profilo del salice.

### 5 · Stanza dei giochi

La finestra si allarga e rivela una lampada a sinistra che illumina il quaderno sul tavolino centrale. Lasciare una lieve variazione di luce sulla parete. Fissare i cartelli agli stipiti delle uscite dietro il tavolo. Su telefono collocarli sopra il piano, su desktop ai due lati. Per ulteriori cartelli usare assi successive e spazio verticale. Con elenco vuoto rimangono gli stipiti. Le assi configurate combinano grafica pixel art e link HTML con etichetta leggibile.

Il quaderno porta a una vista dall'alto. La griglia HTML occupa la larghezza utile, fino a 450 px, con confini dei riquadri 3×3 distinguibili. A 320 px riservare circa 32 px per cella e almeno 44 px per ogni tasto numerico. Due file ospitano cifre 1–9 e cancellazione. In orizzontale, se c'è spazio, spostarle a lato. Rendere riconoscibili indizi, selezione ed errori anche attraverso peso, contorno o segno. Tenere visibili il ritorno e i comandi di partita. Chiudendo il quaderno si ritrova il tavolo, tornando alla mappa si ritrova la finestra.

### 6 · Finale

Dal suolo roccioso di un altro pianeta si guarda verso la Terra, bassa sopra la linea dei crateri. Oceani azzurri, continenti salvia e nubi chiare distinguono il disco dal cielo notte. Una sola stella pulsa. Sul telefono la stampa occupa la parte superiore e il foglio crema la segue; da 768 px sono affiancati. Il paesaggio entra per primo e la carta emerge in dissolvenza. La zona di lettura scorre fino all’ultima riga mentre Mappa resta disponibile. In movimento ridotto la carta è subito visibile.

## Movimento e asset

| Gesto o sequenza | Durata e responsabilità |
|---|---|
| Pressione e focus | CSS, 120–160 ms. Il contorno di focus è immediatamente identificabile. |
| Apertura foto e foglietti | CSS, 200–260 ms, assestamento con `cubic-bezier(.22,.61,.36,1)`. |
| Camera verso un'isola e ritorno | Motion, 600–700 ms in avvicinamento, 450–550 ms al ritorno. Origine sull'oggetto, scala massima 1.08, scarto di parallasse fino a 8 px, curva `cubic-bezier(.45,0,.25,1)`. |
| Cielo, nuvole e stampe | Cicli CSS lenti di 18–30 s. Sovrapporre gradienti e animare opacità. |
| Rivelazione del pianeta finale | Sequenza Motion di circa 900 ms, descritta nella mappa. |

Preferire transform e opacity. Sospendere i cicli fuori scena e liberare le sequenze all'uscita. Con `prefers-reduced-motion` usare posizioni ferme e dissolvenze entro 120 ms. Annunciare la nuova destinazione anche alle tecnologie assistive. La scoperta, i controlli e l'accesso ai messaggi rimangono disponibili.

**Indispensabili.** Tre isole e pianeta finale; due nuvole e stella a quattro punte; pali e molletta; salice, erba e lucciola; stanza con lampada, tavolino, quaderno, stipite e cartello riutilizzabile. Ricavare le miniature delle destinazioni dagli stessi elementi degli interni. Fili, aloni, carta, gradienti e ombre si ottengono con SVG o CSS. Conservare la dimensione dei placeholder quando manca un'immagine.

**Opzionali.** Secondo piano di vegetazione, variante di nuvola e secondo fotogramma per la lampada. Realizzarli solo dopo aver verificato tutto il viaggio sul telefono.

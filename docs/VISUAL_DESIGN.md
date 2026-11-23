# Biolas-Journey · Specifica visiva

La mappa è il soggetto principale. Ogni isola anticipa un oggetto che Viola ritroverà ingrandito nella scena. Il filo, il salice, la finestra e la Terra bassa sul suolo craterizzato guidano l'occhio durante il viaggio. Il cielo lega le sei inquadrature, dal crepuscolo dell'intro al tramonto delle fotografie, alla finestra della stanza, fino al cielo profondo del pianeta finale.

## Materiali e token condivisi

**Stato realizzato.** La mappa dispone quattro fasce di nuvole dietro le isole. La viaggiatrice accompagna il percorso fino all’incontro finale. L’album appende le foto in gruppi, la radura ospita lucciole e salice al vento e la stanza raccoglie giradischi e quaderno sul tavolo.

| Token CSS previsto | Valore | Impiego |
|---|---|---|
| `--night` | `#25243F` | Testo su carta, ombra profonda e zenit notturno |
| `--lavender` | `#7779A7` | Lontananze e orizzonte notturno |
| `--sky` | `#BCC7EF` | Fascia di foschia |
| `--rose` | `#EAC3DA` | Riflessi del tramonto |
| `--peach` | `#F5D6BE` | Orizzonte della mappa e luce della stanza |
| `--cream` | `#FFF2E6` | Carta, stelle e testo sul cielo scuro |
| `--sage` | `#84988D` | Fogliame |
| `--gold` | `#F6DFA0` | Lucciole e dettagli caldi |

Il gradiente verticale della mappa passa da lavanda ad azzurro al 60% e finisce in pesca. Nel giardino il cielo va dal blu inchiostro all’ardesia. La luna e le stelle fredde emergono sopra le lucciole dorate. Usare carta crema quasi opaca per il testo su sfondo variabile. Mantenere almeno 4,5:1 di contrasto per i testi normali.

- **Caratteri.** Spectral Medium locale per la frase iniziale e Spectral Medium Italic per la dedica e i messaggi delle lucciole, con Georgia di riserva. Pixelify Sans per i comandi. DM Sans locale per le cifre del Sudoku, con sans-serif di sistema. Titoli 28–44 px, lettura 17–20 px con interlinea 1,5, comandi 15–16 px. Lunghezza massima della riga della lettera circa 54 caratteri.
- **Spazio.** Scala di 4, 8, 12, 16, 24, 32 e 48 px. Margine telefono 16 px oltre le safe area. Stampe con raggio di 3 px e ombra `0 3px 8px #25243F26`. Carta e comandi con raggio di 10 px e bordo sottile.
- **Disegno.** Pixel art frontale con scorcio del piano superiore, luce dall'alto a sinistra, contorno in tinta locale e tre valori per materiale. Disegnare le isole su circa 96×64 pixel e renderle a bordi netti. Usare HTML nitido per testi, controlli e fotografie, SVG per i fili, CSS per gradienti e aloni.
- **Viewport.** Impostare la composizione a 360×740, verificare a 320 px e ridisporre i piani da 768 px. Altezza minima in `svh`, safe area anche in basso. Nei viewport bassi ridurre la scenografia e consentire scroll verticale. Mantenere lo zoom del browser. Confinare le decorazioni ai bordi evitando overflow orizzontale.
- **Interazione.** Nelle isole e nel finale «Mappa» occupa lo stesso angolo superiore entro la safe area. Riservare spazio al comando anche nei dettagli. Prevedere focus visibile, nome accessibile, feedback alla pressione e utilizzo da tastiera. L'hover può anticipare il feedback disponibile al tocco.

## Regia delle sei scene

### 1 · Intro

Tre sagome di nuvola accompagnano il cielo stellato. Al centro la viaggiatrice si affaccia dall’aeroplano sopra «Ciao amore...» e subito sotto «So che non ti piacciano i giochini ma dovrai attraversare questa pixel art scadente». La stella crema è il comando da tastiera per il lancio. Al tocco è attiva tutta l’intro, eccetto lo zaino che si può equipaggiare al secondo tentativo. Su desktop il gruppo rimane al centro.

All'ingresso emerge il gradiente notturno. Alternare lentamente l'opacità di due cieli. Il primo tocco rischiara la stella e fa attraversare il primo piano a una nuvola. Dietro si distingue il profilo delle isole.

### 2 · Mappa

Organizzare la scena in tre piani. Stelle e foschia delineano il fondo, le isole occupano il piano nitido, quattro fasce di nuvole attraversano la mappa su correnti orizzontali. Le direzioni si alternano, ogni fascia combina sagome SVG diverse e le fasce più vicine scorrono più velocemente. I centri seguenti sono percentuali x/y dell'area illustrata utile, esclusi comandi e safe area.

| Isola | Telefono | Desktop | Sagoma principale |
|---|---|---|---|
| Fotografie | 29%, 29% | 21%, 44% | Due pali con tre stampe chiare |
| Giardino | 69%, 51% | 51%, 61% | Salice ricadente con tre luci basse |
| Giochi | 32%, 74% | 79%, 43% | Tetto spiovente, finestra ambrata e tavolino visibile |
| Un altro pianeta | 73%, 17% | 54%, 22% | Disco azzurro sopra una falce di roccia rosata |

Le tre isole iniziali disegnano una S sul telefono e misurano circa un terzo della larghezza ciascuna. Nome e sagoma appartengono allo stesso pulsante. All’arrivo è attiva solo la Stanza delle cosine. Il Giardino e le Fotografie restano in foschia con il nome attenuato e il pulsante disabilitato fino alla visita precedente, senza didascalie aggiuntive. Alla selezione Viola salta in arco dall’isola su cui si trova. Il primo volo parte dal centro della mappa. Dopo l’atterraggio la camera converge sulla meta. Al ritorno Viola resta su quell’isola. Con movimento ridotto il posizionamento è immediato. Al ritorno una stella piena segna la visita anche con il nome accessibile «visitata».

Prima delle tre visite, il settore del pianeta finale contiene solo cielo. Alla prima apertura utile della mappa, le tre stelle brillano in sequenza e una nuvola si apre sul pianeta. Durata complessiva circa 900 ms. Lasciare attivi i controlli. Nelle aperture successive il pianeta fa già parte del paesaggio.

### 3 · Fotografie

Sopra il filo compare la didascalia comune del gruppo. Su telefono le stampe di ciascuna sottocartella si distribuiscono su due fili, su desktop su un filo solo. I fili si allineano al passaggio tra i gruppi e si tendono tra due paletti di legno per tratto, dal filo fino al bordo inferiore della scena. Il reel occupa la scena, così lo swipe orizzontale funziona anche lontano dalle stampe. Le frecce percorrono gli stessi gruppi.

Le stampe già precaricate appaiono insieme, con le proporzioni definite prima dell’apertura. Ogni stampa ruota attorno alla propria molletta e si assesta. In ingrandimento le frecce percorrono l’intero album e hanno etichette per i lettori di schermo. Il comando Mappa ricompare dopo la chiusura della foto. Alla chiusura si ritrovano gruppo e focus dell’ultima foto. Con movimento ridotto le stampe sono subito ferme e leggibili.

### 4 · Giardino delle lucciole

Entrare seguendo la chioma del salice da sinistra. L'erba occupa il quarto inferiore. Il centro è una radura scura con luci fra il 20% e il 75% dell'altezza. Distribuire dieci ancoraggi fissi su file sfalsate, assegnando i primi cinque a zone distanti. Verificare che a 320 px i bersagli siano separati. Su desktop allargare la radura lasciando le luci vicine alle fronde e al prato.

Disegnare la lucciola dentro un pulsante HTML fermo di almeno 48×48 px. La luce gialla percorre orbite sfalsate fino a 15 px dal centro del bersaglio. Nel cielo blu profondo, una falce di luna a gradini e stelle bianche e azzurre restano distinte dagli insetti. Una foschia sottile attraversa il prato sopra i rilievi lontani. Le fronde oscillano dai rami e i ciuffi d’erba si piegano alla base. Al tocco intensificare l'alone, attenuare le altre luci e aprire il foglietto crema dal basso. Il bordo a gradini, la piega nell’angolo richiamano il disegno a pixel del giardino. Su desktop il foglio compare a destra del salice. Usare segnaposto progressivi come `[Messaggio 01]`. Alla chiusura restituire focus e luminosità. All'uscita la camera ritrova il profilo del salice.

### 5 · Stanza delle varie cosine

La finestra illumina un tavolo di legno. Il giradischi occupa il lato sinistro, il quaderno il centro e il computer grigio il lato destro. Il dettaglio del giradischi ingrandisce lo stesso oggetto. La scelta di una traccia posa il vinile sul piatto e il braccio entra mentre il disco gira. La pausa ferma il disco e ritira il braccio. Fissare i cartelli agli stipiti delle uscite dietro il tavolo. Su telefono collocarli sopra il piano, su desktop ai due lati. Per ulteriori cartelli usare assi successive e spazio verticale. Con elenco vuoto rimangono gli stipiti. Le assi configurate combinano grafica pixel art e link HTML con etichetta leggibile.

Il quaderno porta a una vista dall’alto del tavolo. La griglia è stampata su un foglio a righe con angolo ripiegato e bordo di carta in ombra sul legno. La griglia HTML occupa la larghezza utile, fino a 450 px, con confini dei riquadri 3×3 distinguibili. A 320 px riservare circa 32 px per cella e almeno 44 px per ogni tasto numerico. Due file ospitano cifre 1–9 e cancellazione. Le cifre tabulari in DM Sans distinguono gli indizi in grassetto dai valori inseriti. In orizzontale, se c'è spazio, spostarle a lato. Rendere riconoscibili indizi, selezione ed errori anche attraverso peso, contorno o segno. Tenere visibili il ritorno e i comandi di partita. Chiudendo il quaderno si ritrova il tavolo, tornando alla mappa si ritrova la finestra.

### 6 · Finale

Dal suolo roccioso di un altro pianeta si guarda verso la Terra, bassa sopra la linea dei crateri. Oceani azzurri, continenti salvia e nubi chiare distinguono il disco dal cielo notte. Una sola stella pulsa. Il compagno aspetta sul terreno, rivolto verso la viaggiatrice che atterra al suo fianco. Il panorama rimane visibile mentre scorre la dedica. Sul telefono la stampa occupa la parte superiore e il foglio crema la segue; da 768 px sono affiancati. La cornice abbraccia la foto alle sue proporzioni naturali. Il paesaggio entra per primo e la carta emerge in dissolvenza. La zona di lettura scorre fino all’ultima riga mentre Mappa resta disponibile. In movimento ridotto la carta è subito visibile.

## Movimento e asset

| Gesto o sequenza | Durata e responsabilità |
|---|---|
| Pressione e focus | CSS, 120–160 ms. Il contorno di focus è immediatamente identificabile. |
| Apertura foto e foglietti | CSS, 200–260 ms, assestamento con `cubic-bezier(.22,.61,.36,1)`. |
| Camera verso un'isola e ritorno | Motion, 600–700 ms in avvicinamento, 450–550 ms al ritorno. Origine sull'oggetto, scala massima 1.08, scarto di parallasse fino a 8 px, curva `cubic-bezier(.45,0,.25,1)`. |
| Cielo, nuvole e stampe | Cicli CSS lenti di 18–30 s. Sovrapporre gradienti e animare opacità. |
| Rivelazione del pianeta finale | Sequenza Motion di circa 900 ms, descritta nella mappa. |

Preferire transform e opacity. Sospendere i cicli fuori scena e liberare le sequenze all'uscita. Con `prefers-reduced-motion` usare posizioni ferme e dissolvenze entro 120 ms. Annunciare la nuova destinazione anche alle tecnologie assistive. La scoperta, i controlli e l'accesso ai messaggi rimangono disponibili.

**Indispensabili.** Tre isole e pianeta finale; due nuvole e stella a quattro punte; pali e molletta; salice, erba e lucciola; stanza con giradischi, tavolino, quaderno, stipite e cartello riutilizzabile. Ricavare le miniature delle destinazioni dagli stessi elementi degli interni. Fili, aloni, carta, gradienti e ombre si ottengono con SVG o CSS. Conservare la dimensione dei placeholder quando manca un'immagine.

**Opzionali.** Le sprite definitive di LibreSprite possono estendere le pose ferme con cicli a fotogrammi e una posa di salto dedicata.

L’aeroplanino ospita Viola sopra il saluto. Il tocco in qualsiasi punto avvia la caduta. La mappa prolunga il movimento fino al game over. Dopo Ricomincia appare il jetpack dietro Viola sull’aeroplano. Lo zaino resta sulla schiena anche quando il motore è spento. In volo la fiamma alterna quattro fotogrammi. Il primo ingresso equipaggiato termina in sospensione fra le isole.

Le 22 foto sono divise in cinque sezioni che seguono le sottocartelle di `public/media/photos/Biolas`. Le didascalie si modificano in `photoGroups`. I paletti laterali arrivano al fondo della scena e sostengono i fili, che proseguono tra i gruppi. Uno swipe orizzontale nella scena o le frecce selezionano il gruppo adiacente. La build copia i media configurati. Il sito precarica tutte le fotografie all’avvio e mostra album e finale dopo la decodifica. La cornice del finale segue le proporzioni della foto e si adatta alla larghezza e all’altezza disponibili. Le foto aperte hanno frecce senza testo visibile. Si torna alla mappa dopo aver chiuso la foto. La lettera in corsivo mostra la data del 24 Novembre 2026 in alto a destra, con firma e post scriptum separati dal corpo. Se il campo della foto è vuoto, mostra la sola dedica. Le fotografie pubblicate oltre 2 MB sono state ricompresse mantenendo risoluzione e metadati.

Il giradischi mostra i soli titoli. Da «I miei sogni d’anarchia» passa a «Flower In A Hurricane», «Time Is Running Out» e «Alors on danse», poi torna al primo brano.

Solo il tocco sullo zaino dopo il game over registra la raccolta. Prima della raccolta la schiena di Viola è libera.

Le polaroid adottano le proporzioni della fotografia orientata. Viola compare in basso a sinistra nell’album, in basso a destra in giardino e al fianco del tavolo nella stanza. Il computer grigio apre Vinted in una finestra pixel art. Minimizza conserva la pagina per la riapertura dal computer, Chiudi la scarica. Si torna alla mappa solo dalla vista della stanza. Non ci sono cartelli configurati. Il disco continua a suonare fra le scene. I comandi usano Pixelify Sans e il game over ha un gradiente pastello con teschi saltellanti. I messaggi delle lucciole usano il corsivo Spectral della dedica su carta con bordi a gradini e una X in alto a destra. Mappa resta nella vista del giardino. Le cifre della griglia e del tastierino del Sudoku usano DM Sans. Ogni voce in `messages` genera una lucciola, fino a dieci.

La versione pubblica segue il ramo `main` tramite il workflow Pages.

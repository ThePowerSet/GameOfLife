# Guida di progetto — Mini Game of Life web app

## 1. Obiettivo del progetto

Realizzare una piccola web app interattiva basata su Conway’s Game of Life, pubblicabile gratuitamente su GitHub Pages e utilizzabile bene sia da desktop sia da smartphone.

Il progetto deve essere:
- semplice
- carino
- immediato
- giocabile
- mobile-friendly
- facile da pubblicare su GitHub

Non deve diventare una piattaforma enciclopedica sul Game of Life. Non deve avere troppe spiegazioni, troppe opzioni o una libreria enorme di pattern.

L’utente deve poter aprire la pagina e fare subito tre cose:
1. provare alcuni pattern già pronti;
2. modificare la griglia creando cellule vive;
3. far partire, fermare, pulire e ricominciare la simulazione.
4. poter ingrandire e rimpicciolire per vedere il mondo da lontano e da vicino 

L’esperienza deve essere più vicina a un piccolo “giocattolo digitale” che a un progetto tecnico dimostrativo.

## 2. Risultato finale atteso

La pagina finale deve avere una sola schermata principale.

Struttura ideale:

- Titolo breve
- Piccola frase descrittiva
- Menù a tendina (dropdown) informativo (con curiosità sui pattern, basate su playgameoflife.com)

Controlli pattern:
`[Genera Pattern]` `[Random]`
*Testo dinamico*: "Pattern Attuale: [Nome]"

Canvas centrale con la griglia

Controlli simulazione:
`[Play/Pause]` `[speed up]` `[Restart]` `[Clear]`

Slider velocità

Eventuale contatore:
`Generation: 0`

Su desktop la griglia può essere più ampia.

Su mobile la griglia deve restare leggibile, i bottoni devono essere grandi abbastanza e la pagina non deve sembrare compressa.

## 3. Nome possibile del progetto

Il nome può essere uno di questi:
- Micro Life
- Mini Life
- Cell Garden
- Living Grid
- Conway Playground

La scelta più coerente con un progetto semplice, carino e anche un po’ “biologico” è:

**Micro Life**

Il titolo nella pagina potrebbe essere:

**Micro Life**

Sottotitolo:

*Try a pattern or draw your own living cells.*

Oppure, più semplice:

*Pick one, press play, or create your own.*

## 4. Tecnologia da usare

Usare solo:
- HTML
- CSS
- JavaScript vanilla
- Canvas API
- GitHub Pages

Non usare:
- React
- Vue
- Angular
- backend
- database
- WebAssembly
- framework CSS pesanti
- librerie grafiche esterne

Motivo: il progetto è piccolo. Usare framework renderebbe il codice più pesante senza un vero vantaggio.

## 5. Struttura della repository

La repository deve essere così:

```
micro-life/
├── index.html
├── style.css
├── game.js
├── patterns.js
└── README.md
```

### Ruolo dei file

**index.html**
Contiene la struttura della pagina:
- titolo
- descrizione breve
- menù a tendina informativo
- bottone singolo di generazione pattern
- nome del pattern visibile
- canvas
- controlli simulazione
- slider velocità
- contatore generazioni

**style.css**
Contiene tutta la parte visiva:
- layout desktop
- layout mobile
- stile bottoni e menù a tendina
- stile pagina
- responsive design

**game.js**
Contiene:
- griglia
- logica del Game of Life
- rendering canvas (incluso zoom e panning)
- eventi mouse/touch
- play/pause
- step
- clear
- restart
- velocità
- drag per rendere vive le celle

**patterns.js**
Contiene i pattern già pronti e le informazioni descrittive.

Ogni pattern deve essere definito come coordinate relative in un array:

```javascript
const PATTERNS = [
  {
    name: "Glider",
    cells: [
      [0, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [2, 2]
    ]
  },
  // altri pattern...
];

const PATTERNS_INFO = {
  // Dati presi da https://playgameoflife.com/ sui tipi di pattern (es. Oscillators, Still lifes, etc.)
};
```

**README.md**
Contiene:
- descrizione breve
- come aprire il progetto
- come pubblicarlo su GitHub Pages
- eventuale screenshot

## 6. Funzionalità obbligatorie

Il progetto deve avere queste funzioni.

### 6.1 Caricamento pattern pronti tramite Pulsante Unico

Non ci sarà un menù di scelta per caricare i singoli pattern esplicitamente.
Invece, ci sarà un singolo pulsante (es. `[Genera Pattern]`) che si occupa di caricare sulla griglia i pattern più affascinanti in sequenza o randomicamente.

Ci deve essere una lista interna di **massimo una decina** di pattern "fichi".
Pattern iniziali consigliati:
- Glider
- Pulsar
- Acorn
- Gosper Glider Gun
- ...e altri pattern interessanti.

Il comportamento deve essere:
- clicco sul bottone `Genera Pattern`
- → la simulazione si ferma
- → la griglia viene pulita
- → viene selezionato il pattern dalla lista dei 10
- → il pattern viene centrato
- → il nome del pattern (es. "Pattern Attuale: Glider") viene aggiornato nella UI
- → generation torna a 0
- → il pattern diventa lo stato iniziale per Restart

Questa parte è importante: se l’utente genera il Glider, poi fa partire la simulazione e poi preme Restart, deve tornare al Glider iniziale.

### 6.2 Menù a Tendina Informativo

Ci deve essere un menù a tendina (dropdown) dal quale l'utente può selezionare categorie o tipi di pattern per visualizzarne informazioni, descrizioni e curiosità. I contenuti (testi descrittivi sulle regole, su cosa sono le "Still lifes", "Oscillators", "Spaceships", ecc.) verranno tratti direttamente dal sito `https://playgameoflife.com/`.

Quando si seleziona una voce nel menù, deve apparire un riquadro o un'area informativa che spiega in modo semplice e carino quell'argomento, mantenendo intatto lo spirito giocoso della web app.

### 6.3 Play / Pause

Ci deve essere un bottone unico: `Play`. Quando la simulazione parte, il bottone diventa: `Pause`.

Comportamento:
- Play → avvia la simulazione
- Pause → ferma la simulazione

### 6.4 Step

Il bottone Step deve far avanzare la simulazione di una sola generazione.

### 6.5 Clear

Il bottone Clear deve pulire completamente la griglia e azzerare (o impostare su "Vuoto"/"Custom") il nome del pattern attuale.

### 6.6 Restart

Il bottone Restart deve riportare la griglia allo stato iniziale corrente.

Esempi:
- Se ho caricato un pattern con il bottone generatore: Restart → torna al pattern generato.
- Se ho creato manualmente un pattern e poi ho premuto Play: Restart → torna al pattern manuale iniziale.
- Se ho premuto Random: Restart → torna alla configurazione random iniziale.

Per farlo, serve salvare uno snapshot dello stato iniziale nell'oggetto `initialGrid`.

### 6.7 Random

Il bottone Random deve generare una configurazione casuale, pulire la griglia pregressa, accendere celle casuali (densità ~20%), salvare lo stato e aggiornare l'etichetta in "Pattern Attuale: Random".

### 6.8 Regolazione velocità

Deve esserci uno slider di velocità.
- slider verso sinistra → simulazione lenta
- slider verso destra → simulazione veloce

### 6.9 Click/tap sulle celle

L’utente deve poter cliccare o toccare una cella per cambiarne lo stato. Usare `pointer events` per maggiore fluidità.

### 6.10 Trascinamento per rendere vive le celle

L’utente deve poter trascinare il dito o il mouse sulla griglia e “dipingere” celle vive (`drag = set cell alive`).
Se la simulazione è in esecuzione (Play), appena si inizia a disegnare la simulazione va messa in Pause automaticamente.

## 7. Regole del Game of Life

Implementare le regole classiche.

Per ogni cella:
Se la cella è viva: sopravvive con 2 o 3 vicini vivi; muore negli altri casi.
Se la cella è morta: nasce se ha esattamente 3 vicini vivi; resta morta negli altri casi.

Usare due griglie: `currentGrid` e `nextGrid`.

## 8. Bordo della griglia

Per la prima versione usare bordo toroidale, cioè le celle “escono” da un lato e rientrano dall’altro.

## 9. Dimensione griglia e Navigazione (Zoom)

La griglia deve essere abbastanza grande per vedere pattern interessanti, ma non troppo pesante.
Inoltre, è fondamentale dare la possibilità all'utente di **ingrandire e rimpicciolire (zoom in/out)** per vedere il mondo da lontano e da vicino, eventualmente implementando anche un sistema di panning se necessario.

## 10. Rendering grafico

Usare canvas. Non usare una tabella HTML o div.

Stile consigliato (minimal, biologico, notturno, luminoso):
- background: `#07110c`
- cell alive: `#7CFF8A`
- cell grid: `rgba(124, 255, 138, 0.12)`

## 11. Layout desktop

Su desktop:
- pagina centrata (max-width 1000–1100 px)
- titolo in alto
- menù a tendina info
- bottone generatore, random e nome pattern
- canvas centrale
- controlli simulazione e slider sotto

Esempio:
```text
Micro Life
Pick one, press play, or create your own.

[Info sui Pattern ▾]

[Genera Pattern] [Random]             Pattern Attuale: Glider

+---------------------------------------------------------+
|                                                         |
|                       CANVAS                            |
|                                                         |
+---------------------------------------------------------+

[Play] [Step] [Restart] [Clear]

Speed: [----------|------]             Generation: 42
```

## 12. Layout mobile

Su mobile:
- layout responsivo e usabile
- menù a tendina facile da tappare
- pattern button, random e label molto chiari
- canvas che sfrutta al meglio la larghezza

Esempio:
```text
Micro Life
[Info Pattern ▾]

[Genera Pattern] [Random]
Pattern: Pulsar

+----------------------+
|                      |
|        CANVAS        |
|                      |
+----------------------+

[Play] [Step]
[Restart] [Clear]

Speed
[-------------]

Generation: 12
```

## 13. Stato interno dell’applicazione

Gestire chiaramente questi stati:

```javascript
let currentGrid;
let nextGrid;
let initialGrid;
let rows;
let cols;
let cellSize;
let isRunning = false;
let generation = 0;
let speed = 150;
let animationTimer = null;
let isDrawing = false;
let hasDragged = false;
let currentPatternIndex = 0; // Indice per il bottone di generazione
let zoomLevel = 1.0; // Per la gestione dello zoom
```

## 14. Funzioni principali da implementare

Il file `game.js` dovrebbe contenere funzioni chiare:

**Setup & Canvas**
- `init()`
- `resizeCanvas()`
- `createEmptyGrid()`
- `cloneGrid(grid)`

**Simulazione**
- `countNeighbors(row, col)`
- `computeNextGeneration()`
- `step()`
- `start()`
- `pause()`

**Rendering & Vista**
- `drawGrid()`
- `drawCells()`
- `render()`
- `handleZoom()`

**Pattern & Info**
- `loadNextPattern()`
- `centerPattern(cells)`
- `loadRandomPattern()`
- `showPatternInfo(category)`

**Interazione utente**
- `getCellFromPointerEvent(event)`
- `handlePointerDown(event)`
- `handlePointerMove(event)`
- `handlePointerUp(event)`
- `toggleCell(row, col)`

**UI**
- `updateGenerationLabel()`
- `updatePlayButton()`
- `updateSpeed()`
- `updatePatternNameLabel()`

## 15. Comportamento preciso dei bottoni

**Bottone Genera Pattern**
- carica il prossimo pattern dalla lista `PATTERNS`
- aggiorna il nome in pagina
- `pause()`
- `clear currentGrid`
- centra il pattern
- `generation = 0`
- `saveInitialState()`
- `render()`

**Menù Info**
- Al cambio (change) popola un box visibile all'utente con nozioni e curiosità legate alla voce selezionata.

**Bottone Random**
- `pause()`, grid casuale, `generation = 0`, aggiornamento nome pattern a "Random", salvataggio stato, `render()`.

**Bottoni Simulazione (Play, Step, Restart, Clear)**
- Funzionano tutti interagendo regolarmente con la griglia, fermando la simulazione ove opportuno e garantendo il ripristino di `initialGrid` per il restart.

## 16. Pattern da includere

Creare in `patterns.js` un array con un massimo di 10 pattern iconici (Glider, Pulsar, Acorn, Gosper Gun e altri 6). Non appesantire l'interfaccia con scelte estreme, usa solo "the best of".

## 17. Gestione del ridimensionamento

Quando la finestra cambia dimensione: ricalcolare dimensioni canvas e righe/colonne, mantenendo il pattern centrato se possibile.

## 18. Accessibilità minima

- Testi chiari per i bottoni: Play, Step, Restart, Clear, Random, Genera Pattern.
- Canvas etichettato.
- Slider label per Speed.
- Menù a tendina dotato di aria-labels corrette per l'accessibilità.

## 19. README

Il `README.md` deve essere semplice e presentare il progetto:

```markdown
# Micro Life

A small interactive Conway's Game of Life playground.

## Features

- Generate up to 10 cool patterns with a single button
- Learn about patterns via the info dropdown (data inspired by playgameoflife.com)
- Zoomable canvas for detailed or broad world viewing
- Play / Pause / Step-by-step simulation
- Click or drag to create living cells
- Mobile-friendly
```

## 20. Criteri di accettazione

**Funzionamento:** 
La griglia appare correttamente, lo zoom funziona in modo fluido. Le logiche di Conway girano alla giusta velocità in base allo slider.

**Generatore e Info:**
Il bottone Genera Pattern cicla/seleziona uno ad uno i 10 pattern migliori, mostrandone il nome. Il menù a tendina mostra nozioni leggibili e complete.

**Interazione & Mobile:**
Pienamente reattivo ai click/tap e al drag senza causare fastidioso scrolling della pagina durante il disegno. Bottoni usabili da mobile.

**Codice:**
Puro Vanilla JS, diviso in moduli logici `game.js` e `patterns.js` senza dipendenze pesanti esterne.

## 21. Ordine di sviluppo consigliato

- **Fase 1 — Base:** HTML/CSS/Canvas
- **Fase 2 — Logica Conway:** implementare calcolo delle generazioni
- **Fase 3 — UI e Controlli base:** Play, Step, Restart, Clear
- **Fase 4 — Interazione:** Disegno manuale (Pointer events)
- **Fase 5 — Zoom:** Aggiungere meccanica per ingrandire/rimpicciolire
- **Fase 6 — Pattern & Info:** Menù a tendina informativo e singolo pulsante generatore con l'array top-10
- **Fase 7 — Ottimizzazioni finali:** Responsive design, slider velocità e polishing estetico
- **Fase 8 — Deploy:** Caricamento su GitHub Pages

## 22. Filosofia del progetto

Il principio guida deve essere questo: **meno spiegazione, più interazione.**

L’utente non deve sentirsi confuso da mille tasti. Si impara giocando. Il box informativo è utile come extra (menù a tendina opzionale), ma l'enfasi primaria è data dal cliccare "Genera Pattern" e vedere la magia scorrere sullo schermo.
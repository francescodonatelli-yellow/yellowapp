# YellowApp — Piano di Deploy e Roadmap Tecnica
**Condominio Yellow · Via Fratelli Romeo 28, Mazara del Vallo**
*Documento preparato da YellowApp Development · Maggio 2026*

---

## 📦 Cosa contiene YellowApp_PWA.html

Il file che hai ricevuto è una **Progressive Web App (PWA)** completamente autonoma:

| Componente | Implementato |
|---|---|
| Autenticazione 6 condomini + admin | ✅ |
| Dashboard con KPI | ✅ |
| Comunicazioni (CRUD admin) | ✅ |
| Quote condominiali | ✅ |
| Conto corrente con 41 movimenti | ✅ |
| Upload e archivio documenti | ✅ |
| Sezione condomini (admin) | ✅ |
| Cambio password | ✅ |
| Manifest PWA (nome, colori, shortcuts) | ✅ |
| Service Worker (cache offline) | ✅ |
| Icone per tutte le dimensioni | ✅ |
| Banner installazione Android/Chrome | ✅ |
| Istruzioni installazione iOS/Safari | ✅ |
| Notifiche push (infrastruttura) | ✅ pronto |
| Responsive mobile/tablet/desktop | ✅ |

---

## 🚀 FASE 1 — Deploy immediato con dominio (Settimana 1)

### Step 1.1 — Acquisto dominio

**Dominio consigliato:** `yellowapp.it` oppure `condominioyellow.it`

**Dove acquistarlo:**
- **Aruba** (aruba.it) — più economico per .it: ~3€/anno
- **Register.it** — ~5€/anno, pannello intuitivo
- **Namecheap** — ~10€/anno, ottima gestione DNS

**Cosa acquistare:**
```
Dominio: yellowapp.it             ~3-5 €/anno
Hosting: Piano base statico       GRATUITO (vedi sotto)
SSL:     Incluso automatico       GRATUITO
TOTALE:  ~3-5 €/anno
```

### Step 1.2 — Hosting gratuito con Netlify (consigliato)

Netlify è la soluzione più semplice per un file HTML singolo:

1. Vai su **netlify.com** → Sign up (gratuito)
2. Trascina `YellowApp_PWA.html` nella dashboard → viene pubblicata in 30 secondi
3. Ottieni URL tipo `yellowapp-xxxxx.netlify.app`
4. Collega il dominio personalizzato dal pannello Netlify → Domain Settings
5. SSL (HTTPS) viene configurato automaticamente con Let's Encrypt

**Alternativa: GitHub Pages (gratuito)**
```bash
# 1. Crea repo su github.com/tuo-utente/yellowapp
# 2. Carica YellowApp_PWA.html rinominato come index.html
# 3. Settings → Pages → Branch main → Folder /root
# 4. URL: tuo-utente.github.io/yellowapp
# 5. Collega dominio personalizzato da Settings → Custom domain
```

---

## 📱 FASE 1 — Come installare l'app (istruzioni per i condomini)

### Android (Chrome / Samsung Internet)
```
1. Apri yellowapp.it con Chrome
2. Apparirà automaticamente un banner "Installa YellowApp"
   oppure tocca ⋮ Menu → "Aggiungi a schermata Home"
3. L'icona YellowApp appare nella schermata home
4. Si apre come una vera app, senza barra del browser
```

### iPhone / iPad (Safari)
```
1. Apri yellowapp.it con Safari (⚠️ NON Chrome su iOS)
2. Tocca il pulsante ⬆️ Condividi (in basso al centro)
3. Scorri l'elenco → "Aggiungi a schermata Home"
4. Tocca "Aggiungi" in alto a destra
5. L'app appare nella schermata home con l'icona Y gialla
```

### PC / Mac (Chrome o Edge)
```
1. Apri yellowapp.it
2. Clicca l'icona ⬛ nella barra dell'indirizzo (o Menu → Installa)
3. L'app si apre in finestra dedicata senza browser
```

---

## 🔧 FASE 2 — Backend reale con Firebase (mese 1-2)

### Perché serve il backend

La versione attuale salva i dati in `localStorage` del browser:
- ❌ I dati non sono condivisi tra dispositivi diversi
- ❌ Se un condomino cancella la cache del browser, perde i dati
- ❌ L'admin non vede in tempo reale i cambiamenti dei condomini

Con Firebase, tutto è in cloud condiviso in tempo reale.

### Costi Firebase (Piano Spark = GRATUITO)

Per 6 utenti il piano gratuito è più che sufficiente:

| Servizio | Limite gratuito | Utilizzo stimato |
|---|---|---|
| Authentication | Illimitato | 6 utenti |
| Firestore (database) | 1 GB storage, 50k letture/giorno | < 1 MB, < 100 letture/giorno |
| Storage (documenti) | 5 GB | < 500 MB |
| Hosting | 10 GB/mese | < 1 GB/mese |
| **TOTALE** | **€ 0** | ✅ |

### Architettura Firebase consigliata

```
Firebase Project: "yellowapp-condominio"
│
├── Authentication
│   └── Email/Password (6 utenti)
│
├── Firestore Database
│   ├── /communications/{id}
│   │   ├── oggetto, tipo, desc, date, authorId
│   ├── /quotes/{id}
│   │   ├── condId, importo, data, periodo, note
│   └── /documents/{id}
│       ├── name, size, url, date, uploaderId
│
└── Storage
    └── /documents/{userId}/{filename}
```

### Stack tecnologico per la migrazione

```
Frontend:  HTML/CSS/JS (già pronto) + Firebase SDK
Backend:   Firebase (nessun server da gestire)
Auth:      Firebase Authentication
Database:  Cloud Firestore (real-time)
Files:     Firebase Storage
Hosting:   Firebase Hosting oppure Netlify
Dominio:   yellowapp.it
```

**Tempo stimato di migrazione:** 2-3 settimane di sviluppo
**Costo:** 0€ (tutto nel piano gratuito Firebase)

---

## 📊 FASE 3 — Funzionalità avanzate (mese 2-3)

### 3.1 Notifiche Push

L'infrastruttura è già nel Service Worker. Con Firebase Cloud Messaging:
- Admin pubblica comunicazione → tutti i condomini ricevono notifica push
- Scadenza pagamento quote → promemoria automatico
- Costo: 0€

### 3.2 Email automatiche

Con Firebase + EmailJS o Resend.com:
- Nuova comunicazione → email a tutti i condomini
- Quota registrata → email di conferma al condomino
- Costo: 0€ (piano gratuito EmailJS: 200 email/mese)

### 3.3 Rendiconto PDF automatico

Generazione automatica del rendiconto condominiale annuale in PDF:
- Estratto movimenti CC
- Riepilogo quote per condomino
- Bilancio entrate/uscite
- Costo: 0€ (libreria jsPDF)

### 3.4 App Store (facoltativo, fase avanzata)

Se in futuro vuoi pubblicare sugli store ufficiali:

| Store | Strumento | Costo iscrizione | Tempi review |
|---|---|---|---|
| Google Play | Capacitor + PWA | 25€ una tantum | 3-7 giorni |
| Apple App Store | Capacitor + Xcode | 99€/anno | 1-5 giorni |
| Apple Enterprise | MDM deployment | 299€/anno | Immediato |

**Nota:** Per 6 utenti privati, la PWA installabile dalla home è funzionalmente equivalente a un'app nativa e non richiede store né costi.

---

## 💰 Riepilogo costi

### Scenario A — Solo dominio (fase 1, subito)
```
Dominio yellowapp.it:    3-5 €/anno
Hosting (Netlify):       0 €
SSL:                     0 €
─────────────────────────────────
TOTALE:                  3-5 €/anno
```

### Scenario B — Con backend Firebase (fase 2, consigliato)
```
Dominio yellowapp.it:    3-5 €/anno
Firebase Spark plan:     0 €
Firebase Hosting:        0 €
─────────────────────────────────
TOTALE:                  3-5 €/anno
```

### Scenario C — Con notifiche push + email
```
Dominio:                 3-5 €/anno
Firebase:                0 €
EmailJS (200 email/mese):0 €
─────────────────────────────────
TOTALE:                  3-5 €/anno
```

---

## 📋 Checklist deploy immediato (Fase 1)

- [ ] Acquistare dominio `yellowapp.it` su Aruba o Namecheap
- [ ] Creare account gratuito su netlify.com
- [ ] Rinominare `YellowApp_PWA.html` in `index.html`
- [ ] Trascinare il file sulla dashboard Netlify
- [ ] Collegare il dominio personalizzato (Domain Settings)
- [ ] Verificare che HTTPS sia attivo (automatico)
- [ ] Testare l'installazione su iPhone e Android
- [ ] Inviare le credenziali ai 6 condomini

**Password iniziali da comunicare:**
| Condomino | Email | Password iniziale |
|---|---|---|
| Chirco Carlo | carlochirco@gmail.com | YwCh2026! |
| Falcone Antonino | falcone.antonino@tiscali.it | YwFa2026! |
| Ingargiola Francesco | francescoingarg1986@libero.it | YwIn2026! |
| Clemente Giuseppe | dottgiuseppeclemente@gmail.com | YwCl2026! |
| Papiro Vincenzo | papiro@medimare.com | YwPa2026! |
| Francesco Donatelli (Admin) | francesco.donatelli@gmail.com | YwAdmin2026! |

⚠️ Ogni condomino può cambiare la propria password dal pulsante 🔑 in alto a destra.

---

## 🛡️ Note sulla sicurezza

La versione attuale è adatta per uso interno tra persone di fiducia. Per un livello enterprise:

1. **Non condividere il file HTML pubblicamente** — contiene le password in chiaro
2. **Fase 2 (Firebase)** porta autenticazione crittografata e sicurezza professionale
3. **GDPR:** i dati dei condomini sono trattati solo localmente (localStorage); con Firebase aggiungere Privacy Policy e Cookie Policy

---

*YellowApp è sviluppata con tecnologie web standard (HTML5, CSS3, JavaScript ES2022).*
*Compatibile con: Chrome 90+, Safari 14+, Firefox 88+, Edge 90+, Samsung Internet 14+*

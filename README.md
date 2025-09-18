# 🍽️ MahlZeit – Tischreservierungs-App

Dies ist ein Fullstack-Projekt zur Verwaltung von Tischreservierungen für Restaurants.  
Es ermöglicht Gästen, **Reservierungen zu erstellen, zu bearbeiten und zu löschen** sowie eine **Übersicht der belegten und freien Tische** einzusehen.

Das Projekt besteht aus:
- **Frontend (React + Vite)** → Deployment auf **Vercel**  
- **Backend (Node.js + Express + MongoDB)** → Deployment auf **Render**

---

## 🚀 Features

- 📅 Reservierungen erstellen (Name, E-Mail, Telefon, Datum, Uhrzeit, Gästezahl, Tisch)  
- ✏️ Reservierungen bearbeiten  
- 🗑️ Reservierungen löschen  
- 📊 Übersicht der freien & belegten Tische  
- 🌐 Deployment auf Vercel (Frontend) & Render (Backend)  
- ⚡ Moderne Technologien: React, Bootstrap, Axios, Express, MongoDB  

---

## 🛠️ Tech Stack

**Frontend:**
- React (mit Vite)
- React Router
- Bootstrap
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- CORS & dotenv

**Deployment:**
- Frontend: [Vercel](https://vercel.com)  
- Backend: [Render](https://render.com)  

---

## 🌍 Live Demo

- **Frontend:** 👉 [MahlZeit App auf Vercel](https://projekt2-gamma.vercel.app)  
- **Backend API:** 👉 [Render API Endpoint](https://projekt2-cvgr.onrender.com/api/reservations)  

---

## 📂 Ordnerstruktur

```bash
Projekt2/
│── Backend/               # Node.js + Express + MongoDB
│   ├── models/            # Datenbank-Modelle
│   ├── routes/            # API-Routen
│   ├── server.js          # Einstiegspunkt für Backend
│   └── .env               # MONGODB_URI, PORT
│
│── Frontend/              # React + Vite
│   ├── public/            # Statische Dateien
│   ├── src/
│   │   ├── components/    # Header, UI-Komponenten
│   │   ├── pages/         # ReservationDashboard, Tables, Home
│   │   ├── services/      # api.js (API-Aufrufe)
│   │   ├── App.jsx        # Haupt-App-Komponente
│   │   └── main.jsx       # Einstiegspunkt React
│   ├── .env               # VITE_API_URL
│   └── vite.config.js     # Vite-Konfiguration
│
└── README.md              # Projektdokumentation

⚙️ Environment Variables
Backend (Backend/.env)

MONGODB_URI=<Deine MongoDB-Verbindungs-URL>
PORT=5000

Frontend (Frontend/.env)

VITE_API_URL=https://projekt2-cvgr.onrender.com/api

🔑 Zugangsdaten
Für Nutzer

Die Live-Anwendung ist ohne Login oder Zugangsdaten nutzbar.
Jeder kann direkt über die Vercel-URL Reservierungen erstellen, ansehen, ändern und löschen.

👉 Live-URL: https://projekt2-gamma.vercel.app

Für Entwickler

Damit die Anwendung lokal gestartet oder erneut deployed werden kann, sind Environment Variables nötig:

Backend (Backend/.env)
MONGODB_URI=<Deine MongoDB-Verbindungs-URL>
PORT=5000

Frontend (Frontend/.env)
VITE_API_URL=https://projekt2-cvgr.onrender.com/api


➡️ Es werden keine weiteren Zugangsdaten benötigt.
Nur die MongoDB-Verbindungs-URL (für das Backend) muss gültig gesetzt sein.

💻 Installation & Lokaler Start
Voraussetzungen

Node.js (>= 18)

MongoDB Datenbank (lokal oder in der Cloud, z. B. MongoDB Atlas)

Schritte

Repository klonen

git clone https://github.com/ZBEF/Projekt2.git
cd Projekt2


Backend installieren & starten

cd Backend
npm install
npm start


→ Läuft auf: http://localhost:5000/api

Frontend installieren & starten

cd ../Frontend
npm install
npm run dev


→ Läuft auf: http://localhost:5173

🌐 Deployment
Frontend (Vercel)

Root Directory: Frontend

Build Command: npm run build

Output Directory: dist

Environment Variable: VITE_API_URL → Render-URL

Backend (Render)

Root Directory: Backend

Start Command: npm start

Environment Variable: MONGODB_URI

👤 Autor

Fabian Z.
Projektarbeit an der TEKO im 6. Semester (Internetdienste).

📜 Lizenz

Dieses Projekt ist ausschließlich für Ausbildungszwecke gedacht.
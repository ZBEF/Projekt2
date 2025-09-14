// Frontend/src/services/api.js

const API_BASE = import.meta.env.VITE_API_URL;



// Hilfsfunktion für robustes Lesen (auch bei 204 No Content)
async function readJsonSafe(res) {
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return null; }
}

// Alle Reservierungen abrufen
export const fetchReservations = async () => {
  const res = await fetch(`${API_BASE}/reservations`);
  if (!res.ok) {
    const data = await readJsonSafe(res);
    throw new Error(data?.message || "Fehler beim Abrufen");
  }
  return await res.json();
};

// Neue Reservierung erstellen
export const createReservation = async (data) => {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const dataBody = await readJsonSafe(res);
    throw new Error(dataBody?.message || "Fehler beim Erstellen");
  }
  return await res.json();
};

// Reservierung aktualisieren
export const updateReservation = async (id, data) => {
  const res = await fetch(`${API_BASE}/reservations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const dataBody = await readJsonSafe(res);
    throw new Error(dataBody?.message || "Fehler beim Aktualisieren");
  }
  return await res.json();
};

// Reservierung löschen
export const deleteReservation = async (id) => {
  const res = await fetch(`${API_BASE}/reservations/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const dataBody = await readJsonSafe(res);
    throw new Error(dataBody?.message || "Fehler beim Löschen");
  }
  return await readJsonSafe(res);
};

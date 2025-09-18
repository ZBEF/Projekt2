// Frontend/src/services/api.js

const API_BASE = import.meta.env.VITE_API_URL;

// Hilfsfunktion: Antwort sicher in JSON umwandeln
async function readJsonSafe(res) {
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

// Alle Reservierungen abrufen
export async function fetchReservations() {
  const res = await fetch(`${API_BASE}/reservations`);
  if (!res.ok) {
    const data = await readJsonSafe(res);
    throw new Error(data?.message || "Fehler beim Abrufen der Reservierungen");
  }
  return await res.json();
}

// Neue Reservierung erstellen
export async function createReservation(data) {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const dataBody = await readJsonSafe(res);
    throw new Error(dataBody?.message || "Fehler beim Erstellen der Reservierung");
  }
  return await res.json();
}

// Reservierung aktualisieren
export async function updateReservation(id, data) {
  const res = await fetch(`${API_BASE}/reservations/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const dataBody = await readJsonSafe(res);
    throw new Error(dataBody?.message || "Fehler beim Aktualisieren der Reservierung");
  }
  return await res.json();
}

// Reservierung löschen
export async function deleteReservation(id) {
  const res = await fetch(`${API_BASE}/reservations/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const dataBody = await readJsonSafe(res);
    throw new Error(dataBody?.message || "Fehler beim Löschen der Reservierung");
  }
  return await readJsonSafe(res);
}

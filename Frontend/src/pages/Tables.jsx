import React, { useEffect, useState } from "react";
import { fetchReservations } from "../services/api"; // <-- API-Funktion importieren

const Tables = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // yyyy-mm-dd
  });

  const allTables = [1, 2, 3, 4, 5, 6, 7, 8];

  useEffect(() => {
    const loadReservations = async () => {
      try {
        const data = await fetchReservations(); // <-- API-Aufruf über service
        setReservations(data);
      } catch (err) {
        console.error("Fehler beim Laden:", err.message);
        setReservations([]);
      }
    };
    loadReservations();
  }, []);

  const getReservationsForTable = (tableNumber) => {
    return reservations
      .filter(
        (r) =>
          Number(r.table) === tableNumber && r.date === selectedDate
      )
      .sort((a, b) => {
        const aDate = new Date(`${a.date}T${a.time}`);
        const bDate = new Date(`${b.date}T${b.time}`);
        return aDate - bDate;
      });
  };

  const formatDateTime = (date, time) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "1200px" }}>
      <div className="card p-4 shadow-sm">
        <h3 className="mb-4 text-center">Tischübersicht</h3>

        <div className="mb-4 text-center">
          <label className="form-label me-2 fw-bold">Datum:</label>
          <input
            type="date"
            className="form-control d-inline-block"
            style={{ maxWidth: "200px" }}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="row g-4">
          {allTables.map((table) => {
            const tableReservations = getReservationsForTable(table);
            const reserved = tableReservations.length > 0;

            return (
              <div key={table} className="col-6 col-md-4 col-lg-3">
                <div
                  className={`card text-center p-3 shadow-sm border-0 ${
                    reserved ? "bg-danger text-white" : "bg-success text-white"
                  }`}
                  style={{ borderRadius: "12px", minHeight: "130px" }}
                >
                  <h5 className="fw-bold mb-2">Tisch {table}</h5>
                  {reserved ? (
                    <ul className="list-unstyled mb-0 text-start small">
                      {tableReservations.map((res, idx) => (
                        <li key={idx}>🕒 {formatDateTime(res.date, res.time)}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="fw-medium">Frei</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tables;

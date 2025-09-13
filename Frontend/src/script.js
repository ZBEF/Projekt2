document
  .getElementById("reservationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Werte aus dem Formular auslesen
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let persons = document.getElementById("persons").value;
    let tableNr = document.getElementById("tableNr").value;

    // Neue Zeile in der Tabelle erstellen
    let table = document.getElementById("reservationTable");
    let row = table.insertRow();

    row.innerHTML = `
        <td>${name}</td>
        <td>${email}</td>
        <td>${phone}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td>${persons}</td>
        <td>${tableNr}</td>
        <td>
            <button class="btn btn-danger btn-sm" onclick="deleteRow(this)">Löschen</button>
        </td>
    `;

    // Formular zurücksetzen
    document.getElementById("reservationForm").reset();
  });

function deleteRow(button) {
  let row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

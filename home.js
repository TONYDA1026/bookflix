const movies = [
  "Dune: Part Two", "The Batman", "Barbie", "Avatar: The Way of Water", "John Wick: Chapter4", "Guardians of the Galaxy Vol. 3"
];

function populateMovieDropdown() {
  const movieSelect = document.getElementById("movie");
  movies.forEach(movie => {
    const option = document.createElement("option");
    option.value = movie;
    option.textContent = movie;
    movieSelect.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", populateMovieDropdown);

function toggleCategory(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === "block" ? "none" : "block";
}

function addTicket() {
  const movie = document.getElementById("movie").value;
  const seats = parseInt(document.getElementById("seats").value);
  const pricePerSeat = 10;

  if (!movie || !seats || seats < 1) return alert("Please enter valid movie and seat count.");

  const table = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();
  newRow.innerHTML = `
    <td>${movie}</td>
    <td>${seats}</td>
    <td>$${seats * pricePerSeat}</td>
  `;
  updateTotal();
}

function updateTotal() {
  const table = document.getElementById("ticketTable");
  let total = 0;
  [...table.getElementsByTagName("tbody")[0].rows].forEach(row => {
    const price = parseFloat(row.cells[2].textContent.replace("$", ""));
    total += price;
  });
  document.getElementById("totalPrice").textContent = `$${total}`;
}

function saveFavourite() {
  const movie = document.getElementById("movie").value;
  const seats = document.getElementById("seats").value;
  localStorage.setItem("favouriteBooking", JSON.stringify({ movie, seats }));
  alert("Favourite saved!");
}

function applyFavourite() {
  const fav = JSON.parse(localStorage.getItem("favouriteBooking"));
  if (!fav) return alert("No favourite saved.");
  document.getElementById("movie").value = fav.movie;
  document.getElementById("seats").value = fav.seats;
  addTicket();
}

function proceedToCheckout() {
  const table = document.getElementById("ticketTable").getElementsByTagName("tbody")[0];
  const rows = Array.from(table.rows);
  if (rows.length === 0) {
    alert("No tickets added!");
    return;
  }

  const tickets = rows.map(row => {
    return {
      movie: row.cells[0].textContent,
      seats: parseInt(row.cells[1].textContent),
      price: parseFloat(row.cells[2].textContent.replace("$", ""))
    };
  });

  localStorage.setItem("currentBooking", JSON.stringify(tickets));
  window.location.href = "checkout.html";
}

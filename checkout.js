document.addEventListener("DOMContentLoaded", () => {
  const ticketList = JSON.parse(localStorage.getItem('currentBooking')) || [];
  const orderSummary = document.getElementById('orderSummary');
  let total = 0;

  if (ticketList.length > 0) {
    const summaryDetails = document.createElement('div');
    summaryDetails.classList.add('summary-details');

    ticketList.forEach((ticket, index) => {
      const seatNumbers = Array.from({ length: ticket.seats }, (_, i) => `S${index + 1}-${i + 1}`).join(", ");
      ticket.seatNumbers = seatNumbers;

      const movieInfo = document.createElement('p');
      movieInfo.innerHTML = `<strong>${ticket.movie}</strong> - ${ticket.seats} seat(s) - $${ticket.price} <br> 
                              <small>Seats: ${seatNumbers}</small>`;
      summaryDetails.appendChild(movieInfo);

      total += ticket.price;
    });

    const totalInfo = document.createElement('p');
    totalInfo.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    summaryDetails.appendChild(totalInfo);

    // Append the updated content
    orderSummary.appendChild(summaryDetails);
    localStorage.setItem('currentBooking', JSON.stringify(ticketList)); // Save seat numbers
  } else {
    orderSummary.innerHTML += '<p>No tickets selected.</p>';
  }

  // Handle form submission
  document.getElementById('checkoutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const seatPref = document.getElementById('seatPref').value;
    const referenceNumber = Math.floor(100000 + Math.random() * 900000);

    const ticketListWithSeats = JSON.parse(localStorage.getItem('currentBooking')) || [];
    const bookedSeats = ticketListWithSeats.map(t => `${t.movie}: ${t.seatNumbers}`).join("<br>");

    const confirmation = document.getElementById('confirmation');
    confirmation.innerHTML = `
      <h3>Thank you, ${name}!</h3>
      <p>Your payment was successful. ✅</p>
      <p><strong>Seat Preference:</strong> ${seatPref}</p>
      <p><strong>Your booked seats:</strong></p>
      <p>${bookedSeats}</p>
      <p>An e-ticket has been sent to: <strong>${email}</strong></p>
      <p><strong>Booking Reference:</strong> #${referenceNumber}</p>
      <p>🎬 Enjoy the movie!</p>
    `;
    confirmation.style.display = 'block';

    // Optionally hide the form after success
    this.style.display = 'none';
  });
});

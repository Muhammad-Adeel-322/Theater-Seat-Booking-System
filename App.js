let container = document.querySelector('.container');
let seats = document.querySelectorAll('.row .seat:not(.occupied)');
let count = document.getElementById('count');
let total = document.getElementById('total');
let movieSelect = document.getElementById('movie');

populateUI();
let ticketPrice = movieSelect.value;
 movieSelect.addEventListener('change', (e) => {
    ticketPrice = e.target.value;
    console.log(ticketPrice);
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
function updateSelectedCount() {
    let selectedSeats = document.querySelectorAll('.row .seat.selected');
    let seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    let selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
function populateUI() {
    let selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    let selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
container.addEventListener('click', (e) => {
    if (
        e.target.classList.contains('seat') && !e.target.classList.contains('occupied')
    ) {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});
updateSelectedCount();

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
// Initialize
populatedUI()

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // Save in localstorage
  const seatsIndexes = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });
  const stringfyIndexes = JSON.stringify(seatsIndexes);
  localStorage.setItem("selectedSeats", stringfyIndexes);
  let selectedCount = selectedSeats.length;
  count.innerText = selectedCount;
  total.innerText = selectedCount * ticketPrice;
}
function populatedUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat,i)=>{
      if(selectedSeats.indexOf(i) > -1){
        seat.classList.add('selected');
      }
    })
  }
  let selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  let selectedMoviePrice = localStorage.getItem('selectedMoviePrice')
  if(selectedMovieIndex!==null){
    movieSelect.selectedIndex = +selectedMovieIndex
    ticketPrice = +selectedMoviePrice
    updateSelectedCount()
   }
}
// Event Listeners
// Movie Select
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});
// Seat click
container.addEventListener("click", (e) => {
  let target = e.target;
  if (
    target.classList.contains("seat") &&
    !target.classList.contains("occupied")
  ) {
    target.classList.toggle("selected");
    updateSelectedCount();
  }
});
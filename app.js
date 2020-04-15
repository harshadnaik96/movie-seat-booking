const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value; //(+ makes it a num)gives the value inside movie (i.e. price)

//Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMovieproce", moviePrice);
}
//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length; //.length converts the node list array to numbers

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// ABOVE Local storage to prevent losing data after reloading
// (copy selected seats into arr
// map through array
// return a new arr of indexes)

//Get data from local storage populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
//Event listener for movie selection
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Event Listener for seats selection
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //toggle('selected) makes the selected seat change color
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// console.log(e.target); this lets us know what we have clicked
//above if stmnt just logs when  seat is clicked.
//we tell our js that when the evnt is fired get the class
//list which contains only seats and perform certain operation.
//the part aftr && tell js to run the func only
//if an empty seat is selected and nt occupied one

//Intial count and total set
updateSelectedCount();

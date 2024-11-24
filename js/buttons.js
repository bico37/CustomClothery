import { getCurrentSide, setCurrentSide } from './start.js';
import { loadSlide } from './slides.js';
import { updateHighlightedButton } from './statusbar.js';

let prevButton = document.getElementById("btn-prev");
let nextButton = document.getElementById("btn-next");

export function initializeButtons() {
  prevButton.addEventListener("click", () => {
    changeSlide("prev");
  });

  nextButton.addEventListener("click", () => {
    changeSlide("next");
  });

  updateButtonsState();
}

function changeSlide(direction) {
  let currentSide = getCurrentSide(); // Aktuelle Seite abrufen

  if (direction === "next" && currentSide < 4) {
    setCurrentSide(currentSide + 1); // Aktuelle Seite aktualisieren
  } else if (direction === "prev" && currentSide > 0) {
    setCurrentSide(currentSide - 1); // Aktuelle Seite aktualisieren
  }

  currentSide = getCurrentSide(); // Neue Seite abrufen
  loadSlide(currentSide);          // Lade den neuen Slide
  updateHighlightedButton(currentSide);
  updateButtonsState();
}

function updateButtonsState() {
  let currentSide = getCurrentSide();
  prevButton.disabled = currentSide == 0;
  nextButton.disabled = currentSide == 4;
}

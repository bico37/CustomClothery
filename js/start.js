import { initializeButtons } from "./buttons.js";
import { initializeStatusBar } from "./statusbar.js";
import { loadSlide } from "./slides.js";
import { updateHighlightedButton } from "./statusbar.js";

let currentSide = 0;

// getter setter
export function getCurrentSide() {
  return currentSide;
}
export function setCurrentSide(newSide) {
  currentSide = newSide;
}

window.onload = function () {
  initializeButtons(); // Initialize next/prev buttons
  initializeStatusBar(); // Set up the status bar
  loadSlide(currentSide); // Load the first slide
  updateHighlightedButton(currentSide); // Highlight the first button
};

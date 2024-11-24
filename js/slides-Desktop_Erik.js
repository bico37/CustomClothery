import { loadSlide1 } from './slides/slide1.js';
import { loadSlide2 } from './slides/slide2.js';
import { loadSlide3 } from './slides/slide3.js';
import { loadSlide4 } from './slides/slide4.js';
import { loadSlide5 } from './slides/slide5.js';
import { calculatePrice } from './calculatePrice.js'; // Importiere die calculatePrice-Funktion
import { getConfiguration } from './configuration.js'; // Importiere die getConfiguration-Funktion

export let slideContainer = document.getElementById("container");

function switchCSS(slideIndex) {
  // Deaktiviere alle CSS-Dateien
  for (let i = 1; i <= 5; i++) {
    document.getElementById(`slide${i}`).disabled = true;
  }

  // Aktiviere das CSS für den aktuellen Slide
  document.getElementById(`slide${slideIndex + 1}`).disabled = false;
}

export function loadSlide(slideIndex) {
    // CSS wechseln
    switchCSS(slideIndex);

    // Berechne den Preis und logge ihn in der Konsole
    calculatePrice();

    let configuration = getConfiguration();
    console.log(`Current Price: ${configuration.price}`); // Logge den aktuellen Preis

    switch (slideIndex) {
      case 0:
        loadSlide1();
        break;
      case 1:
        loadSlide2();
        break;
      case 2:
        loadSlide3();
        break;
      case 3:
        loadSlide4();
        break;
      case 4:
        loadSlide5();
        break;
    }
}

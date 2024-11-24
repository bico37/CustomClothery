import { slideContainer } from "../slides.js";
import { setConfiguration, getConfiguration } from "../configuration.js";
import { sizeMultiplayer } from "../configuration.js";

export function loadSlide2() {
  let item = getConfiguration().type;
  let currentSize = getConfiguration().size; // Aktuelle Größe aus der Konfiguration
  let itemString = "";

  if (item == "t-shirt") {
    itemString = `
      <div class="itembox">
        <svg class="icon" id="tshirt-icon" fill="none" stroke="#000000" stroke-width="1" viewBox="-6.4 -6.4 76.80 76.80" xmlns="http://www.w3.org/2000/svg" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
          <path d="M44 12.09c3.92 1.62 12 12 12 12l-8 8-4-4v24H20v-24l-4 4-8-8s8.08-10.38 12-12c.92-.39 4 0 4 0 0 4 4 8 8 8s8-4 8-8c0 0 3.08-.39 4 0z"/>
        </svg>
      </div>
    `;
  } else if (item == "hoodie") {
    itemString = `
      <div class="itembox">
        <svg class="icon" id="sweater-icon" fill="none" stroke="black" stroke-width="5" viewBox="-20 -20 330.094 330.094" xmlns="http://www.w3.org/2000/svg">
          <path d="M287.804,168.505L216.34,69.131c-4.957-6.893-12.929-10.98-21.42-10.98h-12.891V41.597c0-6.721-5.449-12.17-12.17-12.17h-18.192v80.346c0,4.142-3.357,7.5-7.5,7.5c-4.143,0-7.5-3.358-7.5-7.5V29.427h-18.191c-6.721,0-12.17,5.449-12.17,12.17v16.554h-11.13c-8.491,0-16.463,4.086-21.42,10.98L2.29,168.505c-3.708,5.157-2.827,12.298,2.023,16.399l13.14,11.109c4.83,4.083,11.982,3.787,16.458-0.683l38.508-38.458l-5.373,57.454c-0.319,3.41,0.814,6.796,3.12,9.328c2.271,2.494,5.475,3.924,8.843,3.967v20.876c0,6.721,5.449,12.17,12.17,12.17h107.735c6.721,0,12.17-5.449,12.17-12.17v-20.876c3.368-0.043,6.572-1.473,8.844-3.967c2.306-2.532,3.439-5.918,3.12-9.328l-5.373-57.454l38.508,38.458c4.475,4.469,11.628,4.766,16.458,0.683l13.14-11.109C290.632,180.803,291.513,173.661,287.804,168.505z"/>
        </svg>
      </div>
    `;
  }

  console.log("loadSlide2");
  slideContainer.innerHTML = `
      <div id="size-preview">

        ${itemString}

        
        <div id="selectSize">
          <h2>Choose your Size:</h2>
          <div id="sizes">
            <div class="size" data-size="S">S</div>
            <div class="size" data-size="M">M</div>
            <div class="size" data-size="L">L</div>
            <div class="size" data-size="XL">XL</div>
          </div>
        </div>

      </div>
    `;

  // Größe automatisch auswählen, falls vorhanden
  if (currentSize !== "none") {
    let selectedSizeElement = document.querySelector(`.size[data-size="${currentSize}"]`);
    if (selectedSizeElement) {
      selectedSizeElement.classList.add("selected");
      updateIconSize(currentSize);
    }
  }

  // Event-Listener für die Größenwahl hinzufügen
  document.querySelector("#sizes").addEventListener("click", (event) => {
    if (event.target.classList.contains("size")) {
      sizeSelected(event);
    }
  });

  function sizeSelected(event) {
    let size = event.target.getAttribute("data-size");
    setConfiguration({ size: size });
    
    // Icon entsprechend der Größe anpassen
    updateIconSize(size);

    // Farbe für die ausgewählte Größe aktualisieren
    colorSize(event);
  }

  function updateIconSize(size) {
    let icon = document.querySelector(".icon");
    let multiplier = sizeMultiplayer[size];
    console.log(multiplier);
    icon.style.transform = `scale(${multiplier})`;
  }

  function colorSize(event) {
    let sizes = document.querySelectorAll(".size");
    sizes.forEach((size) => {
      size.classList.remove("selected");
    });
    event.target.classList.add("selected");
  }
}

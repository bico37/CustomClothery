import { slideContainer } from "../slides.js";
import { getConfiguration } from "../configuration.js";
import { sizeMultiplayer } from "../configuration.js";


export function loadSlide5() {
  let config = getConfiguration();
  let item = config.type;
  let currentColor = config.color;
  let itemString = "";


  // Erstellen der SVG-Icons für T-Shirt oder Hoodie
  if (item === "t-shirt") {
    itemString = `
        <div class="itembox" style="position: relative;">
            <svg class="icon" id="tshirt-icon" fill="${currentColor}" stroke="${currentColor}" stroke-width="1" viewBox="-6.4 -6.4 76.80 76.80" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 12.09c3.92 1.62 12 12 12 12l-8 8-4-4v24H20v-24l-4 4-8-8s8.08-10.38 12-12c.92-.39 4 0 4 0 0 4 4 8 8 8s8-4 8-8c0 0 3.08-.39 4 0z"/>
            </svg>
            <div id="svg-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ${config.print.fontSize
      }px; color: ${config.print.color}; font-family: Arial;">
                ${config.print.text || ""}
            </div>
        </div>
        `;
  } else if (item === "hoodie") {
    itemString = `
            <div class="itembox" style="position: relative;">
                <svg class="icon" id="sweater-icon" fill="${currentColor}" stroke="${currentColor}" stroke-width="5" viewBox="-20 -20 330.094 330.094" xmlns="http://www.w3.org/2000/svg">
                    <path d="M287.804,168.505L216.34,69.131c-4.957-6.893-12.929-10.98-21.42-10.98h-12.891V41.597c0-6.721-5.449-12.17-12.17-12.17h-18.192v80.346c0,4.142-3.357,7.5-7.5,7.5c-4.143,0-7.5-3.358-7.5-7.5V29.427h-18.191c-6.721,0-12.17,5.449-12.17,12.17v16.554h-11.13c-8.491,0-16.463,4.086-21.42,10.98L2.29,168.505c-3.708,5.157-2.827,12.298,2.023,16.399l13.14,11.109c4.83,4.083,11.982,3.787,16.458-0.683l38.508-38.458l-5.373,57.454c-0.319,3.41,0.814,6.796,3.12,9.328c2.271,2.494,5.475,3.924,8.843,3.967v20.876c0,6.721,5.449,12.17,12.17,12.17h107.735c6.721,0,12.17-5.449,12.17-12.17v-20.876c3.368-0.043,6.572-1.473,8.844-3.967c2.306-2.532,3.439-5.918,3.12-9.328l-5.373-57.454l38.508,38.458c4.475,4.469,11.628,4.766,16.458,0.683l13.14-11.109C290.632,180.803,291.513,173.661,287.804,168.505z"/>
                </svg>
                <div id="svg-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: ${config.print.fontSize
      }px; color: ${config.print.color}; font-family: Arial;">
                  ${config.print.text || "Your Text"}
                </div>
            </div>
        `;
  }

  // Setze den inneren HTML-Inhalt der slideContainer
  slideContainer.innerHTML = `
        <div id="color-slide">
            <div class="left-column">
                ${itemString}
            </div>
            <div id="buy-button" onclick="showPopup()"><p>Buy Now</p></div>
        </div>
        <div id="popup" class="popup">
          <p>Thanks for your Order!</p>
        </div>
    `;


  // Größe der Icons anpassen
  adjustIconSize();

  console.log(config)
  let textElement = document.getElementById("svg-text");
  textElement.style.transform = `translate(-50%, calc(-50% + ${config.print.posY || 0}px))`;

  
  // Schattenfarbe anpassen
  function adjustTextShadow(color) {
    let rgbColor = hexToRgb(color);
    let luminance = (0.299 * rgbColor.r + 0.587 * rgbColor.g + 0.114 * rgbColor.b);

    if (luminance < 128) {
      textElement.style.filter = 'drop-shadow(0 0 2px white)'; // Weißer Schatten für dunklen Text
    } else {
      textElement.style.filter = 'drop-shadow(0 0 2px black)'; // Schwarzer Schatten für hellen Text
    }
  }

  // Hex-Farbe in RGB umwandeln
  function hexToRgb(hex) {
    let r = 0, g = 0, b = 0;

    // 3-Stelliges Hex-Farbformat
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    }
    // 6-Stelliges Hex-Farbformat
    else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return { r, g, b };
  }

  adjustTextShadow(config.print.color || '#FFFFFF');

  window.showPopup = showPopup;
}

// Funktion zur Anpassung der Icons basierend auf der aktuellen Größe
function adjustIconSize() {
  let config = getConfiguration();
  let currentSize = config.size; // Größe aus der Konfiguration abrufen
  let iconSize = sizeMultiplayer[currentSize] || 1; // Größe aus sizeMultiplayer abrufen, Standardwert ist 1

  const icons = document.querySelectorAll(".icon");
  icons.forEach((icon) => {
    icon.style.transform = `scale(${iconSize})`;
  });

}


function showPopup() {
  const popup = document.getElementById('popup');

  // Popup anzeigen
  popup.style.display = 'block';

  // dem popup die klasse show hinzufügen
  popup.classList.add('show');

  // Seite nach 5 Sekunden neu laden
  setTimeout(() => {
      location.reload();
  }, 5000); // 5000 Millisekunden = 5 Sekunden
}
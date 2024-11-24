import { slideContainer } from "../slides.js";
import { setConfiguration, getConfiguration } from "../configuration.js";
import { sizeMultiplayer } from "../configuration.js";

export function loadSlide4() {
    // Aktuelle Konfiguration abrufen
    let config = getConfiguration();
    let item = config.type;
    let currentColor = config.color;

    // Erstellen der SVG-Icons für T-Shirt oder Hoodie
    let itemString = "";

    if (item === "t-shirt") {
        itemString = `
        <div class="itembox" style="position: relative;">
            <svg class="icon" id="tshirt-icon" fill="${currentColor}" stroke="${currentColor}" stroke-width="1" viewBox="-6.4 -6.4 76.80 76.80" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 12.09c3.92 1.62 12 12 12 12l-8 8-4-4v24H20v-24l-4 4-8-8s8.08-10.38 12-12c.92-.39 4 0 4 0 0 4 4 8 8 8s8-4 8-8c0 0 3.08-.39 4 0z"/>
            </svg>
            <div id="svg-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 8px; color: white; font-family: Arial;">
                ${config.print.text || "Your Text"}
            </div>
        </div>
        `;
    } else if (item === "hoodie") {
        itemString = `
            <div class="itembox" style="position: relative;">
                <svg class="icon" id="sweater-icon" fill="${currentColor}" stroke="${currentColor}" stroke-width="5" viewBox="-20 -20 330.094 330.094" xmlns="http://www.w3.org/2000/svg">
                    <path d="M287.804,168.505L216.34,69.131c-4.957-6.893-12.929-10.98-21.42-10.98h-12.891V41.597c0-6.721-5.449-12.17-12.17-12.17h-18.192v80.346c0,4.142-3.357,7.5-7.5,7.5c-4.143,0-7.5-3.358-7.5-7.5V29.427h-18.191c-6.721,0-12.17,5.449-12.17,12.17v16.554h-11.13c-8.491,0-16.463,4.086-21.42,10.98L2.29,168.505c-3.708,5.157-2.827,12.298,2.023,16.399l13.14,11.109c4.83,4.083,11.982,3.787,16.458-0.683l38.508-38.458l-5.373,57.454c-0.319,3.41,0.814,6.796,3.12,9.328c2.271,2.494,5.475,3.924,8.843,3.967v20.876c0,6.721,5.449,12.17,12.17,12.17h107.735c6.721,0,12.17-5.449,12.17-12.17v-20.876c3.368-0.043,6.572-1.473,8.844-3.967c2.306-2.532,3.439-5.918,3.12-9.328l-5.373-57.454l38.508,38.458c4.475,4.469,11.628,4.766,16.458,0.683l13.14-11.109C290.632,180.803,291.513,173.661,287.804,168.505z"/>
                </svg>
                <div id="svg-text" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 8px; color: white; font-family: Arial;">
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
            <div class="right-column">
                <h3 for="textInp">Enter text (max. 10 characters):</h3>
                <input type="text" name="text" id="textInp" maxlength="10" value="${config.print.text || ''}">
                
                <h3 for="textColor">Choose text color:</h3>
                <input type="color" id="textColor" value="${config.print.color || '#FFFFFF'}"> <!-- Color selection for text -->
                
                <h3 for="fontSize">Font size:</h3>
                <input type="range" id="fontSize" min="10" max="40" value="${config.print.fontSize || 25}">
                
                <h3 for="textPosition">Text position:</h3>
                <input type="range" id="textPosition" min="-50" max="50" value="${config.print.posY || 0}">
            </div>
        </div>
    `;

    // Text-Element und Konfiguration initialisieren
    let textElement = document.getElementById("svg-text");
    textElement.textContent = config.print.text || "Your Text";
    textElement.style.fontSize = `${config.print.fontSize || 25}px`;
    textElement.style.color = config.print.color || '#FFFFFF'; // Setze die Textfarbe korrekt
    textElement.style.transform = `translate(-50%, calc(-50% + ${config.print.posY || 0}px))`;
    adjustTextShadow(config.print.color || '#FFFFFF');

    // Event-Listener für die Textfarbe
    let textColorInput = document.getElementById("textColor");
    textColorInput.addEventListener("input", (event) => {
        let selectedColor = event.target.value;
        textElement.style.color = selectedColor; // Verwende 'style.color' für Textfarbe
        
        // Schattenfarbe anpassen
        adjustTextShadow(selectedColor);

        // Textfarbe in der Konfiguration speichern
        updatePrintConfiguration("color", selectedColor);
    });

    // Event-Listener für die Schriftgröße
    let fontSizeInput = document.getElementById("fontSize");
    fontSizeInput.addEventListener("input", (event) => {
        let newSize = event.target.value;
        textElement.style.fontSize = `${newSize}px`;

        // Schriftgröße in der Konfiguration speichern
        updatePrintConfiguration("fontSize", newSize);
    });

    // Event-Listener für die Textposition
    let textPositionInput = document.getElementById("textPosition");
    textPositionInput.addEventListener("input", (event) => {
        let newPosition = event.target.value;
        textElement.style.transform = `translate(-50%, calc(-50% + ${newPosition}px))`;

        console.log(newPosition);
        // Textposition in der Konfiguration speichern
        updatePrintConfiguration("posY", newPosition);
    });

    // Event-Listener für die Texteingabe
    let textInput = document.getElementById("textInp");
    textInput.addEventListener("input", (event) => {
        let newText = event.target.value;
        textElement.textContent = newText;
        
        // Textinhalt in der Konfiguration speichern
        updatePrintConfiguration("text", newText);
    });

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

    // Größe der Icons anpassen
    adjustIconSize();
}

// Funktion zur Anpassung der Icons basierend auf der aktuellen Größe
function adjustIconSize() {
    let config = getConfiguration();
    let currentSize = config.size; // Größe aus der Konfiguration abrufen
    let iconSize = sizeMultiplayer[currentSize] || 1; // Größe aus sizeMultiplayer abrufen, Standardwert ist 1

    const icons = document.querySelectorAll('.icon');
    icons.forEach(icon => {
        icon.style.transform = `scale(${iconSize})`;
    });
}

// Funktion zur Aktualisierung der Druckkonfiguration
function updatePrintConfiguration(key, value) {
    let config = getConfiguration();
    config.print[key] = value;
    setConfiguration(config);
}

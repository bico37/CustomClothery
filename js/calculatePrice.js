import { getConfiguration, setConfiguration } from "./configuration.js"; // Importiere die setConfiguration-Funktion
import { typePrice, textPrice } from "./prices.js";

export function calculatePrice() {
    let configuration = getConfiguration();
    let totalPrice = 0;

    console.log(configuration); // Debug-Ausgabe der Konfiguration

    // Füge den Typ-Preis hinzu
    totalPrice += typePrice[configuration.type] || 0;

    // Füge den Farbpreis immer hinzu, wenn eine Farbe gesetzt ist
    if (configuration.color) { // Überprüfen, ob eine Farbe gesetzt ist
        totalPrice += 2; // Füge 2 Euro für die Farbe hinzu
    }

    // Füge den Textpreis nur hinzu, wenn es Text gibt
    if (configuration.print.text.trim() !== "") {
        totalPrice += textPrice.text; // beachte, dass wir hier textPrice.text nutzen
    }

    // Setze den neuen Preis in die Konfiguration
    setConfiguration({ ...configuration, price: totalPrice });

    document.getElementById("pricing").innerText = `${totalPrice}€`;
}

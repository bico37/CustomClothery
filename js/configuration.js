// let configuration = {
//   type: "t-shirt",
//   size: "m",
//   color: "#ffffff",
//   print: "tiger",
//   text: "I am a tiger",
//   price: 16,
// };

let configuration = {
  type: "",
  size: "",
  color: "",
  print: {
    text: "", // Text für den Print
    color: "", // Standardfarbe für den Print-Text
    fontSize: 12, // Schriftgröße des Textes
    posY: 0, // Y-Position des Textes
  },
  price: null,
};

// getter setter
export function getConfiguration() {
  return configuration;
}
// Setter: nur geänderte Werte aktualisieren
export function setConfiguration(newConfiguration) {
  configuration = { ...configuration, ...newConfiguration };
}

// cofiguration for sizes
export let sizeMultiplayer = {
  S: 1,
  M: 1.25,
  L: 1.35,
  XL: 1.55,
};

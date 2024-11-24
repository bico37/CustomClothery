let buttons = document.querySelectorAll(".statusbutton");

export function initializeStatusBar() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // updateHighlightedButton(index);
    });
  });
}

export function updateHighlightedButton(index) {
  buttons.forEach((b) => {
    b.classList.remove("active");
  });
  buttons[index].classList.add("active");
}

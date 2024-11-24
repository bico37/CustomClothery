let currentSide = 0;

let buttons = document.querySelectorAll(".statusbutton");
window.onload = function () {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {});
  });
};

console.log(buttons);
updateHightlightedButton(buttons[currentSide]);

function getCurrentSide(button) {
  console.log(button);

  return button;
}

// prev and next button
//give prev&next button event listener
let prevButton = document.getElementById("btn-prev");
let nextButton = document.getElementById("btn-next");
// nextButton.disabled = false;
// prevButton.disabled = false;

prevButton.addEventListener("click", () => {
  buttonClicked("prev");
});
nextButton.addEventListener("click", () => {
  buttonClicked("next");
});
updateButtonsAvaible();

// function - button clicked
function buttonClicked(action) {
  switch (action) {
    case "next":
      nextSide();
      break;
    case "prev":
      prevSide();
      break;
  }
  updateButtonsAvaible();
}
function updateButtonsAvaible() {
  if (currentSide == 0) {
    prevButton.disabled = true;
    nextButton.disabled = false;
  } else if (currentSide == 4) {
    prevButton.disabled = false;
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
    prevButton.disabled = false;
  }
}

// function - change side, change side to next or bevore side
function nextSide() {
  if (currentSide < 4) {
    currentSide++;
  } else {
    currentSide = 0;
  }
  console.log(currentSide);
  update();
}

function prevSide() {
  if (currentSide > 0) {
    currentSide--;
  } else {
    currentSide = 4;
  }
  console.log(currentSide);
  update();
}

// function - update currentpage & statusbar
function update() {
  switch (currentSide) {
    case 0:
      loadPage1();
      break;
    case 1:
      loadPage2();
      break;
    case 2:
      loadPage3();
      break;
    case 3:
      loadPage4();
      break;
    case 4:
      loadPage5();
      break;
  }
  updateStatusBar();
}

// function - update statusbar
function updateStatusBar() {
  updateHightlightedButton(buttons[currentSide]);
}

// function - button click, remove active from all buttons, add active to clicked button
function updateHightlightedButton(button) {
  buttons.forEach((b) => {
    b.classList.remove("active");
  });
  if (currentSide == 0) {
    button = buttons[0];
    button.classList.add("active");
    return;
  }

  button.classList.add("active");
}

// function - loadPage1
function loadPage1() {
  document.getElementById("container").innerHTML = `
    <div id="slide1"><h1>1</h1></div>
    `;
}
// function - loadPage2
function loadPage2() {
  document.getElementById("container").innerHTML = `
    <div id="slide2"><h1>2</h1></div>
    `;
}
// function - loadPage3
function loadPage3() {
  document.getElementById("container").innerHTML = `
    <div id="slide3"><h1>3</h1></div>
    `;
}
// function - loadPage4
function loadPage4() {
  document.getElementById("container").innerHTML = `
    <div id="slide4"><h1>4</h1></div>
    `;
}
// function - loadPage5
function loadPage5() {
  document.getElementById("container").innerHTML = `
    <div id="slide5"><h1>5</h1></div>
    `;
}
// function - loadOrderPage

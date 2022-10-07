import Painter from "./Painter";


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let canDraw = false;

const painter = new Painter(context);
painter.configContextForDrawing();

/* ****** ELEMENTS ****** */

// btn - save
const saveButton = document.querySelector(".save");
saveButton.addEventListener("click", (e) => {
  const image = canvas.toDataURL('image/png');
  const a = document.createElement("a");
  a.href = image;
  a.download = "canvas.png";
  a.click();
  document.body.append(a);
  document.body.removeChild(a);
});

// btn - delete
const deleteButton = document.querySelector(".delete");
deleteButton.addEventListener("click", (e) => { painter.clean() });

const backButton = document.querySelector(".go-back");
backButton.addEventListener("click", (e) => { painter.revert() });

// btn - color picker
const colorPicker = document.querySelector("#color");
colorPicker.addEventListener("change", (e) => {
  painter.currentStrokeStyle = e.target.value;
  painter.drawLines();
});

// btn - stroke
const strokeInput = document.querySelector("#stroke");
strokeInput.addEventListener("change", (e) => {
  painter.currentLineWidth = e.target.value;
  painter.drawLines();
});

/* ****** CANVAS - EVENTS ****** */

canvas.addEventListener('mousedown', ({ clientX, clientY }) => {
  canDraw = true;
  const area = canvas.getBoundingClientRect();
  painter.savePoint(clientX, clientY, false, area);
  painter.drawLines();
});

canvas.addEventListener('mousemove', ({ clientX, clientY }) => {
  if (canDraw) {
    const area = canvas.getBoundingClientRect();
    painter.savePoint(clientX, clientY, true, area);
    painter.drawLines();
  }
});

canvas.addEventListener('mouseup', (e) => { canDraw = false });
canvas.addEventListener('mouseleave', (e) => { canDraw = false });
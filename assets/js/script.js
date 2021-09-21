const dropBtn = document.getElementById("drop-btn");
const slideBtn = document.getElementById("slide-btn");
const dropper = document.querySelector(".bloc-dropper");
const displayCounter = document.querySelector(".bloc-counter");

let count = 1;
let timerHandle = null;
let timerDelay = 1500;
let slideEnabled = false;

function genRandom(range) {
  return Math.floor(Math.random() * range);
}

function dropBox() {
  const width = dropper.offsetWidth;
  const colours = ["var(--c-primary)", "var(--c-secondary)", "var(--c-background)"];
  const colour = colours[genRandom(colours.length)];
  const x = genRandom(width - 50);
  const slide = slideEnabled ? Math.round(genRandom(width - x - 100) / 2) : 0;

  updateCounterText();

  const wrapper = document.createElement("div");
  wrapper.style.setProperty("--slide", slide + "px");
  wrapper.style.setProperty("--start", x + "px");

  const newDiv = document.createElement("div");
  newDiv.classList.add("bloc");
  newDiv.setAttribute("style", `left: ${x}px; background-color: ${colour};`);
  newDiv.textContent = count++;
  dropper.append(wrapper);
  wrapper.append(newDiv);
}

function updateCounterText() {
  displayCounter.textContent = `Blocks dropped: ${count}`;
}

function startTimer() {
  timerHandle = setInterval(() => {
    dropBox();
  }, timerDelay);
}

function stopTimer() {
  clearInterval(timerHandle);
}

function onDropClick() {
  dropBtn.removeEventListener("click", onDropClick);
  dropBtn.classList.remove("btn-primary");
  dropBtn.addEventListener("click", onStopClick);
  dropBtn.classList.add("btn-secondary");
  dropBtn.textContent = "Stop";
  startTimer();
}

function onStopClick() {
  dropBtn.removeEventListener("click", onStopClick);
  dropBtn.classList.remove("btn-secondary");
  dropBtn.addEventListener("click", onDropClick);
  dropBtn.classList.add("btn-primary");
  dropBtn.textContent = "Drop";
  stopTimer();
}

function toggleSlide() {
  slideEnabled = !slideEnabled;
  slideBtn.textContent = slideEnabled ? "Slide [ON]" : "Slide [OFF]";
  slideBtn.class = `btn btn-${slideEnabled ? "primary" : "secondary"}`;
}

dropBtn.addEventListener("click", onDropClick);
slideBtn.addEventListener("click", toggleSlide);

const dropBtn = document.getElementById("drop-btn");
const dropper = document.querySelector(".bloc-dropper");
let count = 1;
function rndm(range) { 
    return Math.floor(Math.random() * range);
}

dropBtn.addEventListener("click", () => {
    const width = dropper.offsetWidth;
    const colours = ["var(--c-primary)", "var(--c-secondary)", "var(--c-background)"];
    const colour = colours[rndm(3)];
    const x = rndm(width - 50);
    const drift = 0//Math.round(rndm(width - x - 100) /2);
    
    const wrapper = document.createElement("div");
    wrapper.style.setProperty("--drift", drift + "px");
    wrapper.style.setProperty("--start", x + "px");
    
    const newDiv = document.createElement("div");
    newDiv.classList.add("bloc");
    newDiv.setAttribute("style", `left: ${x}px; background-color: ${colour};`)
    newDiv.textContent = count++;
    dropper.append(wrapper);
    wrapper.append(newDiv);
});
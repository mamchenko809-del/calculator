const display = document.getElementById("display");
const keys = document.getElementById("keys");

const layout = [
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0",".","=","+",
  "C"
];

function render() {
  layout.forEach(k => {
    const b = document.createElement("button");
    b.textContent = k;
    if ("/-*+".includes(k)) b.classList.add("op");
    if (k === "=") b.classList.add("eq");
    if (k === "C") { b.classList.add("clr"); b.style.gridColumn = "span 4"; }
    b.addEventListener("click", () => onKey(k));
    keys.appendChild(b);
  });
}

function onKey(k) {
  if (k === "C") { display.value = ""; return; }
  if (k === "=") {
    try {
      // безопасный разбор только разрешённых символов
      if (!/^[0-9+\-*/.() ]+$/.test(display.value)) throw new Error("bad");
      // eslint-disable-next-line no-eval
      display.value = String(eval(display.value));
    } catch {
      display.value = "Error";
      setTimeout(() => (display.value = ""), 800);
    }
    return;
  }
  display.value += k;
}

render();

const display = document.getElementById("display");
const keys = document.getElementById("keys");

const layout = [
  "7","8","9","/",
  "4","5","6","*",
  "1","2","3","-",
  "0",".","=","+",
  "%","C"
];

// Add keyboard support
document.addEventListener("keydown", (e) => {
  // Prevent default behavior for keys we're handling
  if(/[0-9+\-*/.=%]|Enter|Escape/.test(e.key)) {
    e.preventDefault();
  }

  let key = null;

  // Map keyboard keys to calculator keys
  if (e.key >= '0' && e.key <= '9') key = e.key;
  else if (e.key === '+') key = '+';
  else if (e.key === '-') key = '-';
  else if (e.key === '*') key = '*';
  else if (e.key === '/') key = '/';
  else if (e.key === '.') key = '.';
  else if (e.key === '=') key = '=';
  else if (e.key === '%') key = '%';
  else if (e.key === 'Enter') key = '=';
  else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') key = 'C';

  if (key) onKey(key);
});

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
  if (k === "%") {
    // Convert the last number in the display to percentage (divide by 100)
    if (display.value) {
      try {
        // Find the last number in the expression, handling operators at the end
        const match = display.value.match(/([0-9.]+)([-+*/]?)$/);
        if (match) {
          const fullMatch = match[0];
          const lastNumber = match[1];
          const lastNumberValue = parseFloat(lastNumber);
          const percentageValue = lastNumberValue / 100;

          // Replace the last number with its percentage value, keeping the operator if present
          let replacement = percentageValue.toString();
          if (match[2]) {
            replacement += match[2];
          }

          display.value = display.value.slice(0, -fullMatch.length) + replacement;
        }
      } catch {
        display.value = "Error";
        setTimeout(() => (display.value = ""), 800);
      }
    }
    return;
  }
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

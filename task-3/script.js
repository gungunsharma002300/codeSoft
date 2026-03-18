let display = document.getElementById("display");
let historyList = document.getElementById("history");

// Load history
window.onload = () => {
  historyList.innerHTML = localStorage.getItem("history") || "";
};

// Append
function append(val) {
  display.value += val;
}

// AC Clear
function allClear() {
  display.value = "";
}

// Delete last
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate
function calculate() {
  try {
    let result = eval(display.value);
    addHistory(display.value + " = " + result);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

// Scientific
function func(type) {
  let val = parseFloat(display.value);
  let result;

  if (type === "sin") result = Math.sin(val);
  if (type === "cos") result = Math.cos(val);
  if (type === "log") result = Math.log10(val);
  if (type === "sqrt") result = Math.sqrt(val);

  addHistory(type + "(" + val + ") = " + result);
  display.value = result;
}

// History
function addHistory(text) {
  historyList.innerHTML += `<li>${text}</li>`;
  localStorage.setItem("history", historyList.innerHTML);
}

function clearHistory() {
  historyList.innerHTML = "";
  localStorage.removeItem("history");
}

// Copy
function copyResult() {
  navigator.clipboard.writeText(display.value);
  alert("Copied!");
}

// Theme
function toggleTheme() {
  document.body.classList.toggle("light");
}

// Voice Input
function startVoice() {
  let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.onstart = () => alert("Speak now...");

  recognition.onresult = (event) => {
    let speech = event.results[0][0].transcript;

    speech = speech
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/into|multiply/g, "*")
      .replace(/divide/g, "/");

    display.value = speech;
    calculate();
  };

  recognition.start();
}
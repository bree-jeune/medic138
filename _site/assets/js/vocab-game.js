const terms = [
  { word: "tachycardia", meaning: "fast heart rate" },
  { word: "bradycardia", meaning: "slow heart rate" },
  { word: "dyspnea", meaning: "difficulty breathing" },
  { word: "hematemesis", meaning: "vomiting blood" },
  { word: "hematuria", meaning: "blood in urine" }
];

function randomTerm() {
  return terms[Math.floor(Math.random() * terms.length)];
}

function render() {
  const t = randomTerm();
  document.getElementById("vocab-game").innerHTML = `
    <h2>${t.word}</h2>
    <input id="answer" placeholder="Meaning?">
    <button onclick="check('${t.meaning}')">Check</button>
    <p id="result"></p>
  `;
}

function check(meaning) {
  const user = document.getElementById("answer").value.toLowerCase();
  const result = document.getElementById("result");

  result.innerText = user.includes(meaning.split(" ")[0]) ? 
    "Correct!" : 
    `Nope — it means: ${meaning}`;
}

render();

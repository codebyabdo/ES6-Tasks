// Self-invoking function With sum & alert

const sumBtn = document.getElementById("sum");

sumBtn.addEventListener("click", function () {
  const num1 = document.getElementById("num1").value;
  const num2 = document.getElementById("num2").value;
  let sum = parseFloat(num1) + parseFloat(num2);
  !num1 || !num2 || alert(`Summing = ${sum}`);
});

// ✅ Student class
class Student {
  constructor(name, university, faculty, grade) {
    this.name = name;
    this.university = university;
    this.faculty = faculty;
    this.grade = grade;
  }

  getInfo() {
    return `${this.name} is a student in Faculty of ${this.faculty} at ${this.university}.`;
  }
}

const student = new Student(
  "Abd El-Rahman",
  "Fayoum University",
  "Engineering",
  89
);

document.getElementById("student-info").textContent = student.getInfo();
// ✅ Tip generator
function* tipsGenerator() {
  const tips = [
    "Use semantic HTML.",
    "Write clean code.",
    "Comment wisely.",
    "Use version control.",
    "Test your app.",
    "Learn ES6 features.",
    "Mobile-first design.",
    "Avoid inline styles.",
    "Optimize images.",
    "Use browser dev tools.",
  ];
  let i = 0;
  while (true) {
    yield tips[i % tips.length];
    i++;
  }
}

let tipsGen = tipsGenerator(); // move declaration up so it can be reset
const tipsContainer = document.getElementById("tips-container");

// Button 1: show all tips
const showTipsBtn = document.getElementById("show-tips");
showTipsBtn.addEventListener("click", () => {
  tipsContainer.innerHTML = ""; // optional: clear old tips
  let i = 0;
  for (const tip of tipsGenerator()) {
    const tipEl = document.createElement("p");
    tipEl.textContent = tip;
    tipsContainer.appendChild(tipEl);
    i++;
    if (i >= 10) break;
  }
});

// Button 2: display tips every 3 seconds
const startTipsBtn = document.getElementById("start-tips");
const stopTipsBtn = document.getElementById("stop-tips");

let interval = null; // move interval here to share across handlers

startTipsBtn.addEventListener("click", () => {
  // avoid creating multiple intervals
  if (interval) return;

  interval = setInterval(() => {
    const tip = tipsGen.next();
    if (!tip.done) {
      const tipEl = document.createElement("p");
      tipEl.textContent = tip.value;
      tipsContainer.appendChild(tipEl);
    } else {
      clearInterval(interval);
      interval = null;
    }
  }, 3000);
});

stopTipsBtn.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }

  if (typeof tipsGen.return === "function") {
    tipsGen.return(); // properly closes generator
  }

  // Reset generator so tips can be started again if needed
  tipsGen = tipsGenerator();
});

// Loops Visualizer

const output = document.getElementById("output");

const clearOutput = () => {
  output.innerHTML = "";
};

const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const runLoop = async (type) => {
  clearOutput();
  const input = document.getElementById("arrayInput").value;
  const arr = input.split(" ").map((str) => str.trim());

  !arr.length || (arr.length === 1 && arr[0] === "")
    ? (output.innerHTML = "<p>Please enter a valid array.</p>")
    : "";

  if (type === "for") {
    for (let i = 0; i < arr.length; i++) {
      await showLine(i, arr[i]);
    }
  }
  if (type === "forIn") {
    for (const i in arr) {
      await showLine(i, arr[i]);
    }
  }
  if (type === "forOf") {
    for (const val of arr) {
      await showLine("-", val);
    }
  }
  if (type === "forEach") {
    arr.forEach(async (val, i) => await showLine(i, val));
  }
  if (type === "while") {
    let i = 0;
    while (i < arr.length) {
      await showLine(i, arr[i]);
      i++;
    }
  }
};

const showLine = async (index, value) => {
  const line = document.createElement("div");
  line.className = "line";
  line.innerHTML = `<span class="index">[${index}]</span> <i class="fa-solid fa-forward"></i> <span class="value">${value}</span>`;
  output.appendChild(line);
  await delay(500);
};

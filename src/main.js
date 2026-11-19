const scoreEl = document.querySelector("#score");
const timeEl = document.querySelector("#time");
const accuracyEl = document.querySelector("#accuracy");
const startBtn = document.querySelector("#start");
const target = document.querySelector("#target");
const arena = document.querySelector("#arena");
const message = document.querySelector("#message");

let score = 0;
let shots = 0;
let hits = 0;
let time = 30;
let playing = false;
let timer = null;

function updateStats() {
  scoreEl.textContent = score;
  timeEl.textContent = time;
  accuracyEl.textContent =
    shots ? Math.round((hits / shots) * 100) + "%" : "0%";
}

function moveTarget() {
  const maxX = arena.clientWidth - target.offsetWidth;
  const maxY = arena.clientHeight - target.offsetHeight;

  target.style.left = Math.random() * Math.max(0, maxX) + "px";
  target.style.top = Math.random() * Math.max(0, maxY) + "px";
}

function finish() {
  playing = false;
  clearInterval(timer);
  target.style.display = "none";
  message.style.display = "grid";
  message.textContent = `TREINO FINALIZADO — ${score} PONTOS`;
  startBtn.textContent = "JOGAR NOVAMENTE";
}

function startGame() {
  clearInterval(timer);
  score = 0;
  shots = 0;
  hits = 0;
  time = 30;
  playing = true;

  updateStats();
  message.style.display = "none";
  target.style.display = "block";
  startBtn.textContent = "TREINO EM ANDAMENTO";

  moveTarget();

  timer = setInterval(() => {
    time--;
    updateStats();
    if (time <= 0) finish();
  }, 1000);
}

startBtn.addEventListener("click", () => {
  if (!playing) startGame();
});

target.addEventListener("pointerdown", (event) => {
  if (!playing) return;
  event.preventDefault();

  shots++;
  hits++;
  score += 10;

  updateStats();
  moveTarget();
});

arena.addEventListener("pointerdown", (event) => {
  if (!playing || event.target === target) return;
  shots++;
  updateStats();
});

window.addEventListener("resize", () => {
  if (playing) moveTarget();
});

updateStats();

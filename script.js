const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const hint = document.getElementById("hint");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");

const audio = document.getElementById("audio");

function confettiBurst() {
  const count = 140;
  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-10px";
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.animationDuration = 1.8 + Math.random() * 1.2 + "s";
    piece.style.opacity = 0.6 + Math.random() * 0.4;
    piece.style.width = 6 + Math.random() * 8 + "px";
    piece.style.height = 8 + Math.random() * 14 + "px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

(function injectConfettiCSS(){
  const style = document.createElement("style");
  style.textContent = `
    .confetti{
      position: fixed;
      z-index: 9999;
      background: white;
      border-radius: 3px;
      pointer-events:none;
      animation: fall linear forwards;
    }
    @keyframes fall{
      to{
        transform: translateY(110vh) rotate(720deg);
      }
    }
  `;
  document.head.appendChild(style);
})();

// Start music (requires a user click)
startBtn.addEventListener("click", async () => {
  try {
    audio.volume = 0.9;
    await audio.play();
    hint.textContent = "Music playing ✅";
    startBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
  } catch (e) {
    hint.textContent = "Your browser blocked it — tap again or check the MP3 file name.";
  }
});

pauseBtn.addEventListener("click", () => {
  audio.pause();
  hint.textContent = "Paused ⏸";
  pauseBtn.style.display = "none";
  startBtn.style.display = "inline-block";
});

// Valentine buttons
yesBtn.addEventListener("click", () => {
  confettiBurst();
  result.innerHTML = `
    <div>
      <div style="font-size:18px; font-weight:800; margin-bottom:6px;">Yessss! 💖</div>
      <div style="color:#cfcfe6cc;">
        Okay, it’s official. You’re my Valentine.  
        Screenshot this and send it to me 😌📸
      </div>
    </div>
  `;
});

function moveNoButton() {
  const pad = 12;
  const rect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width - pad;
  const maxY = window.innerHeight - rect.height - pad;

  const x = Math.max(pad, Math.random() * maxX);
  const y = Math.max(pad, Math.random() * maxY);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", () => {
  moveNoButton();
  result.textContent = "Nice try 😭";
});


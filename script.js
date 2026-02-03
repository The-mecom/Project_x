const startBtn = document.getElementById("startBtn");
const hint = document.getElementById("hint");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");

// If you use OPTION B (local audio), uncomment these lines:
// const audio = document.getElementById("audio");

function confettiBurst() {
  // lightweight, no-library confetti
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

startBtn.addEventListener("click", async () => {
  hint.textContent = "Music enabled ✅";

  // OPTION A: Spotify embed can't be programmatically forced to play reliably.
  // The click still helps the user; they can press play in the embed.

  // OPTION B: Local audio (only if you legally have the file)
  // try {
  //   await audio.play();
  //   hint.textContent = "Music playing ✅";
  // } catch (e) {
  //   hint.textContent = "Tap again — your browser blocked autoplay.";
  // }
});

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

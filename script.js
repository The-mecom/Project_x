let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide-card');
const indicators = document.querySelectorAll('.indicator');
const slideshow = document.getElementById('slideshow');
const mainCard = document.getElementById('mainCard');
const totalSlides = slides.length;

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const hint = document.getElementById("hint");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const audio = document.getElementById("audio");

// NEW: overlay elements
const startOverlay = document.getElementById("startOverlay");
const beginBtn = document.getElementById("beginBtn");

let musicStarted = false;

// Apply background images to slides from data-image
slides.forEach(slide => {
  const img = slide.getAttribute("data-image");
  if (img) slide.style.backgroundImage = `url('${img}')`;
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  indicators.forEach((indicator, i) => {
    indicator.classList.toggle('active', i === index);
  });

  currentSlideIndex = index;
}

function nextSlide() {
  if (currentSlideIndex < totalSlides - 1) {
    showSlide(currentSlideIndex + 1);
  } else {
    endSlideshow();
  }
}

function endSlideshow() {
  slideshow.style.display = 'none';
  mainCard.style.display = 'block';
}

async function startMusic() {
  if (musicStarted) return;
  try {
    audio.volume = 0.7;
    await audio.play();
    musicStarted = true;
    hint.textContent = "Music playing ✅";
    startBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
  } catch (e) {
    hint.textContent = "Tap to start the music";
    startBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
    musicStarted = false;
  }
}

/* BEGIN overlay click: starts music + closes overlay */
beginBtn.addEventListener("click", async () => {
  await startMusic();
  startOverlay.style.display = "none";
  showSlide(0);
});

/* slideshow clicks advance (music already started from Begin) */
slideshow.addEventListener('click', nextSlide);

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', (e) => {
    e.stopPropagation();
    showSlide(index);
  });
});

document.addEventListener('keydown', (e) => {
  if (slideshow.style.display !== 'none') {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' && currentSlideIndex > 0) {
      e.preventDefault();
      showSlide(currentSlideIndex - 1);
    }
  }
});

// Confetti
function confettiBurst() {
  const count = 140;
  const colors = ['#ff4d87', '#ff7ab0', '#ffd1e1', '#ffffff', '#f093fb', '#4facfe'];

  for (let i = 0; i < count; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.top = "-10px";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    piece.style.animationDuration = 1.8 + Math.random() * 1.2 + "s";
    piece.style.opacity = 0.6 + Math.random() * 0.4;
    piece.style.width = 6 + Math.random() * 8 + "px";
    piece.style.height = 8 + Math.random() * 14 + "px";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3500);
  }
}

// Manual music controls (backup)
startBtn.addEventListener("click", startMusic);

pauseBtn.addEventListener("click", () => {
  audio.pause();
  hint.textContent = "Paused ⏸";
  pauseBtn.style.display = "none";
  startBtn.style.display = "inline-block";
  musicStarted = false;
});

yesBtn.addEventListener("click", () => {
  confettiBurst();
  result.innerHTML = `
    <div>
      <div style="font-size:18px; font-weight:800; margin-bottom:6px;">Yessss! 💖</div>
      <div style="color:#cfcfe6cc;">
        Okay, it's official. You're my Valentine.
        Screenshot this and send it to me 😌📸
      </div>
    </div>
  `;
});

// NO button: dodges hover + moves on click + shrinks
let noCount = 0;
const funny = [
  "Eiii 😭 you tried it.",
  "Not this one 😂",
  "Oya press YES abeg 😌",
  "NO is under maintenance 🧰",
  "Network error: NO not found 📡",
  "Stop fighting destiny 😭💘",
  "You’re persistent o 😂",
  "Okay you win… SIKE 😭"
];

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

function shrinkNoButton() {
  const currentScale = parseFloat(noBtn.dataset.scale || '1');
  const newScale = Math.max(currentScale * 0.88, 0.25);
  noBtn.dataset.scale = newScale;
  noBtn.style.transform = `scale(${newScale})`;
}

// dodges when cursor comes close
noBtn.addEventListener("mouseenter", moveNoButton);

noBtn.addEventListener("click", () => {
  noCount++;
  moveNoButton();
  shrinkNoButton();
  result.textContent = funny[Math.min(noCount - 1, funny.length - 1)];
});

// init
showSlide(0);

// Slideshow variables
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide-card');
const indicators = document.querySelectorAll('.indicator');
const slideshow = document.getElementById('slideshow');
const mainCard = document.getElementById('mainCard');
const totalSlides = slides.length;

// Audio and button elements
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const hint = document.getElementById("hint");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const audio = document.getElementById("audio");

// Slideshow navigation
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
  
  indicators.forEach((indicator, i) => {
    indicator.classList.remove('active');
    if (i === index) {
      indicator.classList.add('active');
    }
  });
  
  currentSlideIndex = index;
}

function nextSlide() {
  if (currentSlideIndex < totalSlides - 1) {
    showSlide(currentSlideIndex + 1);
  } else {
    // End of slideshow - show main card
    endSlideshow();
  }
}

function endSlideshow() {
  slideshow.style.display = 'none';
  mainCard.style.display = 'block';
  
  // Auto-start music when main card appears
  startMusicAutomatically();
}

async function startMusicAutomatically() {
  try {
    audio.volume = 0.7;
    await audio.play();
    hint.textContent = "Music playing ✅";
    startBtn.style.display = "none";
    pauseBtn.style.display = "inline-block";
  } catch (e) {
    // If auto-play fails, show manual start button
    hint.textContent = "Tap to start the music";
    startBtn.style.display = "inline-block";
    pauseBtn.style.display = "none";
  }
}

// Click anywhere on slideshow to advance
slideshow.addEventListener('click', nextSlide);

// Click indicators to jump to specific slide
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent triggering the slideshow click
    showSlide(index);
  });
});

// Keyboard navigation for slideshow
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

// Confetti burst function
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

// Manual music controls
startBtn.addEventListener("click", async () => {
  try {
    audio.volume = 0.7;
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
        Okay, it's official. You're my Valentine.  
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
  
  // Shrink the button each time
  const currentScale = parseFloat(noBtn.dataset.scale || '1');
  const newScale = Math.max(currentScale * 0.85, 0.3);
  noBtn.dataset.scale = newScale;
  noBtn.style.transform = `scale(${newScale})`;
  
  // Change button text occasionally
  const noTexts = ['No 😶', 'Nope 😅', 'Nah 😬', 'No way 😳', 'Never 😨', 'Maybe? 🤔', 'Wait... 😰', 'Hmm... 🤨'];
  noBtn.textContent = noTexts[Math.floor(Math.random() * noTexts.length)];
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", () => {
  moveNoButton();
  result.textContent = "Nice try 😭";
});

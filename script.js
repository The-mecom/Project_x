document.addEventListener("DOMContentLoaded", () => {
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll(".slide-card");
  const indicators = document.querySelectorAll(".indicator");
  const slideshow = document.getElementById("slideshow");
  const mainCard = document.getElementById("mainCard");

  const startOverlay = document.getElementById("startOverlay");
  const beginBtn = document.getElementById("beginBtn");

  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const hint = document.getElementById("hint");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const result = document.getElementById("result");
  const audio = document.getElementById("audio");

  if (!beginBtn) {
    console.log("Begin button not found. Check id='beginBtn' in HTML.");
    return;
  }

  const totalSlides = slides.length;
  let musicStarted = false;

  // Apply background images from data-image
  slides.forEach(slide => {
    const img = slide.getAttribute("data-image");
    if (img) slide.style.backgroundImage = `url('${img}')`;
  });

  function showSlide(index) {
    slides.forEach((slide, i) => slide.classList.toggle("active", i === index));
    indicators.forEach((dot, i) => dot.classList.toggle("active", i === index));
    currentSlideIndex = index;
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      showSlide(currentSlideIndex + 1);
    } else {
      slideshow.style.display = "none";
      mainCard.style.display = "block";
    }
  }

  async function startMusic() {
    if (musicStarted) return;
    try {
      audio.volume = 0.7;
      await audio.play();
      musicStarted = true;

      if (hint) hint.textContent = "Music playing ✅";
      if (startBtn) startBtn.style.display = "none";
      if (pauseBtn) pauseBtn.style.display = "inline-block";
    } catch (e) {
      musicStarted = false;
      if (hint) hint.textContent = "Tap Play";
      if (startBtn) startBtn.style.display = "inline-block";
      if (pauseBtn) pauseBtn.style.display = "none";
    }
  }

  // Make overlay click ONLY start (and not pass through)
 document.body.classList.add("overlay-open");

const startOverlay = document.getElementById("startOverlay");
const beginBtn = document.getElementById("beginBtn");

async function handleBegin(e){
  e.preventDefault();
  e.stopPropagation();

  // Try start audio (this user gesture allows play on mobile)
  try {
    audio.volume = 0.7;
    await audio.play();
    hint.textContent = "Music playing ✅";
  } catch (err) {
    hint.textContent = "Tap again (browser blocked it)";
  }

  // Close overlay + allow interactions
  document.body.classList.remove("overlay-open");
  startOverlay.style.display = "none";
}

// Use pointerup for best mobile support
beginBtn.addEventListener("pointerup", handleBegin);
beginBtn.addEventListener("click", handleBegin); // fallback

// Stop overlay clicks from leaking to slideshow
startOverlay.addEventListener("click", (e) => e.stopPropagation());

 
  // Slideshow click to advance
  slideshow.addEventListener("click", nextSlide);

  // indicator click
  indicators.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(idx);
    });
  });

  // confetti
  function confettiBurst() {
    const count = 140;
    const colors = ["#ff4d87", "#ff7ab0", "#ffd1e1", "#ffffff", "#f093fb", "#4facfe"];
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

  // Music controls
  if (startBtn) {
    startBtn.addEventListener("click", async () => {
      musicStarted = false;
      await startMusic();
    });
  }

  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      audio.pause();
      musicStarted = false;
      if (hint) hint.textContent = "Paused ⏸";
      pauseBtn.style.display = "none";
      if (startBtn) startBtn.style.display = "inline-block";
    });
  }

  // YES
  if (yesBtn) {
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
  }

  // NO (dodge + shrink + funny responses)
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
    const currentScale = parseFloat(noBtn.dataset.scale || "1");
    const newScale = Math.max(currentScale * 0.88, 0.25);
    noBtn.dataset.scale = newScale;
    noBtn.style.transform = `scale(${newScale})`;
  }

  if (noBtn) {
    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("click", () => {
      noCount++;
      moveNoButton();
      shrinkNoButton();
      if (result) result.textContent = funny[Math.min(noCount - 1, funny.length - 1)];
    });
  }

  // Init
  showSlide(0);
});

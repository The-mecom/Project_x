// Wait for everything to load
window.addEventListener('load', function() {
  console.log("Page loaded!");
  
  const beginBtn = document.getElementById("beginBtn");
  const startOverlay = document.getElementById("startOverlay");
  const slideshow = document.getElementById("slideshow");
  const mainCard = document.getElementById("mainCard");
  const audio = document.getElementById("audio");
  const hint = document.getElementById("hint");
  
  console.log("Begin button found:", !!beginBtn);
  
  // THE MOST IMPORTANT PART - Simple click handler for Begin button
  if (beginBtn) {
    beginBtn.onclick = function() {
      console.log("Begin button clicked!");
      
      // Hide overlay
      startOverlay.style.display = "none";
      
      // Show slideshow
      slideshow.style.display = "block";
      
      // Try to start audio
      audio.volume = 0.7;
      audio.play().catch(function(err) {
        console.log("Audio blocked by browser:", err);
        hint.textContent = "Click Play to start music";
      });
    };
  }
  
  // Rest of the slideshow code
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll(".slide-card");
  const indicators = document.querySelectorAll(".indicator");
  const totalSlides = slides.length;

  // Apply background images from data-image attributes
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

  // Slideshow click to advance
  slideshow.addEventListener("click", nextSlide);

  // Indicator clicks to jump to specific slide
  indicators.forEach((dot, idx) => {
    dot.addEventListener("click", (e) => {
      e.stopPropagation();
      showSlide(idx);
    });
  });

  // Confetti animation function
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

  // YES button - with confetti!
  const yesBtn = document.getElementById("yesBtn");
  const result = document.getElementById("result");
  
  if (yesBtn) {
    yesBtn.onclick = function() {
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
    };
  }

  // NO button - dodge and shrink with funny messages
  const noBtn = document.getElementById("noBtn");
  let noCount = 0;
  const funny = [
    "Eiii 😭 you tried it.",
    "Not this one 😂",
    "Oya press YES abeg 😌",
    "NO is under maintenance 🧰",
    "Network error: NO not found 📡",
    "Stop fighting destiny 😭💘",
    "You're persistent o 😂",
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
    noBtn.onclick = function() {
      noCount++;
      moveNoButton();
      shrinkNoButton();
      if (result) result.textContent = funny[Math.min(noCount - 1, funny.length - 1)];
    };
  }

  // Music controls
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");

  if (startBtn) {
    startBtn.onclick = function() {
      audio.play();
      hint.textContent = "Music playing ✅";
      startBtn.style.display = "none";
      pauseBtn.style.display = "inline-block";
    };
  }

  if (pauseBtn) {
    pauseBtn.onclick = function() {
      audio.pause();
      hint.textContent = "Paused ⏸";
      pauseBtn.style.display = "none";
      startBtn.style.display = "inline-block";
    };
  }

  // Initialize first slide
  showSlide(0);
});

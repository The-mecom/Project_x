// Wait for full page load
window.addEventListener('load', function() {
  console.log("✅ Page loaded successfully");
  
  // Get all elements
  const beginBtn = document.getElementById("beginBtn");
  const startOverlay = document.getElementById("startOverlay");
  const slideshow = document.getElementById("slideshow");
  const mainCard = document.getElementById("mainCard");
  const audio = document.getElementById("audio");
  const hint = document.getElementById("hint");
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const result = document.getElementById("result");
  
  const slides = document.querySelectorAll(".slide-card");
  const indicators = document.querySelectorAll(".indicator");
  
  // State
  let currentSlideIndex = 0;
  let musicPlaying = false;
  const totalSlides = slides.length;
  
  console.log(`Found ${totalSlides} slides`);
  
  // Initialize - Hide slideshow and main card
  slideshow.classList.add('hidden');
  mainCard.classList.add('hidden');
  
  // Apply background images
  slides.forEach((slide, index) => {
    const img = slide.getAttribute("data-image");
    if (img) {
      slide.style.backgroundImage = `url('${img}')`;
      console.log(`Slide ${index + 1} background set to: ${img}`);
    }
  });
  
  // ===== BEGIN BUTTON =====
  if (beginBtn) {
    beginBtn.onclick = function(e) {
      e.preventDefault();
      console.log("🎬 Begin button clicked!");
      
      // Hide overlay
      startOverlay.classList.add('hidden');
      
      // Show slideshow
      slideshow.classList.remove('hidden');
      
      // Try to play audio
      if (audio) {
        audio.volume = 0.7;
        audio.play()
          .then(() => {
            console.log("🎵 Audio started playing");
            musicPlaying = true;
            hint.textContent = "Music playing ✅";
            if (startBtn) startBtn.style.display = "none";
            if (pauseBtn) pauseBtn.style.display = "inline-block";
          })
          .catch(err => {
            console.log("⚠️ Audio autoplay blocked:", err.message);
            hint.textContent = "Click Play to start music";
            if (startBtn) startBtn.style.display = "inline-block";
          });
      }
    };
  }
  
  // ===== SLIDESHOW FUNCTIONS =====
  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    console.log(`Showing slide ${index + 1}`);
    
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
    
    indicators.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
    
    currentSlideIndex = index;
  }
  
  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      showSlide(currentSlideIndex + 1);
    } else {
      // End of slideshow - show main card
      console.log("📝 Showing main Valentine card");
      slideshow.classList.add('hidden');
      mainCard.classList.remove('hidden');
    }
  }
  
  // Click on slideshow to advance
  if (slideshow) {
    slideshow.addEventListener("click", function(e) {
      // Don't advance if clicking on indicators
      if (e.target.classList.contains('indicator')) return;
      nextSlide();
    });
  }
  
  // Click indicators to jump to specific slide
  indicators.forEach((dot, idx) => {
    dot.addEventListener("click", function(e) {
      e.stopPropagation();
      showSlide(idx);
    });
  });
  
  // ===== MUSIC CONTROLS =====
  if (startBtn) {
    startBtn.onclick = function() {
      console.log("▶️ Play button clicked");
      if (audio) {
        audio.play()
          .then(() => {
            musicPlaying = true;
            hint.textContent = "Music playing ✅";
            startBtn.style.display = "none";
            if (pauseBtn) pauseBtn.style.display = "inline-block";
          })
          .catch(err => {
            console.log("Error playing audio:", err);
            hint.textContent = "Error playing music";
          });
      }
    };
  }
  
  if (pauseBtn) {
    pauseBtn.onclick = function() {
      console.log("⏸️ Pause button clicked");
      if (audio) {
        audio.pause();
        musicPlaying = false;
        hint.textContent = "Paused ⏸";
        pauseBtn.style.display = "none";
        if (startBtn) startBtn.style.display = "inline-block";
      }
    };
  }
  
  // ===== CONFETTI FUNCTION =====
  function confettiBurst() {
    console.log("🎉 Confetti burst!");
    const count = 150;
    const colors = ["#ff4d87", "#ff7ab0", "#ffd1e1", "#ffffff", "#f093fb", "#4facfe"];
    
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.top = "-10px";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.transform = `rotate(${Math.random() * 360}deg)`;
      piece.style.animationDuration = (1.8 + Math.random() * 1.2) + "s";
      piece.style.opacity = (0.6 + Math.random() * 0.4).toString();
      piece.style.width = (6 + Math.random() * 8) + "px";
      piece.style.height = (8 + Math.random() * 14) + "px";
      
      document.body.appendChild(piece);
      
      setTimeout(() => {
        piece.remove();
      }, 3500);
    }
  }
  
  // ===== YES BUTTON =====
  if (yesBtn) {
    yesBtn.onclick = function() {
      console.log("💖 YES button clicked!");
      confettiBurst();
      
      if (result) {
        result.innerHTML = `
          <div>
            <div style="font-size:18px; font-weight:800; margin-bottom:6px;">Yessss! 💖</div>
            <div style="color:#cfcfe6cc;">
              Okay, it's official. You're my Valentine.
              Screenshot this and send it to me 😌📸
            </div>
          </div>
        `;
      }
    };
  }
  
  // ===== NO BUTTON (DODGE & SHRINK) =====
  let noCount = 0;
  const funnyMessages = [
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
    if (!noBtn) return;
    
    const padding = 20;
    const rect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - rect.width - padding;
    const maxY = window.innerHeight - rect.height - padding;
    
    const x = Math.max(padding, Math.random() * maxX);
    const y = Math.max(padding, Math.random() * maxY);
    
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }
  
  function shrinkNoButton() {
    if (!noBtn) return;
    
    const currentScale = parseFloat(noBtn.dataset.scale || "1");
    const newScale = Math.max(currentScale * 0.88, 0.3);
    noBtn.dataset.scale = newScale.toString();
    noBtn.style.transform = `scale(${newScale})`;
  }
  
  if (noBtn) {
    // Move on hover
    noBtn.addEventListener("mouseenter", function() {
      moveNoButton();
    });
    
    // Move and shrink on click
    noBtn.onclick = function() {
      console.log("❌ NO button clicked (attempt " + (noCount + 1) + ")");
      noCount++;
      moveNoButton();
      shrinkNoButton();
      
      if (result) {
        const messageIndex = Math.min(noCount - 1, funnyMessages.length - 1);
        result.textContent = funnyMessages[messageIndex];
      }
    };
  }
  
  // ===== INITIALIZE =====
  showSlide(0);
  console.log("✅ All event listeners attached");
});

window.addEventListener('load', function() {
  const beginBtn = document.getElementById("beginBtn");
  const startOverlay = document.getElementById("startOverlay");
  const slideshow = document.getElementById("slideshow");
  const mainCard = document.getElementById("mainCard");
  const audio = document.getElementById("audio");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const result = document.getElementById("result");
  const slides = document.querySelectorAll(".slide-card");
  const indicators = document.querySelectorAll(".indicator");
  
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  
  slideshow.classList.add('hidden');
  mainCard.style.display = 'none';
  
  slides.forEach((slide) => {
    const img = slide.getAttribute("data-image");
    if (img) slide.style.backgroundImage = `url('${img}')`;
  });

  // Fixed Music Trigger
  if (beginBtn) {
    beginBtn.onclick = function(e) {
      e.preventDefault();
      startOverlay.classList.add('hidden');
      slideshow.classList.remove('hidden');
      
      if (audio) {
        audio.volume = 0.6;
        // Playing here works because the user just clicked a button
        audio.play().catch(err => console.log("Audio waiting for more interaction"));
      }
    };
  }

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    indicators.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    currentSlideIndex = index;
  }

  function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
      showSlide(currentSlideIndex + 1);
    } else {
      slideshow.classList.add('hidden');
      mainCard.classList.add('show');
      mainCard.style.display = 'block';
    }
  }

  if (slideshow) {
    slideshow.addEventListener("click", (e) => {
      if (!e.target.classList.contains('indicator')) nextSlide();
    });
  }

  if (yesBtn) {
    yesBtn.onclick = function() {
      confettiBurst();
      result.innerHTML = `
        <div>
          <div style="font-size:18px; font-weight:800; margin-bottom:6px;">Yessss! 💖</div>
          <div style="color:#cfcfe6cc;">Okay, it's official. You're my Valentine. Screenshot this and send it to me 😌📸</div>
        </div>
      `;
    };
  }

  // No Button Logic (Dodge)
  if (noBtn) {
    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.onclick = function() {
      moveNoButton();
      if (result) result.textContent = "Nice try! 😂";
    };
  }

  function moveNoButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 20);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 20);
    noBtn.style.position = "fixed";
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }

  showSlide(0);
});

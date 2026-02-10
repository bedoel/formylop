const gameArea = document.getElementById("game-area");
const scoreElement = document.getElementById("score");
const progressBar = document.querySelector(".progress");
let score = 0;
let heartInterval;

function spawnHeart() {
  if (score >= 10) return;

  const item = document.createElement("div");

  // 25% bom
  const isBomb = Math.random() < 0.3;

  item.className = isBomb ? "bomb" : "heart";
  item.textContent = isBomb ? "🥬" : "🐰";

  item.style.left = Math.random() * 90 + "vw";
  item.style.fontSize = "32px";

  item.addEventListener("click", () => {
    if (isBomb) {
      score = Math.max(0, score - 1);
      item.textContent = "💥";
    } else {
      score++;
    }

    scoreElement.textContent = score;
    progressBar.style.width = `${(score / 10) * 100}%`;

    item.remove();

    if (score === 10) {
      menang();
    }
  });

  gameArea.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, 4000);
}

function menang() {
  clearInterval(heartInterval);

  let countdown = 5;
  const countdownMessage = document.createElement("div");
  countdownMessage.style.position = "fixed";
  countdownMessage.style.top = "50%";
  countdownMessage.style.left = "50%";
  countdownMessage.style.transform = "translate(-50%, -50%)";
  countdownMessage.style.fontSize = "24px";
  countdownMessage.style.color = "#ff0066";
  countdownMessage.style.fontWeight = "bold";
  countdownMessage.style.textAlign = "center";
  countdownMessage.style.zIndex = "999";

  document.body.appendChild(countdownMessage);

  const countdownInterval = setInterval(() => {
    countdownMessage.innerHTML = `
      Yayy, Selamat Sayangg! ❤️🎉 <br/>
      Kamu akan dipindahkan ke halaman selanjutnya dalam <b>${countdown}</b> detik...
    `;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      window.location.href = "akhir.html";
    }
  }, 1000);
}

heartInterval = setInterval(spawnHeart, 1000);

// Particles in the background
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 8 + 2,
    speedY: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.8 + 0.2,
  };
}

for (let i = 0; i < 50; i++) {
  particles.push(createParticle());
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let particle of particles) {
    ctx.fillStyle = `rgba(255, 0, 100, ${particle.opacity})`;
    ctx.font = `${particle.size}px Arial`;
    ctx.fillText("❤️", particle.x, particle.y);
    particle.y -= particle.speedY;

    if (particle.y < -10) {
      particle.y = canvas.height;
      particle.x = Math.random() * canvas.width;
    }
  }

  requestAnimationFrame(drawParticles);
}

drawParticles();

// Add this code to script2.js (game page)
function initializeAudio() {
  const musica = document.getElementById("musica");

  // Retrieve the saved playback time
  const savedTime = localStorage.getItem("audioTime");
  if (savedTime) {
    musica.currentTime = parseFloat(savedTime);
  }

  // Save the playback time periodically
  setInterval(() => {
    localStorage.setItem("audioTime", musica.currentTime);
  }, 1000);

  // Handle the end of the song
  musica.addEventListener("ended", function () {
    musica.currentTime = 0;
    musica.play();
  });

  // Attempt to play
  document.addEventListener(
    "click",
    function () {
      musica.play().catch(function (error) {
        console.log("Error playing audio:", error);
      });
    },
    { once: true },
  );

  musica.play().catch(function (error) {
    console.log("Autoplay blocked:", error);
  });
}

document.addEventListener("DOMContentLoaded", initializeAudio);

// Before the page closes or the user navigates away
window.addEventListener("beforeunload", function () {
  const musica = document.getElementById("musica");
  localStorage.setItem("audioTime", musica.currentTime);
});

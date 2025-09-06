const canvas = document.querySelector('.blob-canvas');
const ctx = canvas.getContext('2d');

let time = 0;
let blobs = []; // Define before calling resizeCanvas()

// Define colors with theme and transparency
const themeColors = [
   'rgba(0, 58, 204, 0.3)',
   'rgba(79, 70, 229, 0.3)',
   'rgba(59, 130, 246, 0.3)',
   'rgba(0, 174, 239, 0.3)',
   'rgba(230, 236, 245, 0.35)',
   'rgba(208, 215, 226, 0.25)'
];

// Resize canvas to match display size
function resizeCanvas() {
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;
   generateBlobs(); // Refresh blobs on resize
}

// Generate dynamic blobs
function generateBlobs() {
   blobs = [];
   const count = Math.floor(canvas.width / 150);
   for (let i = 0; i < count; i++) {
      blobs.push({
         x: Math.random() * canvas.width,
         y: Math.random() * canvas.height,
         baseRadius: 80 + Math.random() * 70,
         color: themeColors[i % themeColors.length],
         freq: 0.15 + Math.random() * 0.2,
         amp: 10 + Math.random() * 20,
         phase: Math.random() * Math.PI * 2
      });
   }
}

// Draw individual blob
function drawBlob(blob, t) {
   const points = 120; // More points for smoother curve
   const pulse = Math.sin(t + blob.phase) * 2; // Smaller pulse
   ctx.beginPath();
   for (let i = 0; i <= points; i++) {
      const angle = (Math.PI * 2 / points) * i;
      const offset = Math.sin(angle * blob.freq + t + blob.phase) * blob.amp;
      const r = blob.baseRadius + offset + pulse;
      const x = blob.x + Math.cos(angle) * r;
      const y = blob.y + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
   }
   ctx.closePath();
   ctx.fillStyle = blob.color;
   ctx.fill();
}

// Animation loop
function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.globalCompositeOperation = 'lighter';
   blobs.forEach(blob => drawBlob(blob, time));
   time += 0.01;
   requestAnimationFrame(animate);
}

// Initialize
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Safe now that `blobs` is defined
animate();




/*
const canvas = document.querySelector('.blob-canvas');
const ctx = canvas.getContext('2d');

let time = 0;
let balls = [];

const themeColors = [
   'rgba(0, 58, 204, 1)',
   'rgba(79, 70, 229, 1)',
   'rgba(59, 130, 246, 1)',
   'rgba(0, 174, 239, 1)',
   'rgba(230, 236, 245, 1)',
   'rgba(208, 215, 226, 1)'
];

// Resize canvas and regenerate balls
function resizeCanvas() {
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;
   generateBalls();
}

// Generate dynamic twinkling balls
function generateBalls() {
   balls = [];
   const area = canvas.width * canvas.height;
   const density = 0.00012; // Adjust to control how filled the canvas is
   const count = Math.floor(area * density);
   
   for (let i = 0; i < count; i++) {
      balls.push({
         x: Math.random() * canvas.width,
         y: Math.random() * canvas.height,
         baseRadius: 10 + Math.random() * 30,
         color: themeColors[i % themeColors.length],
         phase: Math.random() * Math.PI * 2,
         twinkleSpeed: 0.5 + Math.random() * 1.5
      });
   }
}

// Draw a single twinkling ball with size and opacity changes
function drawBall(ball, t) {
   const pulse = 0.5 + 0.5 * Math.sin(t * ball.twinkleSpeed + ball.phase); // Range [0,1]
   const radius = ball.baseRadius * (0.95 + 0.1 * pulse); // Small size oscillation
   const alpha = 0.1 + 0.4 * pulse; // Soft twinkling opacity
   
   ctx.beginPath();
   ctx.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
   ctx.closePath();
   ctx.fillStyle = applyAlpha(ball.color, alpha);
   ctx.fill();
}

// Helper: Inject alpha into rgba() color string
function applyAlpha(rgbaString, alpha) {
   return rgbaString.replace(/rgba?\(([^)]+)\)/, (match, contents) => {
      const parts = contents.split(',').map(p => p.trim());
      return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${alpha})`;
   });
}

// Animation loop
function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.globalCompositeOperation = 'lighter';
   balls.forEach(ball => drawBall(ball, time));
   time += 0.01;
   requestAnimationFrame(animate);
}

// Initialize
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();
*/







// Marquee seamless scroll animation
const marquee = document.getElementById('marquee-content');

// Duplicate the cards for seamless scroll
marquee.innerHTML += marquee.innerHTML;

// Calculate half width (since we duplicated)
const totalWidth = marquee.scrollWidth / 2;

// Create GSAP tween
const marqueeTween = gsap.to(marquee, {
   x: `-=${totalWidth}`,
   duration: 30,
   ease: "none",
   repeat: -1,
   modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
   }
});

// Pause on hover
marquee.addEventListener('mouseenter', () => marqueeTween.pause());
marquee.addEventListener('mouseleave', () => marqueeTween.resume());



// Scroll animation using Intersection Observer
const steps = document.querySelectorAll('.timeline-step');

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('visible');
         observer.unobserve(entry.target);
      }
   });
}, { threshold: 0.3 });

steps.forEach(step => {
   observer.observe(step);
});



const currencySwitch = document.getElementById('currencySwitch');
const prices = document.querySelectorAll('.pricing__amount');

const EXCHANGE_API = 'https://api.exchangerate.host/latest?base=LKR&symbols=USD';
let exchangeRate = 0.0029; // fallback value

const originalPrices = document.querySelectorAll('.pricing__original');
const discountedPrices = document.querySelectorAll('.pricing__discounted');

// Set discount (0.6 = 60% off)
const discountRate = 0.6;

async function fetchExchangeRate() {
   try {
      const response = await fetch(EXCHANGE_API);
      const data = await response.json();
      exchangeRate = data.rates.USD;
      console.log("Live USD rate:", exchangeRate);
   } catch (err) {
      console.warn('Failed to fetch live exchange rate. Using fallback.', err);
   }
}

function updatePrices(currency) {
   prices.forEach(priceEl => {
      const lkrValue = parseFloat(priceEl.dataset.lkr);
      if (currency === 'USD') {
         const converted = (lkrValue * exchangeRate).toFixed(2);
         priceEl.textContent = `USD ${formatNumber(converted)}+`;
      } else {
         priceEl.textContent = `LKR ${formatNumber(lkrValue)}+`;
      }
   });
}

function formatNumber(num) {
   return new Intl.NumberFormat().format(num);
}

function saveCurrencyPreference(currency) {
   localStorage.setItem('preferredCurrency', currency);
}

function loadCurrencyPreference() {
   return localStorage.getItem('preferredCurrency') || 'LKR';
}

currencySwitch.addEventListener('change', async (e) => {
   const selected = e.target.value;
   saveCurrencyPreference(selected);
   if (selected === 'USD') await fetchExchangeRate();
   updatePrices(selected);
});

document.addEventListener('DOMContentLoaded', async () => {
   const preferred = loadCurrencyPreference();
   currencySwitch.value = preferred;
   if (preferred === 'USD') await fetchExchangeRate();
   updatePrices(preferred);
   startCountdown(); // Start countdown on load
});

function applyDiscounts(currency) {
   originalPrices.forEach((origEl, index) => {
      const lkrOriginal = parseFloat(origEl.dataset.lkrOriginal);
      const discountedEl = discountedPrices[index];
      const discountedLKR = Math.round(lkrOriginal * (1 - discountRate));
      discountedEl.dataset.lkr = discountedLKR;
      
      if (currency === 'USD') {
         const originalUSD = (lkrOriginal * exchangeRate).toFixed(2);
         const discountedUSD = (discountedLKR * exchangeRate).toFixed(2);
         origEl.textContent = `USD ${formatNumber(originalUSD)}+`;
         discountedEl.textContent = `USD ${formatNumber(discountedUSD)}+`;
      } else {
         origEl.textContent = `LKR ${formatNumber(lkrOriginal)}+`;
         discountedEl.textContent = `LKR ${formatNumber(discountedLKR)}+`;
      }
   });
}

function updatePrices(currency) {
   applyDiscounts(currency);
}


// Replace `'2025-09-01T00:00:00'` with your desired target date in the format `YYYY-MM-DDTHH:MM:SS`.
function startCountdown() {
   const countdownEl = document.getElementById('countdown');
   const targetDate = new Date('2025-09-01T00:00:00'); // Set your target date here
   
   function updateTimer() {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
         countdownEl.textContent = "Expired";
         clearInterval(intervalId); // stop interval
         return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
   }
   
   updateTimer(); // initial
   const intervalId = setInterval(updateTimer, 1000);
}

startCountdown();


const stickyCtaClose = document.querySelector('.sticky-cta-close');

stickyCtaClose.onclick = () => {
   stickyCtaClose.parentElement.style.display = 'none';
}


const tabButtons = document.querySelectorAll('.tab-btn');
const faqGroups = document.querySelectorAll('.faq-group');

tabButtons.forEach(btn => {
   btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      faqGroups.forEach(g => g.classList.toggle('active', g.dataset.tabContent === btn.dataset.tab));
   });
});

document.querySelectorAll('.faq-header').forEach(button => {
   button.addEventListener('click', () => {
      const faq = button.parentElement;
      const body = button.nextElementSibling;
      const isOpen = faq.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen);
      body.hidden = !isOpen;
   });
});

/*
document.querySelectorAll(".faq-header").forEach(header => {
   header.addEventListener("click", function() {
      const body = this.nextElementSibling;
      const icon = this.querySelector("i");
      const expanded = this.getAttribute("aria-expanded") === "true";
      
      if (expanded) {
         this.setAttribute("aria-expanded", "false");
         icon.classList.remove("rotated");
         gsap.to(body, {
            height: 0,
            duration: 0.4,
            ease: "power2.inOut",
            onComplete: () => body.setAttribute("hidden", "")
         });
      } else {
         this.setAttribute("aria-expanded", "true");
         icon.classList.add("rotated");
         body.removeAttribute("hidden");
         gsap.fromTo(body, {
            height: 0
         }, {
            height: "auto",
            duration: 0.4,
            ease: "power2.inOut"
         });
      }
   });
});


const container = document.querySelector("#faqs");

container.addEventListener("mousemove", (e) => {
   const x = (e.clientX / window.innerWidth - 0.5) * 10;
   const y = (e.clientY / window.innerHeight - 0.5) * 10;
   
   gsap.to(".faq-section", {
      x: x,
      y: y,
      duration: 0.6,
      ease: "power3.out"
   });
});
*/

/*
document.addEventListener("DOMContentLoaded", () => {
   gsap.registerPlugin(ScrollTrigger);
   
   // Animate section title
   gsap.from(".faqs.section-title", {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
         trigger: ".faqs-section-title",
         start: "top 80%",
      }
   });
   
   // Animate subtitle
   gsap.from(".faqs.section-creative-title, .faqs.section-subtitle", {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
         trigger: ".faqs.section-creative-title",
         start: "top 85%",
      }
   });
   
   // Animate tab buttons
   gsap.from(".tab-btn", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
         trigger: ".faq-tabs",
         start: "top 85%",
      }
   });
   
   // Animate FAQ items
   gsap.from(".faq-group .faq", {
      opacity: 0,
      y: 40,
      duration: 0.7,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
         trigger: ".faq-group.active",
         start: "top 85%",
      }
   });
});
*/
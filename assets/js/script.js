const canvas = document.querySelector('.blob-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let time = 0;

// Define 5 blobs with different properties
const blobs = [
   { x: 150, y: 100, radius: 100, color: 'rgba(0, 188, 212, 0.35)', freq: 0.2, amp: 20, phase: 0 },
   { x: 600, y: 200, radius: 80, color: 'rgba(255, 64, 129, 0.25)', freq: 0.3, amp: 15, phase: 1 },
   { x: 900, y: 100, radius: 60, color: 'rgba(126, 87, 194, 0.3)', freq: 0.25, amp: 18, phase: 2 },
   { x: 300, y: 350, radius: 90, color: 'rgba(255, 193, 7, 0.3)', freq: 0.15, amp: 12, phase: 3 },
   { x: 750, y: 400, radius: 70, color: 'rgba(76, 175, 80, 0.25)', freq: 0.35, amp: 10, phase: 4 },
];

function drawBlob(blob, t) {
   const points = 60;
   ctx.beginPath();
   for (let i = 0; i <= points; i++) {
      const angle = (Math.PI * 2 / points) * i;
      const offset = Math.sin(angle * blob.freq + t + blob.phase) * blob.amp;
      const r = blob.radius + offset;
      const x = blob.x + Math.cos(angle) * r;
      const y = blob.y + Math.sin(angle) * r;
      
      if (i === 0) {
         ctx.moveTo(x, y);
      } else {
         ctx.lineTo(x, y);
      }
   }
   ctx.closePath();
   ctx.fillStyle = blob.color;
   ctx.fill();
}

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   blobs.forEach(blob => drawBlob(blob, time));
   time += 0.015;
   requestAnimationFrame(animate);
}

animate();








// console.log(typeof gsap);
gsap.timeline()
   .from(".logo", { x: -50, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".social-links a", {
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power1.out"
   }, "-=0.4")
   .from(".nav-links .nav-item", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out"
   }, "-=0.5")
   .from(".tagline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".headline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".subheadline", { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
   .from(".cta-buttons a", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.4,
      ease: "back.out(1.4)"
   }, "-=0.3")
   .from(".illustration", { x: 100, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");





/*
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
*/






// Scroll animation using Intersection Observer
const steps = document.querySelectorAll('.timeline-step');

const observer_2 = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('visible');
         observer_2.unobserve(entry.target); // Animate only once
      }
   });
}, {
   threshold: 0.3
});

steps.forEach(step => {
   observer_2.observe(step);
});





const currencySwitch = document.getElementById("currencySwitch");
const amountEls = document.querySelectorAll(".pricing__amount");
let exchangeRate = 0.0033; // fallback exchange rate (1 LKR ≈ 0.0033 USD)

async function fetchExchangeRate() {
   try {
      const res = await fetch("https://api.exchangerate.host/latest?base=LKR&symbols=USD");
      const data = await res.json();
      if (data && data.rates && data.rates.USD) {
         exchangeRate = data.rates.USD;
      }
   } catch (err) {
      console.warn("Using fallback exchange rate. API failed.");
   }
}

function formatUSD(num) {
   if (num >= 1000) {
      return `$${(num / 1000).toFixed(1)}k+`;
   } else {
      return `$${Math.round(num)}+`;
   }
}

function updatePrices(currency) {
   amountEls.forEach(el => {
      const lkr = parseFloat(el.getAttribute("data-lkr"));
      if (currency === "USD") {
         const usd = lkr * exchangeRate;
         el.textContent = `USD ${formatUSD(usd)}`;
      } else {
         el.textContent = `LKR ${lkr.toLocaleString()}+`;
      }
   });
}

currencySwitch.addEventListener("change", () => {
   const selectedCurrency = currencySwitch.value;
   updatePrices(selectedCurrency);
});

// Initial fetch and update
fetchExchangeRate().then(() => {
   updatePrices(currencySwitch.value);
});







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
// Initialize AOS
AOS.init({
   easing: 'ease-in-out-sine',
   offset: 20, // Adjust trigger point
   duration: 500, // Animation duration
   once: true, // Animation happens only once
});


function loadWhatsAppBtn() {
   var url = 'https://cdn.waplus.io/waplus-crm/settings/ossembed.js';
   var s = document.createElement('script');
   s.type = 'text/javascript';
   s.async = true;
   s.src = url;
   var options = {
      "enabled": true,
      "chatButtonSetting": {
         "backgroundColor": "#16BE45",
         "ctaText": "",
         "borderRadius": "8",
         "marginLeft": "20",
         "marginBottom": "20",
         "marginRight": "20",
         "position": "right",
         "textColor": "#ffffff",
         "phoneNumber": "94767855906",
         "messageText": "Welcome to Ceylon Digital",
         "trackClick": true
      },
      "brandSetting": {
         "brandName": "Ceylon Digital",
         "brandSubTitle": "Typically replies within an hour",
         "headerTextColor": "#fff",
         "brandImg": "https://scrm-data-us-oss.oss-us-west-1.aliyuncs.com/sender/whatsapp_replace_crisp/logo.png",
         "welcomeText": "Hi,there!\nHow can I help you?",
         "messageText": "Hello, I have a question about {{page_link}}",
         "backgroundColor": "#0a5f54",
         "ctaText": "Start Chat",
         "borderRadius": "20",
         "autoShow": false,
         "btnColor": "#16BE45",
         "phoneNumber": "94767855906",
         "trackClick": true
      }
   }
   s.onload = function() {
      CreateWhatsappChatWidget(options);
   };
   var x = document.getElementsByTagName('script')[0];
   x.parentNode.insertBefore(s, x);
}


function getGreeting() {
   const hour = new Date().getHours();
   if (hour < 12) return "Good Morning ☀️";
   else if (hour < 18) return "Good Afternoon 🌤️";
   else return "Good Evening 🌙";
}

document.addEventListener("DOMContentLoaded", () => {
   const greeting = document.getElementById("greeting");
   greeting.textContent = `${getGreeting()}, we're getting things ready...`;
});

// Optional: Hide preloader after page load
window.addEventListener("load", () => {
   setTimeout(() => {
      document.querySelector(".preloader").style.display = "none";
      loadWhatsAppBtn();
   }); // adjust timing if needed
});




/*
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
   const expanded = hamburger.getAttribute('aria-expanded') === 'true';
   hamburger.setAttribute('aria-expanded', !expanded);
   hamburger.classList.toggle('active');
   navLinks.classList.toggle('active');
});
*/





const menuToggle = document.getElementById('menu-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const sidebar = document.querySelector('.sidebar');
const overlay = document.getElementById('overlay');
const dropdowns = document.querySelectorAll('.dropdown > a');
const themeSelects = document.querySelectorAll('.theme-select');

// === SIDEBAR TOGGLE ===
menuToggle.addEventListener('click', () => {
   const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
   menuToggle.setAttribute('aria-expanded', !expanded);
   sidebar.classList.add('open');
   overlay.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
   const expanded = menuToggle.getAttribute('aria-expanded') === 'false';
   menuToggle.setAttribute('aria-expanded', !expanded);
   sidebar.classList.remove('open');
   overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
   sidebar.classList.remove('open');
   overlay.classList.remove('active');
});




// === DROPDOWN TOGGLES ===
dropdowns.forEach(link => {
   link.addEventListener('click', () => {
      const submenu = link.nextElementSibling;
      submenu.classList.toggle('open');
   });
});




// === THEME MANAGEMENT ===

const setTheme = (mode) => {
   if (mode === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
   } else if (mode === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
   } else {
      // Auto mode based on system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
   }
};

const saveThemePreference = (mode) => {
   localStorage.setItem('theme', mode);
};

const loadThemePreference = () => {
   const saved = localStorage.getItem('theme');
   const theme = saved || 'auto';
   themeSelects.forEach(select => {
      select.value = theme;
   });
   setTheme(theme);
   
   // Apply theme when user changes it
   themeSelects.forEach(select => {
      select.addEventListener('change', (e) => {
         const selected = e.target.value;
         saveThemePreference(selected);
         setTheme(selected);
         themeSelects.forEach(select => {
            select.value = selected;
         });
      });
   });
}


// System theme changes (only applies when in Auto mode)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
   if (themeSelect.forEach(select => select.value === 'auto')) {
      setTheme('auto');
   }
});

// Init on page load
loadThemePreference();





// Add "fixed" class to navbar on scroll
const navbar = document.querySelector('.navbar');

onscroll = () => {
   if (pageYOffset > 0) {
      // navbar.classList.add('fixed');
      navbar.classList.add('navbar--fixed');
   }
   else if (pageYOffset === 0) {
      // navbar.classList.remove('fixed');
      navbar.classList.remove('navbar--fixed');
   }
};






// Theme changing
/*
const themeToggle = document.getElementById('theme-toggle');
const toggleIcon = themeToggle.querySelector('i');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
   document.documentElement.setAttribute('data-theme', currentTheme);
}

themeToggle.addEventListener('click', () => {
   let theme = document.documentElement.getAttribute('data-theme');
   let newTheme = theme === 'dark' ? 'light' : 'dark';
   document.documentElement.setAttribute('data-theme', newTheme);
   localStorage.setItem('theme', newTheme);
   changeIcon(newTheme);
});

function changeIcon(theme) {
   if (theme === 'dark') {
      toggleIcon.classList.remove('fa-moon');
      toggleIcon.classList.add('fa-sun');
   } else {
      toggleIcon.classList.remove('fa-sun');
      toggleIcon.classList.add('fa-moon');
   }
}

changeIcon(currentTheme);
*/






// Link delay navigation
const delayedLinks = document.querySelectorAll('a');

delayedLinks.forEach(link => {
   link.addEventListener('click', function(event) {
      event.preventDefault();
      
      if (!link.classList.contains('clicked-animation')) {
         link.classList.add('clicked-animation');
         
         setTimeout(() => {
            window.location.href = link.href;
         }, 300); // delay in ms
      }
   });
});

// Button delay navigation
/*const delayedButton = document.getElementById('delayedButton');
delayedButton.addEventListener('click', function() {
   if (!delayedButton.classList.contains('clicked-animation')) {
      delayedButton.classList.add('clicked-animation');
      
      const url = delayedButton.getAttribute('data-url');
      
      setTimeout(() => {
         window.location.href = url;
      }, 1500); // delay in ms
   }
});*/



// Ripple on click
function addRippleEffect(selector) {
   const elements = document.querySelectorAll(selector);
   
   elements.forEach(el => {
      el.addEventListener('click', e => {
         const existingRipple = el.querySelector('.ripple');
         if (existingRipple) existingRipple.remove();
         
         const ripple = document.createElement('span');
         ripple.classList.add('ripple');
         
         const rippleColor = el.getAttribute('data-ripple-color') || 'rgba(255, 255, 255, 0.3)';
         ripple.style.backgroundColor = rippleColor;
         
         const rect = el.getBoundingClientRect();
         const x = e.clientX - rect.left;
         const y = e.clientY - rect.top;
         
         const size = Math.max(el.offsetWidth, el.offsetHeight);
         ripple.style.width = ripple.style.height = `${size}px`;
         ripple.style.left = `${x - size / 2}px`;
         ripple.style.top = `${y - size / 2}px`;
         
         el.appendChild(ripple);
         
         setTimeout(() => {
            ripple.remove();
         }, 800);
      });
   });
}

addRippleEffect('.cta, .btn, .card, .quote');


// const sections = document.querySelectorAll('.main-section');
// const navLinks = document.querySelectorAll('.nav-item>a');

// const observer = new IntersectionObserver(entries => {
//    let mostVisible = null;
//    let maxRatio = 0;

//    entries.forEach(entry => {
//       if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
//          mostVisible = entry;
//          maxRatio = entry.intersectionRatio;
//       }
//    });

//    if (mostVisible) {
//       navLinks.forEach(link => link.classList.remove('active'));
//       const link = document.querySelector(`a[href="#${mostVisible.target.id}"]`);
//       if (link) link.classList.add('active');
//    }
// }, { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }); // granular thresholds

// sections.forEach(section => observer.observe(section));




/*
var wa_btnSetting = { "btnColor": "#16BE45", "ctaText": "", "cornerRadius": 40, "marginBottom": 20, "marginLeft": 20, "marginRight": 20, "btnPosition": "right", "whatsAppNumber": "94767855906", "welcomeMessage": "Hello!", "zIndex": 999, "btnColorScheme": "light" };
var wa_widgetSetting = { "title": "Ceylon Digital", "subTitle": "Typically replies within an hour", "headerBackgroundColor": "#16BE45", "headerColorScheme": "light", "greetingText": "Hi there! \nHow can I help you?", "ctaText": "Start Chat", "btnColor": "#16BE45", "cornerRadius": 40, "welcomeMessage": "Hello", "btnColorScheme": "light", "brandImage": "./assets/icons/logo.svg", "darkHeaderColorScheme": { "title": "#333333", "subTitle": "#4F4F4F" } };
window.onload = () => {
   _waEmbed(wa_btnSetting, wa_widgetSetting);
};
*/



// Back to Top Script
function scrollToTop() {
   window.scrollTo({ top: 0, behavior: 'smooth' });
}
// gsap.registerPlugin(ScrollTrigger);

let percent = 0;

const preloader = document.getElementById("preloader");
const progress = document.getElementById("progress");
const percentText = document.getElementById("percent");

let load = setInterval(() => {
    percent++;
    percentText.textContent = percent;
    progress.style.width = percent + "%";

    if (percent === 100) {
        clearInterval(load);

        gsap.to(preloader, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                preloader.style.display = "none";
                reveal();
            }
        });
    }
    document.documentElement.classList.add("loaded");
    document.body.classList.add("loaded");
}, 8);




const btn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
});

btn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});




// ====================================
// WORDS
// ====================================

const words = [
    "Websites",
    "Products",
    "Solutions",
    "Experiences",
    "Platforms",
    "Systems",
];

let current = 0;
const wordEl = document.getElementById("word");

// ====================================
// CREATE LETTER SPANS
// ====================================

function createWord(word) {
    wordEl.innerHTML = "";
    word.split("").forEach(letter => {
        const span = document.createElement("span");
        span.classList.add("char");
        span.innerHTML = letter === " " ? "&nbsp;" : letter;
        wordEl.appendChild(span);
    });
}

// ====================================
// ANIMATE WORD IN
// ====================================

function animateIn() {
    const chars = document.querySelectorAll(".char");

    gsap.fromTo(
        chars,
        {
            x: () => gsap.utils.random(-250, 250),
            y: () => gsap.utils.random(-250, 250),
            rotationX: () => gsap.utils.random(-180, 180),
            rotationY: () => gsap.utils.random(-180, 180),
            rotationZ: () => gsap.utils.random(-180, 180),
            scale: () => gsap.utils.random(0.2, 1.5),
            opacity: 0,
            filter: "blur(20px)"
        },
        {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: {
                each: 0.03,
                from: "random"
            },
            ease: "expo.out"
        }
    );
}

// ====================================
// ANIMATE WORD OUT
// ====================================

function animateOut(callback) {
    const chars = gsap.utils.shuffle(
        Array.from(document.querySelectorAll(".char"))
    );

    gsap.to(chars, {
        x: () => gsap.utils.random(-300, 300),
        y: () => gsap.utils.random(-300, 300),
        rotationX: () => gsap.utils.random(-360, 360),
        rotationY: () => gsap.utils.random(-360, 360),
        rotationZ: () => gsap.utils.random(-180, 180),
        scale: () => gsap.utils.random(0.1, 0.8),

        opacity: 0,
        filter: "blur(20px)",

        duration: () => gsap.utils.random(0.5, 1),

        stagger: {
            each: 0.03,
            from: "random"
        },
        ease: "expo.in",
        onComplete: callback
    });
}

// ====================================
// CHANGE WORD LOOP
// ====================================

function nextWord() {
    animateOut(() => {
        current++;
        if (current >= words.length) {
            current = 0;
        }
        createWord(words[current]);
        animateIn();
    });
}

// ====================================
// INITIAL
// ====================================

createWord(words[0]);
animateIn();

// ====================================
// LOOP
// ====================================

setInterval(nextWord, 2800);



// ====================================
// MAGNETIC BUTTON
// ====================================

const buttons = document.querySelectorAll(".cta, .testimonial-card");

buttons.forEach((button) => {
    let bounds;

    function move(x, y) {
        gsap.to(button, {
            x,
            y,
            duration: 0.6,
            ease: "power3.out"
        });
    }

    function onMouseMove(e) {
        bounds = button.getBoundingClientRect();

        const relX = e.clientX - bounds.left - bounds.width / 2;
        const relY = e.clientY - bounds.top - bounds.height / 2;

        // magnetic strength (higher = stronger pull)
        const strength = 0.35;

        move(relX * strength, relY * strength);

        // optional glow follow effect
        button.style.boxShadow = `
            0 10px 30px rgba(157,124,255,0.25),
            ${relX * 0.05}px ${relY * 0.05}px 40px rgba(157,124,255,0.15)
        `;
    }

    function onMouseLeave() {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)"
        });

        button.style.boxShadow = "none";
    }
    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseleave", onMouseLeave);
});



// ====================================
// ORB FOLLOW
// ====================================

const orb = document.querySelector(".orb-1");

window.addEventListener("mousemove", (e) => {
    gsap.to(orb, {
        x: e.clientX * 0.15,
        y: e.clientY * 0.15,
        duration: 2,
        ease: "power4.out"
    });
});



// ====================================
// HERO FLOAT
// ====================================

gsap.to(".content", {
    y: -15,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});



gsap.from(".service-card", {
    scrollTrigger: {
        trigger: ".services",
        start: "top 75%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.12,
    clearProps: "opacity,transform"
});



gsap.from(".project", {
    y: 120,
    opacity: 0,
    duration: 1.4,
    stagger: .3,
    ease: "power4.out",
    scrollTrigger: {
        trigger: ".projects",
        start: "top 70%"
    }
});



gsap.to(".cta-orb", {
    scale: 1.15,
    duration: 5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});
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
   .from(".nav-links li", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out"
   }, "-=0.5")
   .from(".action #theme-toggle", {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
   })
   .from(".action .cta-button", {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
   })
   .from(".tagline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".headline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".subheading", { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
   .from(".cta-buttons a", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.4,
      ease: "back.out(1.4)"
   }, "-=0.3")
   .from(".illustration", { x: 100, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");



/*
gsap.registerPlugin(ScrollTrigger);

gsap.timeline({
      scrollTrigger: {
         trigger: ".header-section", // Adjust this selector to match your section
         start: "top 80%", // Animation starts when top of section hits 80% of viewport
         toggleActions: "play none none none",
         once: true // ✅ Animation will only trigger once
      }
   })
   .from(".logo", { x: -50, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".social-links a", {
      opacity: 0,
      x: -20,
      duration: 0.4,
      stagger: 0.1,
      ease: "power1.out"
   }, "-=0.4")
   .from(".nav-links li", {
      y: -20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: "power2.out"
   }, "-=0.5")
   .from(".action #theme-toggle", {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
   })
   .from(".action .cta-button", {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
   })
   .from(".tagline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".headline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
   .from(".subheading", {
      y: 20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.out"
   }, "-=0.3")
   .from(".cta-buttons a", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 0.4,
      ease: "back.out(1.4)"
   }, "-=0.3")
   .from(".illustration", {
      x: 100,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out"
   }, "-=0.4");
*/


/*
gsap.registerPlugin(ScrollTrigger);

// Responsive breakpoints
ScrollTrigger.matchMedia({
   // Desktop — screen width >= 768px
   "(min-width: 768px)": function() {
      gsap.timeline({
            scrollTrigger: {
               trigger: ".header-section",
               start: "top 80%",
               toggleActions: "play none none none",
               once: true
            }
         })
         .from(".logo", { x: -50, opacity: 0, duration: 0.6, ease: "power2.out" })
         .from(".social-links a", {
            opacity: 0,
            x: -20,
            duration: 0.4,
            stagger: 0.1,
            ease: "power1.out"
         }, "-=0.4")
         .from(".nav-links li", {
            y: -20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
            ease: "power2.out"
         }, "-=0.5")
         .from(".action #theme-toggle", {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
         })
         .from(".action .cta-button", {
            y: -20,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
         })
         .from(".tagline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
         .from(".headline", { y: 30, opacity: 0, duration: 0.6, ease: "power2.out" })
         .from(".subheading", { y: 20, opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
         .from(".cta-buttons a", {
            opacity: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.4,
            ease: "back.out(1.4)"
         }, "-=0.3")
         .from(".illustration", { x: 100, opacity: 0, duration: 0.7, ease: "power2.out" }, "-=0.4");
   },
   
   // Mobile — screen width < 768px
   "(max-width: 767px)": function() {
      gsap.timeline({
            scrollTrigger: {
               trigger: ".hero-section",
               start: "top 90%",
               toggleActions: "play none none none",
               once: true
            }
         })
         .from(".logo", { x: -30, opacity: 0, duration: 0.4, ease: "power2.out" })
         .from(".social-links a", {
            opacity: 0,
            x: -10,
            duration: 0.3,
            stagger: 0.1,
            ease: "power1.out"
         }, "-=0.3")
         .from(".nav-links li", {
            y: -10,
            opacity: 0,
            stagger: 0.1,
            duration: 0.3,
            ease: "power2.out"
         }, "-=0.4")
         .from(".action #theme-toggle", {
            y: -10,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
         })
         .from(".action .cta-button", {
            y: -10,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
         })
         .from(".tagline", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" })
         .from(".headline", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" })
         .from(".subheading", { y: 15, opacity: 0, duration: 0.3, ease: "power2.out" }, "-=0.2")
         .from(".cta-buttons a", {
            opacity: 0,
            y: 15,
            stagger: 0.15,
            duration: 0.3,
            ease: "back.out(1.4)"
         }, "-=0.2")
         .from(".illustration", { x: 60, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
   }
});
*/
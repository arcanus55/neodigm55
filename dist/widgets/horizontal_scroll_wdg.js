gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
let regionContainer = document.querySelector("#region-container");
let tween;
const region = gsap.utils.toArray("#region-container .panel");
tween = gsap.to(region, {
  xPercent: -100 * (region.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: "#region-container",
    pin: true,
    start: "top top",
    scrub: 1,
    snap: {
      snapTo: 1 / (region.length - 1),
      inertia: false,
      duration: { min: 0.1, max: 0.1 }
    },
    end: () => "+=" + (regionContainer.offsetWidth - innerWidth)
  }
});
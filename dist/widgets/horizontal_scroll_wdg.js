gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
let elRegCont = document.querySelector("n55-wdg-horz-scrl #region-container")
if( elRegCont ){
  let tween;
  const region = gsap.utils.toArray("#region-container .panel")
  elRegCont.style.width = "1000%";
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
    end: () => "+=" + (elRegCont.offsetWidth - innerWidth)
  }
  });
}
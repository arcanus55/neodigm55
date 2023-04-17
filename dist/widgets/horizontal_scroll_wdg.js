let elRegCont = document.querySelector("n55-wdg-horz-scrl #region-container")
function fHorzScrlInit(){
    if( elRegCont ){
        gsap.registerPlugin(ScrollToPlugin, ScrollTrigger)
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
                    duration: { min: 0.8, max: 1.8 }
                },
                end: () => "+=" + (elRegCont.offsetWidth - innerWidth)
            }
        });
    }
}
setTimeout( function(){
    if( gsap && ScrollToPlugin && ScrollTrigger){
        fHorzScrlInit()
    }else{
        setTimeout( fHorzScrlInit, 2800 )
    }
}, 600 )
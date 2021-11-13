/*
neodigm 55 UX v1.0.2 | Arcanus 55 and Scott C. Krause
Neodigm 55 is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make visiting your website playful and fun.
*/
let neodigmOpt = {neodigmToast: true, neodigmPop: true, neodigmAudio: false};

let neodigmToast = (function(_d, eID, _q) {
  let _nTimeout = 5800, _aQ = [], _eSb, _eSbText;
  let _fOpen = function() {
      _eSbText.innerHTML = _aQ[0].replace("|", "<br>").replace("##", "");
      _eSb.style.left = ((_d.body.clientWidth / 2) - (_eSb.clientWidth / 2)) + "px";
      _eSb.classList.remove("snackbar__cont--hide");
      if( _aQ[0].indexOf("##") != -1){
        _eSb.classList.add("snackbar__cont--alt");
      }
    _eSb.classList.add("snackbar__cont--show");
    if ("vibrate" in navigator) window.navigator.vibrate([16, 8]);
      setTimeout(_fClose, _nTimeout);
  };
  return {
      init: function(){
          _eSb = _d.getElementById(eID);
          if( _eSb ){
              _eSbText  = _eSb.querySelector("p");
              _fClose = function() {
                  _aQ.shift();
                  _eSb.classList.remove("snackbar__cont--show");
                  _eSb.classList.add("snackbar__cont--hide");
                  if (_aQ.length != 0) {
                      setTimeout(_fOpen, 1200);
                  }
                  _eSb.classList.remove("snackbar__cont--alt");
              }
          }
          _d.body.addEventListener("click", ( ev )=>{
            if( ev?.target?.dataset?.neodigmToast ){
                neodigmToast.q(ev.target.dataset.neodigmToast  )
            }
          }, true)
      },
      q: function(sMsg) {
          if (sMsg && sMsg != _aQ[0]) _aQ.push(sMsg); // debounce
          if (_aQ.length == 1) {
              _fOpen();
          }
      }
  }
})(document, "js-snackbar__id", "[data-neodigm-toast]");

// Neodigm 55 Pop Begin //
let neodigmPop = {
  eRev: 0, eRevScrim: 0,
  _aRevAct: 0, _aRevX: 0, _sRevId: "", _bIsOpen :  false, _fOnClose: null, _d: document,
"init" : function() {
    _aRevX = _d.getElementsByClassName("close-reveal-modal");
    for (let i = 0, ln = _aRevX.length; i < ln; i++) {
        _aRevX[i].addEventListener("click", neodigmPop.close, false);
    }
    _aRevAct = _d.querySelectorAll("[data-neodigm-pop-id]");
    for (let i = 0, ln = _aRevAct.length; i < ln; i++) {
        _aRevAct[i].addEventListener("click", neodigmPop.open, false);
    }
    neodigmPop.eRevScrim = _d.getElementById("id-reveal__scrim");
  },
  "open" : function(e){
    _bIsOpen = true;
    _sRevId = this.getAttribute("data-neodigm-pop-id");
    if(_sRevId){
      neodigmPop.eRevScrim.classList.add("reveal__scrim");
      neodigmPop.eRev = _d.getElementById(_sRevId);
      neodigmPop.eRev.classList.add("reveal__box"); 
      neodigmPop.eRev.parentElement.classList.remove("reveal__init");
        neodigmPop.eRev.style.top = "116px";  //  String(window.pageYOffset + 84) + "px";
        neodigmPop.eRev.style.visibility = "visible";
      neodigmPop.eRev.setAttribute("aria-hidden", "false");
      e.preventDefault();
    }
    return false;
  },
  "close" : function(e){
    _bIsOpen = false;
    neodigmPop.eRevScrim.classList.remove("reveal__scrim");
    neodigmPop.eRev.classList.remove("reveal__box");
    neodigmPop.eRev.parentElement.classList.add("reveal__init");
    neodigmPop.eRev.setAttribute("aria-hidden", "true");
    if(e){ e.preventDefault(); }
    if( _fOnClose ) _fOnClose();
  },
  "autoOpen" : function(_sId){
    _bIsOpen = true;
    _sRevId = _sId;
    if(_sRevId){
      neodigmPop.eRevScrim.classList.add("reveal__scrim");
      neodigmPop.eRev = _d.getElementById(_sRevId);
      neodigmPop.eRev.classList.add("reveal__box");
      neodigmPop.eRev.parentElement.classList.remove("reveal__init");
        neodigmPop.eRev.style.top = "116px";  //  String(window.pageYOffset + 84) + "px";
        neodigmPop.eRev.style.visibility = "visible";
      neodigmPop.eRev.setAttribute("aria-hidden", "false");
    }
    return false;
  },
  "isOpen" : function(){
    return _bIsOpen;
  },
  "setOnClose" : function( _f ){
    if( _f ) _fOnClose = _f;
  }
};
// neodigm Audio Begin //
// neodigm Modal Begin //
// neodigm Toast Begin //
// neodigm Vivid Begin //
// neodigm Type Begin //
// neodigm Marq Begin //
// neodigm Carousel Begin //
// neodigm Heartbeat emitter Begin//
// neodigm Simple Expand Begin//
// neodigm Popover Begin//
// neodigm Dice Begin//
// neodigm Tradecraft Begin//
// neodigm Material Input Begin//
// neodigm accolades carousel Begin//
// neodigm a11y skip Begin//

document.addEventListener("DOMContentLoaded", function(ev) {
  const neodigmMU = `
  <neodigm-scrim class="l-reveal">
      <aside id="id-reveal__scrim" class="close-reveal-modal"></aside> 
  </neodigm-scrim>
  <neodiigm-snack class="l-snackbar" role="alert">
      <section id="js-snackbar__id" class="snackbar__cont snackbar__cont--hide" aria-live="polite" aria-atomic="true">
          <div class="snackbar__progbar"></div>
          <p class="snackbar__msg"></p>
      </section>
  </neodiigm-snack>`;
  let eMU = document.createElement("output");
  eMU.innerHTML = neodigmMU;
  document.body.appendChild(eMU);
  setTimeout( ()=>{
    if( neodigmOpt.neodigmToast ) neodigmToast.init();
    if( neodigmOpt.neodigmPop )   neodigmPop.init();
  }, 4);
});

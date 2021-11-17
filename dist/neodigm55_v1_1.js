/*
Neodigm 55 UX v1.1.0

Copyright (c) 2021, Arcanus 55 Privacy Paranoid Vault | Scott C. Krause
All rights reserved. Redistributions of source code must retain the above copyright notice.

Neodigm 55 UX is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make visiting your website playful and fun.
*/
let neodigmOpt = {neodigmToast: true, neodigmPop: false, neodigmSodaPop: true, neodigmAudio: false};
if( typeof neodigmOptCustom != 'undefined' ) neodigmOpt = neodigmOptCustom;

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

// Neodigm 55 Pop Begin Legacy //
let neodigmPop = {
  eRev: 0, eRevScrim: 0,
  _aRevAct: 0, _aRevX: 0, _sRevId: "", _bIsOpen :  false, _fOnClose: null, _d: document,
"init" : function() {
    _aRevX = this._d.getElementsByClassName("close-reveal-modal");
    for (let i = 0, ln = _aRevX.length; i < ln; i++) {
        _aRevX[i].addEventListener("click", neodigmPop.close, false);
    }
    _aRevAct = this._d.querySelectorAll("[data-neodigm-pop-id]");
    for (let i = 0, ln = _aRevAct.length; i < ln; i++) {
        _aRevAct[i].addEventListener("click", neodigmPop.open, false);
    }
    neodigmPop.eRevScrim = this._d.getElementById("id-reveal__scrim");
  },
  "open" : function(e){
    _bIsOpen = true;
    _sRevId = this.getAttribute("data-neodigm-pop-id");
    if(_sRevId){
      neodigmPop.eRevScrim.classList.add("reveal__scrim");
      neodigmPop.eRev = this._d.getElementById(_sRevId);
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
      neodigmPop.eRev = this._d.getElementById(_sRevId);
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

// Neodigm 55 UX Soda Pop Begin //
const neodigmSodaPop = ( ( _d, _aQ ) =>{
  if( _d && (_aQ.length >= 1) ){
    let eSoda = eScrim = fOnOpen = fOnClose = null;
    let bIsOpen = bIsModal = bIsInit = false;
    return {
      init: function(){
        eScrim = _d.querySelector( _aQ[0] );
        _d.body.addEventListener("click", ( ev )=>{
          if( ev?.target?.dataset?.neodigmSodapopId ){
            neodigmSodaPop.open( ev.target.dataset.neodigmSodapopId )
            ev.preventDefault();
          }
          if( !bIsModal ){
            if( "NEODIGM-SODAPOP-SCRIM" == ev.target.tagName ){
              neodigmSodaPop.close();
            }
          }
        }, false)
        bIsInit = true;
      },
      open: function( sId ){
        let eTmpl = _d.getElementById( sId );
        if( bIsInit && eTmpl && eScrim ){
          bIsModal = (eTmpl.dataset.neodigmSodapopModal == "true");
          if( bIsModal ) eScrim.classList.add( "ndsp__modal" );
          eScrim.dataset.neodigmSodapopScrim = "opened";
           eSoda = _d.createElement( _aQ[1] );
          setTimeout(function(){ eScrim.classList.add( "ndsp__blur" ); }, 96);
          if( bIsModal ) eSoda.classList.add("ndsp__modal");
          eSoda.classList.add( "ndsp__size--" +  eTmpl.dataset.neodigmSodapopSize );
          setTimeout(function(){ eSoda.classList.add( "ndsp__opened" ); }, 4);
          eSoda.innerHTML = eTmpl.innerHTML;
          _d.body.appendChild( eSoda );
          if( fOnOpen ) fOnOpen();
          if ("vibrate" in navigator) window.navigator.vibrate([16, 8]);
          bIsOpen = true;
        }
      },
      close: function(){
        if( bIsInit && bIsOpen ){
          eScrim.classList.remove( "ndsp__blur", "ndsp__modal" );
          setTimeout(function(){
            eSoda.remove();
            setTimeout(function(){
              eScrim.dataset.neodigmSodapopScrim = "closed";
            }, 500);
          }, 300);
          if( fOnClose ) fOnClose();
          if ("vibrate" in navigator) window.navigator.vibrate([8, 16]);
          bIsOpen = false;
        }
      },
      autoOpen: function( sId ){ neodigmSodaPop.open( sId ) },
      isOpen: function(){ return bIsOpen; },
      setOnOpen: function( _f ){ fOnOpen = _f },
      setOnClose: function( _f ){ fOnClose = _f }
    }
  }
})( document, ["neodigm-sodapop-scrim", "neodigm-sodapop", "data-neodigm-sodapop-modal"]);
// Neodigm 55 UX Soda Pop End //

// neodigm Audio Begin //
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
  <neodigm-sodapop-scrim></neodigm-sodapop-scrim>

  <neodigm-scrim class="l-reveal" DATA-LEGACY>
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
    if( neodigmOpt.neodigmToast )   neodigmToast.init();
    if( neodigmOpt.neodigmPop )     neodigmPop.init();
    if( neodigmOpt.neodigmSodaPop ) neodigmSodaPop.init();
  }, 4);
});

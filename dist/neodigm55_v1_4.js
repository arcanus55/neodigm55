/*
Neodigm 55 UX v1.2.0

Copyright (c) 2021, Arcanus 55 Privacy Paranoid Vault | Scott C. Krause
All rights reserved. Redistributions of source code must retain the above copyright notice.

Neodigm 55 UX is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make visiting your website playful and fun.
*/
let neodigmOpt = {neodigmToast: true, neodigmSodaPop: true, neodigmUtils: true, neodigmAudio: false};
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

// Neodigm 55 UX Soda Pop Begin //
const neodigmSodaPop = ( ( _d, _aQ ) =>{
  if( _d && (_aQ.length >= 1) ){
    let eSoda = eScrim = eClose = fOnBeforeOpen = fOnAfterOpen = fOnClose = null;
    let bIsOpen = bIsModal = bIsInit = false;
    return {
      init: function(){
        eScrim = _d.querySelector( _aQ[0] );
        eClose = _d.querySelector( _aQ[0] + "-close" );
        _d.body.addEventListener("click", ( ev )=>{
          if( ev?.target?.dataset?.neodigmSodapopId ){
            neodigmSodaPop.open( ev.target.dataset.neodigmSodapopId )
            ev.preventDefault();
          }
          if( "NEODIGM-SODAPOP-SCRIM" == ev.target.tagName ){
            if( bIsModal ){
              neodigmSodaPop.shake();
            }else{
              neodigmSodaPop.close();
            }
          }
          if( "NEODIGM-SODAPOP-SCRIM-CLOSE" == ev.target.tagName ){
            neodigmSodaPop.close();
          }
        }, false)
        bIsInit = true;
      },
      open: function( sId ){
        let eTmpl = _d.getElementById( sId );
        if( bIsInit && eTmpl && eScrim ){
          if( fOnBeforeOpen ) fOnBeforeOpen();
          bIsModal = (eTmpl.dataset.neodigmSodapopModal == "true");
          if( bIsModal ) {
            eScrim.classList.add( "ndsp__modal" )
            eClose.classList.add( "ndsp__modal" )
            };
          eScrim.dataset.neodigmSodapopScrim = "opened";
          eClose.dataset.neodigmSodapopScrim = "opened";
           eSoda = _d.createElement( _aQ[1] );
          setTimeout(function(){ eScrim.classList.add( "ndsp__blur" ); }, 96);
          if( bIsModal ) eSoda.classList.add("ndsp__modal");
          eSoda.classList.add( "ndsp__size--" +  eTmpl.dataset.neodigmSodapopSize );
          setTimeout(function(){ eSoda.classList.add( "ndsp__opened" ); }, 4);
          eSoda.innerHTML = eTmpl.innerHTML;
          _d.body.appendChild( eSoda );
          if ("vibrate" in navigator) window.navigator.vibrate([16, 8]);
          bIsOpen = true;
          if( fOnAfterOpen ) fOnAfterOpen();
        }
      },
      close: function(){
        if( bIsInit && bIsOpen ){
          eScrim.classList.remove( "ndsp__blur", "ndsp__modal" );
          eClose.classList.remove( "ndsp__modal" );
          eClose.dataset.neodigmSodapopScrim = "closed";
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
      shake: function(){
        let iT = 204;
        for(let x=1; x<=10; x++){
          setTimeout(function(){ eSoda.classList.add( "ndsp__opened--shake" ); }, ( iT * x ));
          setTimeout(function(){ eSoda.classList.remove( "ndsp__opened--shake" ); }, ( iT * x ) + ( iT/2 ));
        }
      },
      autoOpen: function( sId ){ setTimeout(function(){ neodigmSodaPop.open( sId )}, 400)},
      isOpen: function(){ return bIsOpen; },
      setOnBeforeOpen: function( _f ){ fOnBeforeOpen = _f },
      setOnAfterOpen: function( _f ){ fOnAfterOpen = _f },
      setOnClose: function( _f ){ fOnClose = _f }
    }
  }
})( document, ["neodigm-sodapop-scrim", "neodigm-sodapop", "data-neodigm-sodapop-modal"]);

// Neodigm 55 UX Utils Begin //
const neodigmUtils = ( ( _d ) =>{
  return {
    isMobile: function(){ return (_d.body.clientWidth <= 768) ? true : false; },
    f1210: function(){ return (Math.floor(Math.random() * (10) + 1)); },  //  1 to 10
    fAsyncJS: function( _d, _uri, _cb ){  //  Load JS Async then callback
      var _js = _d.createElement( "script" );
      _js.type = "text/javascript";
      _js.async = true;
      if( _cb ) _js.onload = function(){ _cb(); };
      _js.src = _uri;
      _d.getElementsByTagName( "head" )[0].appendChild( _js );
    }
  }
})( document );


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
<neodigm-sodapop-scrim-close>
    <svg fill="#DD4124" height="48" viewBox="0 0 22 22" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
</neodigm-sodapop-scrim-close>
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
    if( neodigmOpt.neodigmSodaPop ) neodigmSodaPop.init();
  }, 4);
});

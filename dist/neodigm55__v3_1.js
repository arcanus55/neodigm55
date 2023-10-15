/*
Neodigm 55 UX v3.1.0
Copyright (c) 2021-2025, Arcanus 55 Privacy Paranoid Vault | Forged by Scott C. Krause and team

Neodigm 55 is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make your website playful and fun.

All rights reserved. Redistributions of source code must retain the above copyright and notice.
*/

//  Neodigm 55 Options Custom Config Begin  //
let neodigmOpt = {
  neodigmToast: true,
    N55_GTM_DL_TOAST: "n55_gtm_dl_toast",
  neodigmSodaPop: true,
    N55_SP_DISABLE_SCROLL: true,
    N55_GTM_DL_POP_OPEN: "n55_gtm_dl_pop_open",
    N55_GTM_DL_POP_CLOSE: "n55_gtm_dl_pop_close",
  neodigmWired4Sound: true,
    W4S_VOLUME: .030,
    EVENT_SOUNDS: true,
  neodigmParallax: true,
    PRLX_MOBILE: false,  //  Show Parallax on Mobile
  neodigmMarquee: true,
  neodigmEnchantedCTA: true,
    N55_CTA_RND_TOUCH: 14001,  //  Touch random CTA button every Xms
    N55_GTM_DL_CTA: "n55_gtm_dl_cta",
    N55_CTA_LONG_TAP: true,  //  Wait 3.4s before firing cust LC func
    N55_CTA_FX: [ "alternate", "emit", "flash_danger", "flash_warning", "radius", "scroll", "shake" ], // TODO glance!
  neodigmKPI: true,  N55_GTM_DL_KPI: "n55_gtm_dl_kpi",
  neodigmPWA: true,  N55_PWA_TEMPLATE_ID: "js-pup-n55-pwa",
  neodigmCarousel: true,  N55_GTM_DL_CARSL: "n55_gtm_dl_carsl",
    N55_CARO_BLUR: true,  //  Carousel transition blur / opacity fx
neodigmTulip: true,
neodigmPopTart: true,  N55_GTM_DL_POPTRT: "n55_gtm_dl_poptrt",
neodigmAgent: false,
neodigmPicnic: true,  N55_GTM_DL_PICNIC: "n55_gtm_dl_picnic",
neodigmWWInterval: true,
  N55_ZIND: {"PopTart": 264},
  CONSOLE_LOG_VER: true,
  N55_DEBUG_lOG: false,
  N55_AMPM_THEME: "light",
  N55_EVENT_HAPTIC: true,
  N55_GENRE_MOTIF: "neodigm",  //  anime artdeco casino cyberpunk expressionist graffiti noir rainforest seasonal steampunk
  N55_THEME_DEFAULT: "brand",
  N55_THEME_COLORS: {"brand":["EDBA08","915E00"], "primary":["92a8d1","364C75"], "secondary":["EDCED0","978284"], "success":["009473","003817"], "white":["FFFFFF","FDFDFD"], "ghost":["ffffff","000000"],
   "danger":["DD4124","810000"], "warning":["F5DF4D","988200"], "info":["7BC4C4","1F6868"], "disabled":["868686","767676"], "night":["6a6a6a","242424"], "marcom":["B163A3","5F4B8B"], "party":["FF6F61","C93F60"]},
  N55_APP_STATE: {"CONTEXT": "body", "FIRST_TAP": false, "ONLINE": true, "PWA_READY": false, "PWA_CONTAIN": false, "SHAKE": false, "CONTEXTMNU": false, "FOCUS": true, "AMPM": "light", "REDUCE_MOTION": true},
  ROOT: document.querySelector(':root'),
  N55_TYPE: "https://fonts.googleapis.com/css?family=Roboto+Condensed:wght@100;300;400|Roboto+Slab:wght@300|Roboto+Mono:wght@300|Material+Symbols+Outlined:opsz,wght,FILL,GRAD@40,300,0,0"
}

if( typeof neodigmOptCustom != 'undefined' ){
    for( cnfgProp in neodigmOptCustom ){  //  Import Custom Objects props if exists
      neodigmOpt[ cnfgProp ] = neodigmOptCustom[ cnfgProp ]
    }
}

//  Neodigm 55 Utils Begin  //
const neodigmUtils = ( ( _d ) =>{
  return {
    ver: "3.1.0",  //  Neodigm 55 version
    isMobile: function(){ return (_d.body.clientWidth <= 768) ? true : false; },
    isTouch: function(){ return (typeof document.body.ontouchstart != "undefined") },
    f1210: function(){ return (Math.floor(Math.random() * (10) + 1)); },  //  1 to 10
    f02x: function(x){ return (Math.floor(Math.random() * x)); },  //  0 to x
    fAsyncJS: function( _d, _uri, _cb ){  //  Load JS Async then callback
      var _js = _d.createElement( "script" )
      _js.type = "text/javascript"
      _js.async = true
      if( _cb ) _js.onload = function(){ _cb(); }
      _js.src = _uri
      _d.getElementsByTagName( "head" )[0].appendChild( _js )
    },
    data2prop: function( sDset ){  //  Convert HTML data attrib name to JS dataset name
      sDset = sDset.replace("data-", "").toLowerCase();
      let aDset = sDset.split(""), aDret = [], bUpper = false;
      aDset.forEach( (sVal ) => {
          if( sVal == "-" ){
              bUpper = true;
          }else{
              aDret.push( ( bUpper ) ? sVal.toUpperCase() : sVal ); bUpper = false;
          }
      });
      return aDret.join("");
    },
    doDataLayer: function( event, msg ){
      if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~ga | " + event + " | " + msg )
      if( window.dataLayer ) window.dataLayer.push( { "event": event, "msg": msg } )
    },
    appStateListen: function( fCb ){  //  Update body atr, dataLayer, console log, and Session Storage
      document[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener( "click", ( ev ) =>{
        if( !neodigmOpt.N55_APP_STATE.FIRST_TAP ){ neodigmOpt.N55_APP_STATE.FIRST_TAP = true }
        if( neodigmOpt.neodigmTulip ) neodigmTulip.close() // TODOD refact into class pub/sub emit?
        let evAtr = neodigmUtils.walkDOM3( ev?.target, "n55TypeonClick" )
        if( evAtr ) neodigmUtils.typeOn( JSON.parse( evAtr ) )
      })
      document[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener( "touchstart", ( ev ) =>{
        if( !neodigmOpt.N55_APP_STATE.FIRST_TAP ){ neodigmOpt.N55_APP_STATE.FIRST_TAP = true }
        if( neodigmOpt.neodigmTulip ) neodigmTulip.close() // TODOD refact into class pub/sub emit?
      })
      window.addEventListener( "resize", ( ev ) =>{
        window.requestAnimationFrame(() => {
          if( neodigmOpt.neodigmCarousel ) neodigmCarousel.init()
          if( neodigmOpt.neodigmTulip ) neodigmTulip.close() // TODOD refact into class pub/sub emit?
          if( neodigmOpt.neodigmPopTart ) neodigmPopTart.close()
        })
      })
      window.addEventListener( "orientationchange", ( ev ) =>{
        window.requestAnimationFrame(() => {
          if( neodigmOpt.neodigmCarousel ) neodigmCarousel.init()
          if( neodigmOpt.neodigmTulip ) neodigmTulip.close() // TODOD refact into class pub/sub emit?
        })
      })
      window.addEventListener( "scroll", ( ev ) =>{
        window.requestAnimationFrame(() => {
          if( neodigmOpt.neodigmTulip ) neodigmTulip.close()
        })
      })
      neodigmOpt.N55_APP_STATE.REDUCE_MOTION = !window.matchMedia( '(prefers-reduced-motion: no-preference)' ).matches
      let sFirstAMPM = document[ neodigmOpt.N55_APP_STATE.CONTEXT ].querySelector( "[data-n55-Ampm-theme]" )?.dataset.n55AmpmTheme
      if( sFirstAMPM ) neodigmOpt.N55_AMPM_THEME = neodigmOpt.N55_APP_STATE.AMPM = sFirstAMPM
    },
    capFirst: s => (s && s[0].toUpperCase() + s.slice(1)) || "",
    genHash: (sV) => {sV = String(sV); return sV.split("").reduce((a,b) => (((a << 5) - a) + b.charCodeAt(0))|0, 0)},
    robinTheme: function( sTheme = Object.keys( neodigmOpt.N55_THEME_COLORS )[0] ){  //  Round Robin Whole Page
      if( !neodigmMetronome.isPaused() ){ // TODO test OS/UA motion mq
        let aE = [ ... document[ neodigmOpt.N55_APP_STATE.CONTEXT ].querySelectorAll("[data-n55-theme") ]; const NDELAY = 32;
        aE.forEach( ( eC, nDx ) => {
          if( eC.dataset.n55Theme != "ghost" ){  //  TODO Disabled
            if( !eC.n55Theme ) eC.n55Theme = eC.dataset.n55Theme
            setTimeout( function(){ eC.dataset.n55Theme = sTheme }, ( nDx * NDELAY ) )              
            setTimeout( function(){ eC.dataset.n55Theme = eC.n55Theme }, ( nDx * (NDELAY + NDELAY) ) )            
          }
        });
      }
    },
    countTo: async function( _q, nVal, t=124 ){  //  Whole number
      const NTIMES = [16, t];
      [ ... document.querySelectorAll( _q ) ].forEach(function( e, nDx ){
          let nDif = Math.abs( Number( e.textContent ) - nVal )
          neodigmMetronome.unsubscribe( NTIMES[1] + nDx ).subscribe( function( mx ){
            let nCur =  Number( e.textContent )
            if( !Number.isNaN( nCur ) && !isNaN( nCur ) && nVal != nCur ){
              let nValC = ( nDif ) / NTIMES[0]
              nValC = Math.round( nValC )
              if( mx != 0 ){
                e.textContent = ( nCur < nVal ) ? nCur + nValC : nCur - nValC
              }else{
                e.textContent = nVal
              }
            }
          }, NTIMES[1] + nDx, NTIMES[0] )
      })
      return neodigmUtils;
    },
    typeOff: async function( o ){
      let elTrg = document.querySelector( o?.q1st )
      if( elTrg ){
        let nInterv = elTrg.textContent.length
        let oSt = window.getComputedStyle( elTrg )
        let nPd = Number(oSt.paddingTop.replace("px", "")) + Number(oSt.paddingBottom.replace("px", ""))
        if( elTrg.offsetHeight ) elTrg.style.height = (elTrg.offsetHeight - nPd ) + "px"
        while( nInterv ){
          setTimeout( ()=>{ elTrg.textContent = elTrg.textContent.replace(/.$/,"") }, o.uniqueDelay * nInterv-- )
        }
      }
    },
    typeOn: async function( o ){  //  Progressive Text
      let elTrg = document.querySelector( o?.q1st )
      if( elTrg ){
        elTrg.dataset.n55Typeon = 0
        let sMsg = o.msg.replaceAll("|", "   |   ") + "   "  //  Pause Between
        let aPhrz = sMsg.split("|")
        if( ( o?.mode == "OFF" ) ){  //  Token CAPS
          neodigmUtils.typeOff({"q1st": o.q1st, "uniqueDelay": o.uniqueDelay })
          return neodigmUtils;
        }
        if( ( o?.mode == "RANDOM" ) && aPhrz.length ){  //  Token CAPS
          let nRnd = elTrg.dataset.n55Typeon = neodigmUtils.f02x( aPhrz.length )  //  Update data Attr RND
          sMsg = aPhrz[ nRnd ]  //  Single Phrase
        }
        neodigmUtils.typeOff({"q1st": o.q1st, "uniqueDelay": ( o.uniqueDelay / elTrg.textContent.length ) - 4 })
        neodigmMetronome.unsubscribe( o.uniqueDelay ).subscribe( ( mx )=>{
          let sChr = sMsg[ sMsg.length - (mx + 1) ]
          if( sChr == "|" ){
            sChr = ""
            neodigmUtils.typeOff({"q1st": o.q1st, "uniqueDelay": ( o.uniqueDelay / elTrg.textContent.length ) - 4 })
            elTrg.dataset.n55Typeon++
          }
          elTrg.textContent += sChr
          if( o?.mode == "LOOP" && mx == 0 ) neodigmUtils.typeOn( o )  //  Token CAPS Recurse
        }, o.uniqueDelay, sMsg.length )  //  Subscribe params
      }
      return neodigmUtils;
    },
    getValJSON: function( sAtr, sPrp ){  //  Return json object or construct an object w property | msg
      try { return JSON.parse( sAtr ) } catch(e) {
        return JSON.parse( '{ "' + sPrp + '": "' + sAtr + '" }' )
      }
    },
    walkDOM3: function( elEv, sDatAtr ){  //  Walk up two nodes, parent, grand parent
        if( elEv?.dataset[ sDatAtr ] ) return elEv.dataset[ sDatAtr ]
        if( elEv?.parentNode?.dataset[ sDatAtr ] ) return elEv.parentNode.dataset[ sDatAtr ]
        if( elEv.tagName != "BODY" && elEv?.parentNode?.parentNode?.dataset[ sDatAtr ] ) return elEv.parentNode.parentNode.dataset[ sDatAtr ]
    },
    doSetT: function( fCb, nT ){  //  Fire overloaded or native setT based on opt ff
        if( neodigmOpt.neodigmWWInterval ) return window.setTimeoutN55( fCb, nT )
        return setTimeout( fCb, nT )  //  TODO create doClearT, doSetI, and doClearI
    },
    shake: function( _q, bSound = true) {
      if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([8, 32, 48]);
      [ ... document.querySelectorAll( _q ) ].forEach(function( el, nDx ){
        el.classList.add( "shake__an" );
        setTimeout(function(){ el.classList.remove( "shake__an" ); }, 460)
      } )
      if( bSound && neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound( 13, "QUITE" )
      if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([48, 32, 8])
      return neodigmUtils;
    }
  }
})( document );

//  Neodigm 55 Toast Begin  //
let neodigmToast = (function(_d, eID, _q) {
  let _nTimeout = 5200, _aQ = [], _eSb, _eSbText, _sTheme
  let bIsInit = bIsPause = false 
  let _fOpen = function() {
      _eSbText.innerHTML = _aQ[0].sMsg.replace("|", "<br>").replace("##", "")
      _eSb.style.left = ((_d.body.clientWidth / 2) - (_eSb.clientWidth / 2)) + "px"
      if( _aQ[0].sTheme ) _eSb.dataset.n55Theme = _aQ[0].sTheme
      if( _sTheme ) {
        _eSb.dataset.n55Theme = _sTheme
        _sTheme = ""
      }
      _eSb.classList.remove("snackbar__cont--hide")
      if( neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound( 1, "QUITE" )
    _eSb.classList.add("snackbar__cont--show")
    if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([48, 56])
    neodigmUtils.doSetT( _fClose, _nTimeout )  //  Call overloaded setT if FF is true
  };
  return {
      init: function(){
          _eSb = _d.getElementById(eID)
          if( _eSb ){
              _eSbText  = _eSb.querySelector("p")
              _fClose = function() {
                  _aQ.shift()
                  _eSb.classList.remove("snackbar__cont--show")
                  _eSb.classList.add("snackbar__cont--hide")
                  if(_aQ.length != 0) {
                    neodigmUtils.doSetT( _fOpen, 1200 )  //  Call overloaded setT if FF is true
                  }
                  _eSb.classList.remove("snackbar__cont--alt")
              }
          }
          _d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("click", ( ev )=>{
            let evToast = ev?.target?.dataset.n55Toast || ev?.target?.parentNode?.dataset.n55Toast
            if( evToast ){
              let evTheme = ev?.target?.dataset.n55Theme || ev?.target?.parentNode?.dataset.n55Theme || neodigmOpt.N55_THEME_DEFAULT
              if( evTheme && evTheme != "disabled" ) neodigmToast.q( evToast, evTheme )              
            }
          }, true)
          bIsInit = true
      },
      q: function( sMsg, sTheme ) {
          if( bIsInit && !bIsPause ){ 
            if( sMsg && sMsg != _aQ[0]?.sMsg ){
              _aQ.push( {"sMsg": sMsg, "sTheme":sTheme} ) // temporal debounce
              if( neodigmOpt.N55_GTM_DL_TOAST ) neodigmUtils.doDataLayer( neodigmOpt.N55_GTM_DL_TOAST, sMsg )
              if(_aQ.length == 1) _fOpen()              
            }
          }
          return neodigmToast
      },
      setTheme: function( sTheme ){
        if( bIsInit && !bIsPause ){ _sTheme = sTheme }
        return neodigmToast
      },
      getQ: function(){ return _aQ; },
      clearQ: function(){ _aQ = []; return neodigmToast; },
      pause: function(){ bIsPause = true; return neodigmToast; },
      play: function(){ bIsPause = false; return neodigmToast; }
  }
})(document, "js-snackbar__id", "[data-n55-toast]");

//  Neodigm 55 Soda Pop Begin  //
class NeodigmSodaPop {
    constructor(_d, _aQ) {  //  Flux Capacitor
        this._d = _d; this._aQ = _aQ; this.sId = ""
        this.eSoda = this.eScrim = this.eClose = this.fOnBeforeUserExit = null
        this.fOnBeforeOpen = {}; this.fOnAfterOpen = {}; this.fOnClose = {}
        this.bIsOpen = this.bIsModal = this.bIsInit = false
    }
    init() {
        if( !this.bIsInit ){
            this.eScrim = this._d.querySelector(this._aQ[0])
            this.eClose = this._d.querySelector(this._aQ[0] + "-close")
            this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("click", ( ev ) => {  //  TODO Keyboard trap
                let evAtr = neodigmUtils.walkDOM3( ev?.target, "n55SodapopId" )
                let evTheme = neodigmUtils.walkDOM3( ev?.target, "n55Theme" )
                if( evAtr && (evTheme != "disabled") ) {
                    ev.preventDefault()
                    neodigmSodaPop.open( evAtr )
                }
                if("NEODIGM-SODAPOP-SCRIM" == ev.target.tagName) {
                    if( this.bIsModal ) { this.shake() } else { this.close() }
                }
                if("NEODIGM-SODAPOP-SCRIM-CLOSE" == ev.target.tagName) this.close()
                if( ev?.target?.dataset?.sodapopScrimSvg ) this.close()
                if("SUMMARY" == ev.target.tagName) {  //  Details / Summary
                    if( neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound( ev.target.parentElement.hasAttribute( "open" ) ? 9 : 7, "QUITE" )
                }
            }, false)
            this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("keydown", ( ev ) => {  //  Close on Esc Key
                if ( ev.key == "Escape" ){
                    if( this.bIsModal ) { this.shake() } else { if( this.bIsOpen ) this.close() }
                }
            }, true)
            this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("mouseleave", (ev) => {  //  User focus exit
                if( this.fOnBeforeUserExit && !sessionStorage.getItem( "n55_userExit" ) ) this.fOnBeforeUserExit()
                sessionStorage.setItem( "n55_userExit", Date.now() )
            })
            this.bIsInit = true
        }
        return this
    }
    open( _sId ) {
        let bOkOpen = true  //  The specific CB can cancel the generic DEF
        this.sId = _sId
        if(this.bIsOpen) this.close(true)
        this.eTmpl = this._d.getElementById( _sId )
        if( this.fOnBeforeOpen[ _sId] ) bOkOpen = this.fOnBeforeOpen[ _sId]( this.sId )
        if( bOkOpen && this.fOnBeforeOpen["def"]) bOkOpen = this.fOnBeforeOpen["def"]( this.sId )
        if( bOkOpen && this.bIsInit && this.eTmpl && this.eScrim ) {
            this.bIsModal = (this.eTmpl.dataset.n55SodapopModal == "true")
            if(this.bIsModal) { this.eClose.classList.add("ndsp__modal") }else{
                this.eClose.classList.remove("ndsp__modal")
            }
            this.eScrim.dataset.n55SodapopScrim = this.eClose.dataset.n55SodapopScrim = "opened"
            this.eSoda = this._d.createElement(this._aQ[1])
            setTimeout(function() { neodigmSodaPop.eScrim.classList.add("ndsp__blur"); }, 96)
            if( this.bIsModal ) this.eSoda.classList.add( "ndsp__modal" )
            this.eSoda.dataset.n55AmpmTheme = ( this.eTmpl.dataset?.n55AmpmTheme ) ? this.eTmpl.dataset.n55AmpmTheme : ""  //  Isolate Pup AMPM theme
            this.eSoda.classList.add("ndsp__size--" + this.eTmpl.dataset.n55SodapopSize ) 
            if( neodigmOpt.N55_SP_DISABLE_SCROLL ) neodigmSodaPop.eSoda.classList.add( "ndsp__bodyscroll" )
            setTimeout(function() { neodigmSodaPop.eSoda.classList.add("ndsp__opened"); }, 276)
            this.eSoda.innerHTML = this.eTmpl.innerHTML
            this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].appendChild( this.eSoda )

            if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([16, 8])
            if(neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS) neodigmWired4Sound.sound( 7, "QUITE" )
            this.bIsFS = ( this.eTmpl.dataset.n55SodapopFullscreen == "true" && neodigmOpt.N55_APP_STATE.FIRST_TAP )
            if( this.bIsFS ){
                this._d.body.requestFullscreen().catch(( e )=>{
                    if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~No Fullscreen | ", e )
                    this.bIsFS = false 
                })
                neodigmSodaPop.eSoda.classList.add("n55SodapopFullscreen")
            }
            this.bIsOpen = true;
            if(this.fOnAfterOpen[_sId]) this.fOnAfterOpen[_sId]( this.sId )
            if(this.fOnAfterOpen["def"]) this.fOnAfterOpen["def"]( this.sId )
            if( neodigmOpt.N55_GTM_DL_POP_OPEN ) neodigmUtils.doDataLayer( neodigmOpt.N55_GTM_DL_POP_OPEN, _sId )
        }
        return neodigmSodaPop
    }
    close( _bFast ) {
        if(this.bIsInit && this.bIsOpen) {
            let bOkClose = true  //  CBs must explicitly return false to prevent closing
            if( this.fOnClose[ this.sId ] ) bOkClose = !(this.fOnClose[ this.sId ]( this.sId ) === false)  //  The specific can cancel the generic
            if( bOkClose && this.fOnClose[ "def" ] ) bOkClose = !(this.fOnClose[ "def" ]( this.sId ) === false)
            if( bOkClose ){
                this.eClose.dataset.n55SodapopScrim = "closed"
                if(_bFast) {
                    this.eSoda.remove()
                    this.eScrim.dataset.n55SodapopScrim = "closed"
                    this.eScrim.classList.remove("ndsp__blur", "ndsp__modal")
                } else {
                    setTimeout(function() {
                        neodigmSodaPop.eSoda.remove()
                        setTimeout(function() {
                            neodigmSodaPop.eScrim.dataset.n55SodapopScrim = "closed"
                            neodigmSodaPop.eScrim.classList.remove("ndsp__blur", "ndsp__modal")
                        }, 332)
                    }, 186)
                }
                if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([8, 16])
                if(neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS) neodigmWired4Sound.sound( 3, "QUITE" )
                this.bIsOpen = false
                if( this.bIsFS ) this._d.exitFullscreen();
                if( neodigmOpt.N55_GTM_DL_POP_CLOSE ) neodigmUtils.doDataLayer( neodigmOpt.N55_GTM_DL_POP_CLOSE, "close" )
            }
        }
        return this
    }
    shake( bSound = true) {
        if(this.bIsInit && this.bIsOpen) {
            if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([8, 32, 48])
            neodigmSodaPop.eSoda.classList.add("ndsp__opened--shake1");
            setTimeout(function(){
                neodigmSodaPop.eSoda.classList.remove("ndsp__opened--shake1");
            }, 460)
            if( bSound && neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound( 13, "QUITE" )
            if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([48, 32, 8])
        }
        return this
    }
    autoOpen(_sId) {
        setTimeout(function() {
            neodigmSodaPop.open(_sId)
        }, 256);
        return this
    }
    isOpen(){ return this.bIsOpen }
    setOnBeforeOpen( _f, id="def"){ this.fOnBeforeOpen[ id ] = _f }
    setOnAfterOpen( _f, id="def"){ this.fOnAfterOpen[ id ] = _f }
    setOnClose( _f, id="def"){ this.fOnClose[ id ] = _f }
    setOnBeforeUserExit(_f){ this.fOnBeforeUserExit = _f }
}
let neodigmSodaPop = new NeodigmSodaPop( document, ["neodigm-sodapop-scrim", "neodigm-sodapop", "data-n55-sodapop-modal"] )

//  Neodigm 55 Tulip Begin  //
class NeodigmTulip {  //  Tooltip
  constructor(_d, _aQ) {
      this._d = _d; this._aQ = _aQ; this.sId = ""
      this.eTulip = this.eTulipTxt = this.eTulMrq = null
      this.bIsOpen = this.bIsInit = this.bIsPause = this.bIsAuto = false
      this.oCnfDef = {"msg":"tulip","mrq":false,"tmpt":"","theme": neodigmOpt.N55_THEME_DEFAULT,"size":"small","position":"top","icon":""}
      this.oCnfCur = Object.assign( this.oCnfDef )
      this.fOnBeforeOpen = {};
  }
  init() {  //  rinit
    if( !this.bIsInit && !neodigmUtils.isMobile() ){  //  once events app_state.context
      this.eTulip = this._d.querySelector( this._aQ[0] )
      this.eTulMrq = this.eTulip.querySelector("neodigm-marquee")
      this.eTulPre = this.eTulMrq.querySelector("pre")
      if( this.eTulip ){
        this.eTulipTxt = this.eTulip.querySelector( "p" );
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener( "mouseover", ( ev ) =>{
          if( this.bIsInit && !this.bIsPause ){
            let sCnf = neodigmUtils.walkDOM3( ev?.target, "n55Tulip" )
            this.sId = ev?.target?.id;  //  Assumes tulip is on child (callback)
            if( sCnf && ev?.target?.dataset?.n55Theme != "disabled" ){
              neodigmTulip.prepOpen( sCnf, ev.target.getBoundingClientRect() )
            }
          }
        }, false)
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener( "mouseout", ( ev ) =>{
          if( !this.bIsPause ) neodigmTulip.close()
        }, false)
        this.bIsInit = true
        return this      
      }
    }
  }
  prepOpen( sCnf, oRct ){
    this.oCnfCur = Object.assign( JSON.parse( JSON.stringify( this.oCnfDef ) ), neodigmUtils.getValJSON( sCnf, "msg" ) );
    for ( let sDS in this.oCnfCur ) {  //  Gen elem datast
      this.eTulip.dataset[ "n55" + neodigmUtils.capFirst( sDS ) ] = this.oCnfCur[ sDS ]  //  Set Theme and ...
    }
    let nThemeAlt = ( neodigmOpt.N55_AMPM_THEME =="light" ) ? 1 : 0;  //  Dark alt if ghost /w ampm
    if( neodigmOpt.ROOT ) neodigmOpt.ROOT.style.setProperty( "--neodigm-theme-tulip", "#" + neodigmOpt.N55_THEME_COLORS[ this.eTulip.dataset.n55Theme ][ ( this.eTulip.dataset.n55Theme == "ghost" ) ? nThemeAlt : 0 ]);
    if( this.oCnfCur?.mrq ){
      this.eTulip.dataset.n55Mrq = "true"
      this.eTulMrq.dataset.n55MarqueeText = this.eTulPre.value = this.oCnfCur.msg
      this.eTulMrq.dataset.n55Theme = this.eTulPre.dataset.n55Theme = this.oCnfCur.theme
    }else{
      this.eTulMrq.dataset.n55MarqueeText = this.eTulPre.value = ""
      this.eTulip.dataset.n55Lines = ( this.oCnfCur.msg.indexOf( "|" ) == -1 ) ? "1" : "2" 
      this.eTulipTxt.innerHTML = this.oCnfCur.msg.replace("|", "<br>")      
    }
    if(this.fOnBeforeOpen[ this.sId ]) this.fOnBeforeOpen[ this.sId ]( this.oCnfCur.msg )
    if(this.fOnBeforeOpen["def"]) this.fOnBeforeOpen["def"]( this.oCnfCur.msg )
    neodigmTulip.open( oRct )
    this.oCnfCur = Object.assign( this.oCnfDef )  //  reset 2 default
  }
  autoOpen( sQry ) {  //  DOM query
    let elTrg = this._d.querySelector( sQry )
    if( elTrg && elTrg?.dataset[ "n55Tulip" ] ){
      neodigmTulip.prepOpen( elTrg.dataset[ "n55Tulip" ], elTrg.getBoundingClientRect() )
    }
    this.bIsAuto = true
    setTimeout( function(){ neodigmTulip.bIsAuto = false }, 2e3 )
    return this;
  }
  open( oRct ) {
    this.eTulip.classList.add("tulip__cont--show")
    this.eTulip.classList.remove("tulip__cont--hide")
    let nTlW = this.eTulip.getBoundingClientRect().width
    let nPrW = oRct.width
    let nPrC = oRct.left + Math.round( nPrW / 2 )
    this.eTulip.style.top = oRct.top + "px";
    this.eTulip.style.left = nPrC - Math.round( nTlW / 2 ) + "px";
    const NOFFSET = 8
    switch( this.eTulip.dataset.n55Position = this.oCnfCur.position ){
      case "top":
        this.eTulip.style.top = oRct.top - (NOFFSET * NOFFSET) + "px";
      break
      case "right":
        this.eTulip.style.left = ( oRct.right + (NOFFSET + 6) ) + "px";
      break
      case "bottom":
        this.eTulip.style.top = oRct.bottom + (NOFFSET + NOFFSET) + "px";
      break
      case "left":
          this.eTulip.style.left = ( oRct.left - ( nTlW + (NOFFSET + 6) ) ) + "px";
      break
    }
    this.bIsOpen = true
    return this;
  }
  close() {
    if( this.bIsInit && !this.bIsAuto ){
      this.eTulip.classList.add("tulip__cont--hide")
      this.eTulip.classList.remove("tulip__cont--show")
      this.bIsOpen = false
    }
    return this;
  }
  pause ( nT ){
    if( this.bIsInit ){
      if( nT ) setTimeout( () =>{neodigmTulip.play()}, nT )
      this.bIsPause = true;  return this;
    }
  }
  play (){
    this.bIsPause = false;
    if( this.bIsOpen ) this.close()
    return this;
  }
  isOpen(){ return this.bIsOpen }
  setOnBeforeOpen( _f, id="def"){ this.fOnBeforeOpen[ id ] = _f }
}
let neodigmTulip = new NeodigmTulip( document, ["neodigm-tulip", "[data-n55-tulip]"] )

//  Neodigm 55 PopTart Begin  //
class NeodigmPopTart {
  constructor(_d, _aQ) {  //  Orthogonal Diagonalizer | Protomolecule
      this._d = _d; this._aQ = _aQ; this.oPopTmpls = {}
      this.elBound = null; this.sBoundTheme = neodigmOpt.N55_THEME_DEFAULT
      this.fOnBeforeOpen = {}; this.fOnAfterOpen = {}; this.fOnClose = {}
      this.bIsOpen = this.bIsInit = false
  }
  init() {
    if( !this.bIsInit ){  //  once
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("mouseover", ( ev ) => {  //  data-n55-poptart-hover
            if( ev.target?.dataset?.n55PoptartHover ){
                const sAttrEv = ev.target?.dataset?.n55PoptartHover // || ev?.srcElement?.parentNode?.dataset?.n55PoptartHover
                this.sBoundTheme = ev.target.n55Theme || ev.target?.dataset?.n55Theme || ev.target?.parentNode?.dataset?.n55Theme || neodigmOpt.N55_THEME_DEFAULT
                if( this.sBoundTheme != "disabled" ) {
                    let elPopTmpl = this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].querySelector( "#" + sAttrEv )
                    if( elPopTmpl?.dataset?.n55Poptart ){
                        this.elBound = ev.target
                        this.sBoundTheme = this.elBound ||neodigmOpt.N55_THEME_DEFAULT
                        ev.preventDefault()
                        neodigmPopTart.open( this.oPopTmpls[ sAttrEv ] = elPopTmpl, JSON.parse( elPopTmpl.dataset.n55Poptart ) )
                    }
                }
            }
        }, false)
        /* ADVANCED HOVER PATTERNS
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("mouseout", ( ev ) => {  //  data-n55-poptart-hover
            console.log( " ~~~ ev.target?.dataset?.n55PoptartHover | " + ev.target?.dataset?.n55PoptartHover )
            let sPTCont = neodigmUtils.walkDOM3( ev?.target, "n55PoptartHover" )
            console.log( " ~~~ sPTCont | " + sPTCont )

            if( sPTCont ){
                this.close()
            }
        } )
        */
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("click", ( ev ) => {  //  data-n55-poptart-click
            if( ev.target?.dataset?.n55PoptartClick || ev.target?.parentNode?.dataset?.n55PoptartClick ){
                const sAttrEv = ev.target?.dataset?.n55PoptartClick || ev.target?.parentNode?.dataset?.n55PoptartClick
                this.sBoundTheme = ev.target.n55Theme || ev.target?.dataset.n55Theme || ev.target?.parentNode?.dataset.n55Theme || neodigmOpt.N55_THEME_DEFAULT
                    if( this.sBoundTheme != "disabled" ) {
                    let elPopTmpl = this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].querySelector( "#" + sAttrEv )
                    if( elPopTmpl?.dataset?.n55Poptart ){
                        this.elBound = ev.target
                        ev.preventDefault()
                        neodigmPopTart.open( this.oPopTmpls[ sAttrEv ] = elPopTmpl, JSON.parse( elPopTmpl.dataset.n55Poptart ) )
                    }
                }
            }
        }, false)
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("click", ( ev ) => {  //  👁️ Outside Click
            if( this.bIsOpen ){
                let eTarget = ev.target, bInside = false;
                while( eTarget.tagName !== "HTML" ){
                    if( eTarget.dataset.n55PoptartOpen ){ bInside = true; break; }
                    eTarget = eTarget.parentNode;
                }
                if( !bInside ){ neodigmPopTart.close() }
            }
        }, true)
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("keydown", ( ev ) => {  //  Close on Esc Key
            if ( ev.key == "Escape" ){ if( this.bIsOpen ) this.close() }
        }, true)
        this.bIsInit = true
    }
    return this;
  }
  open( elPop, oPos ) {
    if( this.bIsInit && !this.bIsPause && elPop.id && !elPop.dataset?.n55PoptartOpen ) {
        let nOffSetT, nOffSetL, nOffSetH, nOffSetW;  //  TODO oPos offsets conf
        nOffSetT = nOffSetL = nOffSetH = nOffSetW = 0;
        let oRctBound = this.elBound.getBoundingClientRect()
        let pxLft  = window.pageXOffset || this._d.documentElement.scrollLeft
        let pxTop = window.pageYOffset || this._d.documentElement.scrollTop
        const NOFFSET = 10
          //  Allow pre CB to cancel open
        if( this.fOnBeforeOpen[ elPop.id ] ){ if( !this.fOnBeforeOpen[ elPop.id ]() ) return false; }
        if( this.fOnBeforeOpen[ "def" ] ){ if( !this.fOnBeforeOpen[ "def" ]() ) return false; }

        elPop.dataset.n55PoptartOpen = Date.now()
        let oRctPopCt = elPop.getBoundingClientRect()
        oPos.w = ( ( oPos.w ) ? oPos.w : ( oRctBound.width + nOffSetW ) )  //  W
        oPos.x = ( ( oPos.x ) ? oPos.x : ( ( oRctBound.left + (oRctBound.width / 2) ) - ( oPos.w / 2) + pxLft + nOffSetL ) )  //  X  //  TODO calc and align x center of bound elm
        oPos.y = ( ( oPos.y ) ? oPos.y : ( oRctBound.top  + pxTop - nOffSetT ) )  //  Y
        oPos.z = ( ( oPos.z ) ? oPos.z : neodigmOpt.N55_ZIND.PopTart )  //  Z
        oPos.h = ( ( oPos.h ) ? (oPos.h + nOffSetH) : "auto" )  //  H
        oPos.position = ( ( oPos.position ) ? oPos.position : "bottom" )  //  P
        switch( oPos.position ){
            case "top":
                oPos.y = ( oPos.y - ( oRctBound.height + oRctPopCt.height ) + NOFFSET )
            break
            case "right":
                oPos.x = ( oPos.x + oRctBound.width )
            break
            case "bottom":
                oPos.y = ( oPos.y + oRctBound.height ) + NOFFSET
            break
            case "left":
                oPos.x = ( oPos.x - oRctBound.width )
            break
        }
        elPop.style.left = oPos.x + "px"; elPop.style.top = oPos.y + "px"; elPop.style.width = oPos.w + "px"
        elPop.style.height = ( oPos.h == "auto" ) ? "auto" : oPos.h + "px";
        //elPop.style.position = "absolute";
        elPop.style.zIndex = oPos.z;
        if( !elPop.dataset?.n55Theme ) elPop.dataset.n55Theme = this.sBoundTheme  //  Inherit Theme from Bound El, may be flash theme
        if( neodigmOpt.N55_GTM_DL_POPTRT ) neodigmUtils.doDataLayer( neodigmOpt.N55_GTM_DL_POPTRT, elPop.id )
        this.bIsOpen = true
        if( this.fOnAfterOpen[ elPop.id ] ) this.fOnAfterOpen[ elPop.id ]()
        if( this.fOnAfterOpen["def"] ) this.fOnAfterOpen["def"]()
    }
    return this;
  }
  close() {
    for( let e in this.oPopTmpls ){
        if( this.oPopTmpls[ e ]?.dataset?.n55PoptartOpen ){
            let sId = this.oPopTmpls[ e ]?.id
            let bOkClose = true  //  CBs must explicitly return false to prevent closing
            if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~Poptart Close | " + sId, this.fOnClose[ sId ] )
            if( this.fOnClose[ sId ] ) bOkClose = !(this.fOnClose[ sId ]( sId ) === false)  //  The specific can cancel the generic
            if( bOkClose && this.fOnClose["def"] ) bOkClose = !(this.fOnClose["def"]( sId ) === false)
            if( bOkClose ){
                delete this.oPopTmpls[ e ].dataset.n55PoptartOpen;
                this.bIsOpen = false
            }
        }
    }
    return this;
  }
  pause ( nT ){
    if( this.bIsInit ){
      if( nT ) setTimeout( () =>{neodigmPopTart.play()}, nT )
      this.bIsPause = true;  return this;
    }
  }
  play (){
    this.bIsPause = false;
    return this;
  }
  shake( bSound = true) {  //  Shake All Open
    if(this.bIsInit && this.bIsOpen) {
        if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([8, 32, 48])
        for( let e in this.oPopTmpls ){
            if( this.oPopTmpls[ e ]?.dataset?.n55PoptartOpen ){
                this.oPopTmpls[ e ].classList.add("ndsp__opened--shake1");
                setTimeout(function(){
                    neodigmPopTart.oPopTmpls[ e ].classList.remove("ndsp__opened--shake1");
                }, 460)
            }
        }
        if( bSound && neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound( 13, "QUITE" )
        if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.doHaptic([48, 32, 8])
    }
    return this
}
  isOpen(){ return this.bIsOpen }
  setOnBeforeOpen( _f, id="def"){ this.fOnBeforeOpen[ id ] = _f }
  setOnAfterOpen( _f, id="def"){ this.fOnAfterOpen[ id ] = _f }
  setOnClose( _f, id="def"){ this.fOnClose[ id ] = _f }
}
let neodigmPopTart = new NeodigmPopTart( document, ["neodigm-poptart"] )

//  Neodigm 55 Wired4Sound Begin  //
class NeodigmWired4Sound {
  constructor( _d, _aQ ){
    this._d = _d
    this._aQ = _aQ
    this.aSnd = [
      [,,625,.05,.14,.17,,0,-3.8,-1.7,150,,.06,.1,-1,,,.76,.08],
      [,,1675,,.06,.24,1,1.82,,,837,.06],
      [,,1e3,,,.5,,,,,99,.01,.03],
      [,,129,.01,,.15,,,,,,,,5],
      [1.01,,561,.05,.17,.39,,.78,5.8,1.9,,,.17,,,,,.66,.08,.4],
      [,.5,847,.02,.3,.9,1,1.67,,,-294,.04,.13,,,,.1],
      [,,172,.8,,.8,1,.76,7.7,3.73,-482,.08,.15,,.14],
      [,,20,.04,,.6,,1.31,,,-990,.06,.17,,,.04,.07],
      [2.11,0,73.41619,.01,.9,.27,,.51,,,50,-0.01,.26,,,-0.2,.16,.53,.13,.07],
      [,,537,.02,.02,.22,1,1.59,-6.98,4.97],
      [1.5,.5,270,,.1,,1,1.5,,,,,,,,.1,.01],
      [1.99,,1477,.14,,0,3,.01,,,,,.07,,,,.39,.61,.05],
      [,,646,,.16,.08,1,1.5,-15,,938,.06,,,-64,,,,.18],
      [1.44,,666,.1,.15,.32,,1.15,,,,,.13,,4.3,,.19,.77,.27],
      [1.99,,135,.09,.25,.13,1,.05,-0.3,,46,.05,.12,.3,,,.36,,.01,.62],
      [1.82,,1442,.21,,.23,4,.12,-10,,-846,.01,,.1,,,.17,.12,.12],
      [3,,1583,.01,,.02,4,.02,49,-2,,,.01,.1,,,.04,.59,,.01],

      [3,6,239,.01,.29,.5,1,1.11,-8.6,0,-1,.19,.11,.1,50,0,0,.45,.14,.18],
      [3,6,144,.06,.22,.28,0,1.1,-2.4,-0.1,56,.12,.13,0,31,0,0,.47,.12,.32],
      [24,0,65.41,0,.04,.24,0,1.48,-0.2,.2,-200,0,.02,0,0,-0.1,.13,.06,.01,.37],
      [3,.05,153,0,.08,0,4,.1,62,0,0,0,0,0,0,0,0,.58,.02,0],
      [3,.05,1361,.01,.01,.18,4,.02,0,5.3,0,0,0,0,0,0,.01,.35,.1,0],
      [3,.05,2,.08,.05,0,2,.12,4,90,572,.02,0,0,0,0,.06,1,0,0],
      [3,.05,898,.01,.02,.03,2,1.95,-0.2,.2,368,.04,.02,-0.1,0,0,.13,1.4,.02,.02],
      [10,.05,366,0,.18,.47,1,.65,.4,.2,0,0,.09,.1,3,-0.1,.03,-0.19,.07,.27]
    ]
    this.bIsInit = false
  }
  init () {
    ["click", "mouseover"].forEach(( evName ) => {
      this._d.querySelector( this._aQ[0] ).addEventListener(evName, ( ev )=>{
        let sAtr = "n55Wired4sound" + neodigmUtils.capFirst( evName ).replace("Mouseover","Hover")  //  hover convention
        let evAtr = neodigmUtils.walkDOM3( ev?.target, sAtr )
        let evTheme = neodigmUtils.walkDOM3( ev?.target, "n55Theme" )
        neodigmUtils.walkDOM3( ev?.target, "n55Tulip" )
        if( evAtr && (evTheme != "disabled") ) {
          if( evAtr == "vibrate" ){
            neodigmWired4Sound.vibrate()
          }else{ neodigmWired4Sound.sound( evAtr ) }
        }
      }, false);
    })
    this.bIsInit = true; return this
  }
  pause ( nT ){
    if( this.bIsInit ){
      if( nT ) setTimeout( () =>{neodigmWired4Sound.play()}, nT )
      this.bIsPause = true;  return this;
    }
  }
  play ( sSnd ){ if( this.bIsInit ){
    if( sSnd ) this.sound( sSnd )  //  Legacy compat
    this.bIsPause = false; return this;
  } }
  sound ( nSnd, sMod=null ) {
    if( this.bIsInit && !this.bIsPause && neodigmOpt.N55_APP_STATE.FIRST_TAP ){
        if( sMod ){
            if( sMod == "QUITE" ) zzfxV = zzfxV / 2.6
            if( sMod == "LOUD" )  zzfxV = zzfxV * 2.6
            setTimeout( ()=> { zzfxV = neodigmOpt.W4S_VOLUME }, 128 )
        }
        if(typeof nSnd  === "object"){
            if( zzfx ) zzfx(... nSnd )
        }else{
            if(nSnd >= this.aSnd.length) nSnd = 1
            if( zzfx ) zzfx(... this.aSnd[ nSnd ])
        }
    }
    return this
  }
  vibrate( aVib=[8, 32, 48] ){  
    return this.doHaptic( aVib )
  }  
  doHaptic ( aVib ){
    if( neodigmOpt.N55_APP_STATE.FIRST_TAP && neodigmOpt.N55_EVENT_HAPTIC && "vibrate" in navigator){
      window.navigator.vibrate( aVib )
    }
    return this
  }
  setVolume ( nVol ) { if( zzfxV ) zzfxV = nVol; return this }
}
let neodigmWired4Sound = new NeodigmWired4Sound( document, [ neodigmOpt.N55_APP_STATE.CONTEXT ])

//  Neodigm 55 Parallax Begin  //
class NeodigmParallax {
  constructor( _d, _aQ ) {
      this._d = _d; this._aQ = _aQ
      this.bIsInit = false
  }
  init () {
    [ ... this._d.querySelectorAll( this._aQ[0] )].filter( ( ndP ) => {
    if( neodigmUtils.isMobile() ) ndP.dataset.n55ParallaxMobile = neodigmOpt.PRLX_MOBILE;
    let ndPDv = ndP.querySelector("aside")
    if( ndPDv && ndP.dataset[ this._aQ[1] ] ){
      let jRnd = []
      try{
        jRnd = JSON.parse( ndP.dataset[ this._aQ[1] ] )
        jRnd = jRnd[ neodigmUtils.f02x( jRnd.length ) ]
      }catch{
        jRnd = ndP.dataset[ this._aQ[1] ]
      }
      ndPDv.style.backgroundImage = "url(" + jRnd + ")"
    }
    })
    this.bIsInit = true
    return this
  }
}
let neodigmParallax = new NeodigmParallax( document, ["neodigm-parallax", "n55Parallax"] )

//  Neodigm 55 Metronome Begin  //
const neodigmMetronome = ( () =>{
  let oEmit = {}, aIntv = []
  let bIsInit = bIsPause = false 
  return {  //  Oscillation Overthruster
    init: function(){  //  Reset all
      oEmit = {}
      aIntv.forEach( ( i )=>{ clearInterval( i[0] ) } )
      bIsInit = true
      if( neodigmOpt.neodigmWWInterval ){ 
        (function(){
          let n55Timr;
          function createWorker(){
              let fWorkerSource = function(){
                  let idMap = {};
                  self.onmessage = function( e ){
                      if (e.data.type === 'setInterval'){
                          idMap[ e.data.id ] = setInterval(function(){
                              self.postMessage({ type: 'tick', id: e.data.id });
                          }, e.data.delay);
                      } else if (e.data.type === 'clearInterval'){
                          clearInterval(idMap[ e.data.id ]);
                          delete idMap[ e.data.id ];
                      } else if (e.data.type === 'setTimeout'){
                          idMap[ e.data.id ] = setTimeout(function(){
                              self.postMessage({ type: 'tick', id: e.data.id });
                              delete idMap[ e.data.id ];
                          }, e.data.delay);
                      } else if (e.data.type === 'clearCallback'){
                          clearTimeout(idMap[ e.data.id ]);
                          delete idMap[ e.data.id ];
                      }
                  };
              };
              return new Worker(URL.createObjectURL(new Blob([
                  '(',
                  fWorkerSource.toString(),
                  ')();'
              ], {type: 'application/javascript'})));
          }
          n55Timr = { worker: createWorker(), idToCallback: {}, currentId: 0};
          function generateId(){ return n55Timr.currentId++ }
          function overloadSetInterval(callback, delay){
              let intervalId = generateId();
              if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~MetroN55 setI | " + delay, callback )
              n55Timr.idToCallback[ intervalId ] = callback;
              n55Timr.worker.postMessage({ type: 'setInterval', delay: delay, id: intervalId });
              return intervalId;
          }
          function overloadClearInterval( intervalId ){
              n55Timr.worker.postMessage({ type: 'clearInterval', id: intervalId });
              delete n55Timr.idToCallback[ intervalId ];
          }
          function overloadSetTimeout(callback, delay){
              if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~MetroN55 setT | " + delay, callback )
              let intervalId = generateId();
              n55Timr.idToCallback[ intervalId ] = function(){
                callback();
                delete n55Timr.idToCallback[ intervalId ];
              };
              n55Timr.worker.postMessage({ type: 'setTimeout', delay: delay, id: intervalId });
              return intervalId;
          }
          function overloadClearTimeout( intervalId ){
              n55Timr.worker.postMessage({ type: 'clearInterval', id: intervalId });
              delete n55Timr.idToCallback[ intervalId ];
          }
          n55Timr.worker.onmessage = function(e){
              if (e.data.type === 'tick'){
                  if( typeof n55Timr.idToCallback[ e.data.id ] == "function" ) n55Timr.idToCallback[ e.data.id ]();
              }
          };
          window.n55Timr = n55Timr;
          window.setTimeoutN55 = overloadSetTimeout; window.clearTimeoutN55 = overloadClearTimeout;
          window.setIntervalN55 = overloadSetInterval; window.clearIntervalN55 = overloadClearInterval;
        })();
      }
      return neodigmMetronome;
    },
    tick: function( t ){
      if( bIsInit && !bIsPause ){ oEmit[ t ].forEach( ( f )=>{
        if( oEmit[ t ].mx || oEmit[ t ].mx == 0 ){
          if( oEmit[ t ].mx ){ f( --oEmit[ t ].mx ) }
        }else{ f() }
      } ) }
      return neodigmMetronome;
    },
    subscribe: function( f, t, mx ){  //  Usage: .subscribe(f, 1000, 5)
      let _t = t
      if( bIsInit ){
        if( !oEmit[ _t ] ){
          oEmit[ _t ] = []
          aIntv.push( [setInterval( ()=>{ neodigmMetronome.tick( _t ) }, _t ), t] )
        }
        oEmit[ _t ].push( f )
        if( mx ) oEmit[ _t ].mx = mx
      }
      return neodigmMetronome;
    },
    unsubscribe: function( t ){ 
      oEmit[ t ] = null;
      aIntv = aIntv.filter( ( i )=>{
        if( i[1] == t ){clearInterval( i[0] ); return false; }
        return true;
      } )
      return neodigmMetronome;
    },
    pause: function( nT ){
      bIsPause = true;
      if( nT ) setTimeout( neodigmMetronome.play, nT )
      return neodigmMetronome; },
    isPaused: function(){ return bIsPause },
    play:  function(){ bIsPause = false; return neodigmMetronome; }
  }
})();

//  Neodigm 55 Marquee Begin  //
const neodigmMarquee = ( ( _d, _aQ, _t ) =>{
    let aMarqs = [];
    let bIsInit = bIsPause = bLTR = false
    return {
      init: function(){
        aMarqs = [ ... _d.querySelectorAll( _aQ[0] )]
        aMarqs.forEach( ( eMc )=>{
            eMc.eMp = eMc.querySelector("pre")
            if( eMc.dataset.n55MarqueeDirection !== "false"){
              eMc.addEventListener("mouseover", neodigmMarquee.toggleDir )
              eMc.addEventListener("mouseout", neodigmMarquee.toggleDir )              
            }
            eMc.addEventListener("mousedown", neodigmMarquee.pause )
            eMc.addEventListener("mouseup", neodigmMarquee.play )
        })
        neodigmMetronome.subscribe( ()=>{ requestAnimationFrame( neodigmMarquee.tick ) }, _t )
        bIsInit = true
        return neodigmMarquee;
      },
      tick: function( t ){
        if( bIsInit && !bIsPause ){
            aMarqs.forEach( ( eMc )=>{
                let aMt = [ ... eMc.dataset[ _aQ[1] ]]
                if( bLTR ){
                    aMt.unshift( aMt.pop() )
                }else{
                    aMt.push( aMt.shift() )
                }
                eMc.eMp.textContent = eMc.dataset[ _aQ[1] ] = aMt.join("")
            })
        }
      },
      toggleDir: function(){ if( bIsInit ){ bLTR = !bLTR; return neodigmMarquee; } },
      pause: function( nT ){
        bIsPause = true;
        if( nT ) setTimeout( neodigmMarquee.play, nT )
        return neodigmMarquee; },
      play:  function(){ bIsPause = false; return neodigmMarquee; }
    }
})( document, ["neodigm-marquee", "n55MarqueeText"], 112 );

//  Neodigm 55 Claire Begin  //
class NeodigmClaireAtomOn{
  constructor(x, y, ctx, cnvIdx, cnvMax){
    this.complete = false; this.size = 1
    this.x = x; this.y = y;
    this.dotCtx = ctx; this.cnvIdx = cnvIdx
    this.nInverse = cnvMax - cnvIdx
    this.nMax = Math.max(this.dotCtx.height, this.dotCtx.width)
  }
  draw(){
    let nRings = 0
    if( !this.complete ) this.size = this.size + ( this.nMax * this.nInverse ) / 10
    this.dotCtx.globalCompositeOperation = "destination-out"
    this.dotCtx.beginPath()
      this.dotCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
      this.dotCtx.closePath()
    this.dotCtx.fill()

    while( nRings++ <= 2 ){
      this.dotCtx.beginPath()
        this.dotCtx.arc( neodigmUtils.f02x( this.nMax ), neodigmUtils.f02x( this.nMax ), neodigmUtils.f02x( this.nMax ) + 8, 0, 2 * Math.PI, false)
        this.dotCtx.closePath()
        this.dotCtx.lineWidth = neodigmUtils.f02x( 18 ) + 2
        this.dotCtx.stroke()
    }

    this.dotCtx.globalCompositeOperation = "destination-atop";  //  "destination-atop"

    this.complete = (this.size >= (  this.nMax * 1.4 ) )
    return !this.complete
  }
}

class NeodigmClaireAtomOff{
  constructor(x, y, ctx, cnvIdx, cnvMax){
    this.complete = false; this.size = 1
    this.x = x; this.y = y;
    this.dotCtx = ctx; this.cnvIdx = cnvIdx
    this.nInverse = cnvMax - cnvIdx
    this.nMax = Math.max(this.dotCtx.height, this.dotCtx.width)
  }
  draw(){
    if( !this.complete ) this.size = this.size + ( this.nMax * this.nInverse ) / 4
    this.dotCtx.globalCompositeOperation = "source-over"
    this.dotCtx.beginPath()
      this.dotCtx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false)
      this.dotCtx.closePath()
    this.dotCtx.fill()
    this.complete = (this.size >= (  this.nMax * 1.4 ) )
    return !this.complete
  }
}
class NeodigmClaireConfetti{
  constructor( ctx ){
    this.size = ( neodigmUtils.f02x( 8 ) + 8 );
    this.cCtx = ctx;
    this.aTape = []
    while( this.aTape.length <= (this.cCtx.width / 20) ){
      this.aTape.push({
        "x": neodigmUtils.f02x( this.cCtx.width ), "y": -20,
        "sizeH": ( neodigmUtils.f02x( 14 ) + 4 ), "sizeW": ( neodigmUtils.f02x( 14 ) + 4 ),
        "speed": (neodigmUtils.f02x( 4 ) + 2 ), "gravity": (neodigmUtils.f02x( 4 ) + 4 ),
        "rotation": 9,
        "complete": false,
        "theme": neodigmOpt.N55_THEME_COLORS[ ["warning","info","danger","secondary","primary","night","party"][neodigmUtils.f02x( 6 )] ][ neodigmUtils.f02x( 2 ) ]
      })
    }
    this.nMax = Math.max(this.cCtx.height, this.cCtx.width)
  }
  draw(){
    this.cCtx.clearRect(0, 0, this.cCtx.width, this.cCtx.height)
    var _this = this
    this.aTape = this.aTape.filter(function(oTape){
      if( !oTape.complete ) oTape.y = oTape.y + ( oTape.speed * oTape.gravity );
      _this.cCtx.globalCompositeOperation = "source-over"
        _this.cCtx.fillStyle = "#" + oTape.theme
        _this.cCtx.fillRect( oTape.x, oTape.y, oTape.sizeW, oTape.sizeH )
      _this.cCtx.fill()

      oTape.complete = ( oTape.y >= ( _this.nMax + 6 ) )
      return !oTape.complete
    })
    return ( this.aTape.length )
  }
}
class NeodigmClaire {
/*
Create hidden canvas the size of
      All target DOM child elements, given the two farthest x/y coordinance
Paint a generative / procedural anime on the hidden canvas
Directionally paint each DOM el in turn, with it's slice of the hidden canvas.
Fire completed callback  //  Cut Out Layer
*/
/*
Accessed through components via data tags or through JS via API for non-components
data-n55-claire-theme
data-n55-claire-waxon
data-n55-claire-waxoff

data-n55-claire-click - confetti
*/
    //constructor( _d, _aQ ) {
        //this._d = _d; this._aQ = _aQ
    //}
    static _d = document; static bIsInit = false; static bIsPause = false;
    static _theme = neodigmOpt.N55_THEME_DEFAULT;  //  brand
    static get theme (){ return this._theme; }
    static aAtoms = []

    static init (){
        this.bIsInit = true
        return this
    }
    static showCanv ( sQ, nOpc=1 ){
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )  //  One Single
        let aElCanv = [ ... canvCntr.querySelectorAll( ":scope > *" )]  //  1st decendants
        if( canvCntr && aElCanv ){
          canvCntr.dataset.n55Claire = "true"
          if( !canvCntr.aElCanv ){  //  Once
            canvCntr.aElCanv = []
            aElCanv.forEach(function( el ){
              let cnv = document.createElement( "canvas" )
              cnv.setAttribute("height", el.clientHeight)
              cnv.setAttribute("width",  el.clientWidth)
              cnv.style.height = el.clientHeight; cnv.style.width = el.clientWidth;
              if( nOpc ) cnv.style.opacity = nOpc; 
              el.appendChild( cnv )
              canvCntr.aElCanv.push( [cnv, cnv.getContext("2d"), el.clientHeight, el.clientWidth] )
          })
          }
        }
      }
      return this
    }
    static hideCanv ( sQ ){
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )  //  One Single
        if( canvCntr && canvCntr.aElCanv ) canvCntr.dataset.n55Claire = "false"
      }
      return this
    }
    static initCanvOn( sQ ){  //  Cover Canvas with Themed Rect
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )  //  One Single
        if( canvCntr && canvCntr?.aElCanv ){
          canvCntr.aElCanv.forEach(function( aCnv ){
            let ctx = aCnv[1]
            let themeRadGrad = ctx.createRadialGradient(0, 0, aCnv[2], aCnv[3], (aCnv[2] / 2), aCnv[2] );
            themeRadGrad.addColorStop(0, "#" + neodigmOpt.N55_THEME_COLORS[ NeodigmClaire.theme ][0]);
            themeRadGrad.addColorStop(.6, "#" + neodigmOpt.N55_THEME_COLORS[ NeodigmClaire.theme ][1]);
            themeRadGrad.addColorStop(1, "#" + neodigmOpt.N55_THEME_COLORS[ NeodigmClaire.theme ][0]);
            ctx.fillStyle = themeRadGrad
            ctx.fillRect(0, 0, aCnv[3], aCnv[2])
          })
        }
      }
      return this;
    }
    static initCanvOff ( sQ ){  //  Cover Canvas with Themed Rect
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )  //  One Single
        if( canvCntr && canvCntr?.aElCanv ){
          canvCntr.aElCanv.forEach(function( aCnv ){
            let ctx = aCnv[1]
            ctx.globalCompositeOperation = "destination-out"
            ctx.fillRect(0, 0, aCnv[3], aCnv[2])
          })
        }
      }
      return this;
    }
    static doWaxOn( sQ, theme=neodigmOpt.N55_THEME_DEFAULT, scene="circle", nOpc=.6 ){
      this.showCanv( sQ, nOpc ).setTheme( theme ).initCanvOn( sQ ).waxOn( sQ, scene )
      return this
    }
    static doWaxOff( sQ, theme=neodigmOpt.N55_THEME_DEFAULT, scene="circle", nOpc=.6 ){
      this.showCanv( sQ, nOpc ).setTheme( theme ).initCanvOff( sQ ).waxOff( sQ, scene )
      return this
    }
    static waxOn( sQ ){
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )  //  One Single
        if( canvCntr ){
          NeodigmClaire.aAtoms = []
          canvCntr.aElCanv.forEach(function( elChild, cnvIdx ){
            let ctx = elChild[1]; ctx.height = elChild[2]; ctx.width = elChild[3];
            let nRndX = neodigmUtils.f02x( ctx.width ), nRndY = neodigmUtils.f02x( ctx.height )
            NeodigmClaire.aAtoms.push( new NeodigmClaireAtomOn( nRndX, nRndY, ctx, cnvIdx, canvCntr.aElCanv.length ))
          })
          NeodigmClaire.anime( sQ, true )
        }
      }
      return this
    }
    static waxOff( sQ ){
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )  //  One Single
        if( canvCntr ){
          NeodigmClaire.aAtoms = []
          canvCntr.aElCanv.forEach(function( elChild, cnvIdx ){
            let ctx = elChild[1]; ctx.height = elChild[2]; ctx.width = elChild[3];
            let nRndX = neodigmUtils.f02x( ctx.width ), nRndY = neodigmUtils.f02x( ctx.height )
            NeodigmClaire.aAtoms.push( new NeodigmClaireAtomOff( nRndX, nRndY, ctx, cnvIdx, canvCntr.aElCanv.length ))
          })
          NeodigmClaire.anime( sQ, false )
        }
      }
      return this
    }
    static doConfetti( sQ, theme="random", nOpc=1 ){
      this.showCanv( sQ, nOpc ).setTheme( theme ).initCanvOff( sQ )
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )  //  One Single
        if( canvCntr ){
          NeodigmClaire.aAtoms = []
          canvCntr.aElCanv.forEach(function( elChild ){
            let ctx = elChild[1]; ctx.height = elChild[2]; ctx.width = elChild[3];
            let nCnt = 0
            NeodigmClaire.aAtoms.push( new NeodigmClaireConfetti( ctx ))
          })
          NeodigmClaire.anime( sQ, true )
        }
      }
      return this
    }
    static anime( sQ, bClose ){
      if( this.bIsInit && !this.bIsPause ){
        let _sQ = sQ
        let aAtomRun = NeodigmClaire.aAtoms.filter( ( ar ) => !ar.complete )
        if( aAtomRun.filter( function( ar ) { return ar.draw() } ).length ){
          setTimeout(function(){NeodigmClaire.anime( sQ, bClose )}, 56)
        }else{ if( bClose ) NeodigmClaire.hideCanv( _sQ, bClose )
        }
      }
    }
    static pause (){ this.bIsPause = true; return this; }
    static play (){ this.bIsPause = false; return this; }
    static setTheme ( sTheme = neodigmOpt.N55_THEME_DEFAULT ){
      if( sTheme.indexOf("[") != -1 ) sTheme = JSON.parse( sTheme )  //  from HTML attrb
      if( typeof sTheme == "object") sTheme = sTheme[ neodigmUtils.f02x( sTheme.length ) ]  //  array
      this._theme = sTheme;
      return this; }
    }

//  Neodigm 55 Enchanted CTA Begin
class NeodigmEnchantedCTA {
    constructor( _d, _aQ ) {
        this._d = _d; this._aQ = _aQ
        this.bIsInit = false; this.bIsPause = false
        this.fOnLongTap = {}; this.bLongTap = false
        this.aE = []
    }
    init (){
      this.aE = [ ... this._d.querySelectorAll( this._aQ[0] )]
      if( !this.bIsInit ){  //  once events app_state.context
        this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("click", ( ev ) => {
          let sId = ev?.target?.id || ev?.target?.parentNode?.id || "add_id"
          let bCta = ("n55EnchantedCta" in ev?.target?.dataset) || ("n55EnchantedCta" in ev?.target?.parentNode?.dataset)
          if( bCta ){  //  Optim
            if( neodigmOpt.N55_GTM_DL_CTA ) neodigmUtils.doDataLayer( neodigmOpt.N55_GTM_DL_CTA, sId )
            let sTheme = ev?.target?.dataset?.n55Theme || ev?.target?.parentNode?.dataset?.n55Theme
            if( sTheme != "disabled" ){
              let sFlashTh = ev?.target?.dataset?.n55FlashTheme || ev?.target?.parentNode?.dataset?.n55FlashTheme
              if( sFlashTh ) neodigmEnchantedCTA.flashTheme( sFlashTh )
            }            
          }

        }, false)
        if( neodigmOpt.N55_CTA_LONG_TAP ){
          this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("mousedown", ( ev ) => {
            let sId = ev?.target?.id || ev?.target?.parentNode?.id || "add_id"
            let bCta = ("n55EnchantedCta" in ev?.target?.dataset) || ("n55EnchantedCta" in ev?.target?.parentNode?.dataset)
            if( bCta ){
              neodigmEnchantedCTA.bLongTap = true
              setTimeout( function(){
                if( neodigmEnchantedCTA.bLongTap ){
                  neodigmEnchantedCTA.bLongTap = false
                  if(neodigmEnchantedCTA.fOnLongTap[ sId ]) neodigmEnchantedCTA.fOnLongTap[ sId ]()
                  if(neodigmEnchantedCTA.fOnLongTap["def"]) neodigmEnchantedCTA.fOnLongTap["def"]()                     
                }
              }, 3400 )            
            }
          }, false)
          this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("mouseup", ( ev ) => {
            neodigmEnchantedCTA.bLongTap = false
          }, false)          
        }
      }
      if( neodigmOpt.N55_CTA_RND_TOUCH ){
        neodigmMetronome.subscribe( function(){ neodigmEnchantedCTA.touch() }, neodigmOpt.N55_CTA_RND_TOUCH )
      }
      if( neodigmOpt.N55_DEBUG_lOG ) console.table( this.aE )
      this.bIsInit = true
      return this
    }
    pause (){ this.bIsPause = true; return this; }
    play (){ this.bIsPause = false; return this; }
    setTheme ( sTheme, sId ){
      if( this.bIsInit && !this.bIsPause ){
        this.aE.forEach( (eC) => {  //  orig once
          if( eC.dataset.n55Theme && !eC.n55Theme ) eC.n55Theme = eC.dataset.n55Theme
          if( sId ){
            if( eC?.id == sId ) eC.dataset.n55Theme = sTheme
          }else{
            eC.dataset.n55Theme = sTheme
          }
        });
      }
    return this;
    }
    revertTheme ( sId ){  //  Revert orig theme at point of init
      if( this.bIsInit && !this.bIsPause ){
        this.aE.forEach( ( eC, nDx ) => {
          if( sId ){
            if( (eC?.id == sId) && eC.dataset.n55Theme && eC.n55Theme ) eC.dataset.n55Theme = eC.n55Theme
          }else{
            if( eC.dataset.n55Theme && eC.n55Theme ){
              setTimeout( function(){  eC.dataset.n55Theme = eC.n55Theme }, ( nDx * 24 ) )              
            }
          }
        });
      }
    return this;
    }
    flashTheme ( sTheme ){
      if( this.bIsInit && !this.bIsPause && sTheme ){
        this.setTheme( sTheme )
        setTimeout( function(){ neodigmEnchantedCTA.revertTheme() }, 76 )
      }
    return this;
    }
    touch (){
      if( this.bIsInit && !this.bIsPause && (this.aE.length >= 1) ){
        let eCt = this.aE[ neodigmUtils.f02x( this.aE.length ) ]
        if( eCt.dataset.n55Theme != "disabled" ){
          if( eCt.dataset?.n55EnchantedCtaDontTouch != "true" ){
            let sRndFX = neodigmOpt.N55_CTA_FX[ neodigmUtils.f02x(7) ]
            if( eCt.dataset.n55EnchantedCtaAmbient && !eCt.n55EnchantedCtaAmbient ) eCt.n55EnchantedCtaAmbient = eCt.dataset.n55EnchantedCtaAmbient
            eCt.dataset.n55EnchantedCtaAmbient = sRndFX
            switch( sRndFX ){
              case "alternate":
                if( eCt.dataset.n55EnchantedCtaAlt ){
                  if( !eCt.querySelector("neodigm-marquee") ){
                    eCt["n55EnchantedCtaAlt"] = eCt.innerHTML
                    eCt.querySelectorAll("span")[0].innerText = eCt.dataset.n55EnchantedCtaAlt.split("|")[0]
                    eCt.querySelectorAll("span")[1].innerText = eCt.dataset.n55EnchantedCtaAlt.split("|")[1]                    
                  }
                }
              break;
            }
            if( neodigmOpt.N55_DEBUG_lOG ) console.table( ["touch + " + eCt.id, eCt.innerHTML, eCt.dataset.n55EnchantedCtaAmbient] )
            setTimeout(function(){ neodigmEnchantedCTA.revertTouch( eCt ) }, 8000)
          }
        }
      }
    return this;
    }
    revertTouch ( eCt ){
      if( this.bIsInit && !this.bIsPause ){
        eCt.dataset.n55EnchantedCtaAmbient = ""
        if( eCt.n55EnchantedCtaAmbient ) eCt.dataset.n55EnchantedCtaAmbient = eCt.n55EnchantedCtaAmbient
        if( eCt.n55EnchantedCtaAlt ) eCt.innerHTML = eCt.n55EnchantedCtaAlt
      }
    }
    setOnLongTap( _f, id="def"){ this.fOnLongTap[ id ] = _f }
}
let neodigmEnchantedCTA = new NeodigmEnchantedCTA( document, ["[data-n55-enchanted-cta]"] )

//  Neodigm 55 KPI Card Begin //
class NeodigmKPI {
  /*
  Anim count up and down
  percent
  on scroll triggers
  container queries
  */
  constructor( _d, _aQ ) {
      this._d = _d; this._aQ = _aQ
      this.bIsInit = false; this.bIsPause = false
      this.aE = []
  }
  init (){
    this.aE = [ ... this._d.querySelectorAll( this._aQ[0] )]
    if( !this.bIsInit ) this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("click", ( ev ) => {  //  once event body
      let sId = ev?.target?.id || ev?.target?.parentNode?.id || "add_id"
      let bKPI = ("n55Kpi" in ev?.target?.dataset) || ("n55Kpi" in ev?.target?.parentNode?.dataset)
      if( bKPI && neodigmOpt.N55_GTM_DL_KPI ) neodigmUtils.doDataLayer( neodigmOpt.N55_GTM_DL_KPI, sId )
    }, false)
    if( neodigmOpt.N55_CTA_RND_TOUCH ){
      neodigmMetronome.subscribe( function(){ neodigmKPI.touch() }, neodigmOpt.N55_CTA_RND_TOUCH )
    }
    if( neodigmOpt.N55_DEBUG_lOG ) console.table( this.aE )
    this.bIsInit = true
    return this
  }
  pause (){ this.bIsPause = true; return this; }
  play (){ this.bIsPause = false; return this; }
  setTheme ( sTheme, sId ){
    if( this.bIsInit && !this.bIsPause ){
      this.aE.forEach( (eC) => {  //  orig once n55Theme Property
        if( eC.dataset.n55Theme && !eC.n55Theme ) eC.n55Theme = eC.dataset.n55Theme
        if( sId ){
          if( eC?.id == sId ) eC.dataset.n55Theme = sTheme
        }else{
          eC.dataset.n55Theme = sTheme
        }
      });
    }
  return this;
  }
  touch (){ return this; }
}
let neodigmKPI = new NeodigmKPI( document, ["[data-n55-kpi]"] )

//  Neodigm 55 Carousel  Begin //
class NeodigmCarousel {
  constructor( _d, _aQ ) {
      this._d = _d; this._aQ = _aQ
      this.bIsInit = false; this.bIsPause = false
      this.aelNC = []; this.fOnAfterNav = []  //  TODO fOnBeforeNav
  }
  init ( elRootCntx = this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ] ){  //  rinit
    // TODO would like to fire rinit given a ref to a container element (ADD children)
    this.aelNC = [ ... elRootCntx.querySelectorAll( this._aQ[0] )] // All Carousels within DOM context
    if( this.aelNC.length ){
      this.aelNC.forEach(function( elNC ){
        if( elNC.id ) neodigmCarousel.formatNewCaro( elNC )
      })
      if( !this.bIsInit ) this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].addEventListener("click", ( ev ) => {  //  once event body
        if( ("n55CarouselNav" in ev.target?.dataset) || ("n55CarouselNav" in ev?.target?.parentNode?.dataset) ){
          let sId = ev.target?.id || ev?.target?.parentNode?.id || "add_id"
          let oNav = JSON.parse( ev.target?.dataset?.n55CarouselNav || ev?.target?.parentNode?.dataset?.n55CarouselNav )
          neodigmCarousel.nav( {id: oNav.id, nav: oNav.nav} )
          if( neodigmOpt.N55_GTM_DL_CARSL ) neodigmUtils.doDataLayer( neodigmOpt.N55_GTM_DL_CARSL, sId )
        }
      }, false)
      if( neodigmOpt.N55_DEBUG_lOG ) console.table( this.aelNC )
      this.bIsInit = true
    }
    return this
  }
  formatNewCaro ( elNC ){
    elNC.n55State = {nIdx: ( elNC.n55State?.nIdx ) ? elNC.n55State.nIdx : 1, width: elNC.offsetWidth}
    let elNCCntr = elNC.firstElementChild
    elNC.n55State.aTabCntr = [ ... elNCCntr.querySelectorAll(":scope >section") ]  //  Tab Containers
    elNCCntr.style.width = ( elNC.n55State.aTabCntr.length * elNC.n55State.width ) + "px" // First Section contr width * num children
    elNCCntr.style.gridTemplateColumns = "repeat(" + elNC.n55State.aTabCntr.length + ", 1fr)"
    return elNC
  }
  nav ( oNav, bFireCB = true ){
    if( oNav?.id && this.bIsInit && !this.bIsPause ){
        let elNC = this.aelNC.filter(function( el ){ return ( oNav.id == el.id ); })[0]
        if( !elNC ) {  // This caro did not exist durring init, so lets created it
            let elNewNC = this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].querySelector( "#" + oNav.id )
            if( elNewNC ) this.aelNC.push(elNC = neodigmCarousel.formatNewCaro( elNewNC ))
            if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~caro dyn create | " + oNav.id )
        }
        if( elNC ){
            let elNCCntr = elNC.firstElementChild
            let oState = elNC.n55State
            if( oNav.nav == "loop" ) oNav.nav = "next"  //  Backward Compat - retire loop
            switch( oNav.nav ){
            case "next":  //  loops
                if( oState.nIdx < oState.aTabCntr.length ){ oState.nIdx++ }else{ oState.nIdx = 1 }
                break;
            case "prev":
                if( oState.nIdx != 1 ){ oState.nIdx-- }else{ oState.nIdx = oState.aTabCntr.length }
                break;
            case "random":
                oState.nIdx = neodigmUtils.f02x( oState.aTabCntr.length ) + 1
            break;
            case "getPage":
                return oState.nIdx;
                break;
            case "getName":
              return oState.aTabCntr[ (oState.nIdx - 1) ].dataset?.n55CarouselPageName;
              break;
            default:  //  literal num pg value or string name
                if( typeof oNav.nav === "string" ){  //  Find Page by Name
                    let nPgFromName = 0
                    oState.aTabCntr.forEach( ( oP, nDx )=>{
                        if( oP.dataset?.n55CarouselPageName == oNav.nav ) nPgFromName = ++nDx 
                    } )
                    if( nPgFromName ) oNav.nav = nPgFromName
                }
                if( ( oNav.nav >= 1 ) && ( oNav.nav < (oState.aTabCntr.length + 1) ) ) oState.nIdx = elNC.n55State.nIdx = oNav.nav
            }
            let nSP = ( oState.nIdx - 1 ) * oState.width  //  Scroll Position
            if( neodigmOpt.N55_CARO_BLUR ) elNCCntr.parentElement.classList.add("n55-caro__blur")
            elNC.parentElement.scrollTop = 0;
            elNCCntr.style.marginLeft = ( nSP ) - ( nSP * 2 ) + "px"
            if( bFireCB ){
              let sPg = oState.aTabCntr[ (oState.nIdx - 1) ].dataset?.n55CarouselPageName
              if( neodigmOpt.N55_DEBUG_lOG ) console.table( this.fOnAfterNav )
              if(this.fOnAfterNav[ elNC.id + "_" + oState.nIdx ]) this.fOnAfterNav[ elNC.id + "_" + oState.nIdx ]( elNC.id, oState.nIdx, sPg )  //  single pg
              if(this.fOnAfterNav[ elNC.id ]) this.fOnAfterNav[ elNC.id ]( elNC.id, oState.nIdx, sPg )  //  all pages within this Caro
              if(this.fOnAfterNav["def"]) this.fOnAfterNav["def"]( elNC.id, oState.nIdx, sPg )  //  all Caro
            }
            if( neodigmOpt.N55_CARO_BLUR ) setTimeout( ()=>{ elNCCntr.parentElement.classList.remove("n55-caro__blur"); }, 860 ) 
        }
    }  //  TODO datalayer
    return this;
  }
  pause ( nT ){
    if( this.bIsInit ){
      if( nT ) setTimeout( () =>{ neodigmCarousel.play() }, nT )
      this.bIsPause = true;  return this;
    }
  }
  play (){ this.bIsPause = false; return this; }
  setOnAfterNav ( _f, id="def", pg=""){ this.fOnAfterNav[ ( pg )?(id + "_" + pg):id ] = _f; return this; }
  setTheme ( sTheme, sId ){
    if( this.bIsInit && !this.bIsPause ){
      this.aE.forEach( (eC) => {  //  orig once n55Theme Property
        if( eC.dataset.n55Theme && !eC.n55Theme ) eC.n55Theme = eC.dataset.n55Theme
        if( sId ){
          if( eC?.id == sId ) eC.dataset.n55Theme = sTheme
        }else{
          eC.dataset.n55Theme = sTheme
        }
      });
    }
  return this;
  }
}
let neodigmCarousel = new NeodigmCarousel( document, ["neodigm-carousel"] )

//  Neodigm 55 PWA Begin //
class NeodigmPWA {
  /*
  open soda after about 5 min (host logic) - IF compliant, no open sodas, and not in (standalone?)
  Fire install (and toast) if CTA clicked. Add event to datalayer.
  */
  constructor( _d, _aQ ) {
      this._d = _d; this._aQ = _aQ
      this.bIsInit = false
      this._beforeinstallprompt = null
  }
  init (){
    this.aE = [ ... this._d.querySelectorAll( "#" + this._aQ[0] )]
    if( this.aE ){
      window.addEventListener("appinstalled", () => {
        setTimeout(function(){
            neodigmToast.q("Application Installed ✨", neodigmOpt.N55_THEME_DEFAULT)
            if( neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound( 8 )
            neodigmUtils.doDataLayer( "event", "appinstalled" )
        }, 1200)
        if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~n55 pwa | appinstalled" )
      });
      this.bIsInit = true      
    }
    return this
  }
  beforeinstallprompt ( ev ){  //  TODO update global body data attr INSTALLABLE
    neodigmUtils.doDataLayer( "event", "beforeInstallPrompt" )
    this._beforeinstallprompt = ev
    if( neodigmOpt.N55_DEBUG_lOG ) console.log( "~n55 pwa | beforeinstallprompt" )
  }
  autoOpen ( pause = 0 ){ 
    if( this.bIsInit ){
      setTimeout(function(){  //  TODO SessionStorage semaphore
        if( neodigmPWA._beforeinstallprompt && !neodigmSodaPop.isOpen() && !neodigmPWA.isInStandaloneMode() ) neodigmSodaPop.autoOpen( neodigmPWA._aQ[0] )
      }, pause)      
    }
    return this;
  }
  install (){
    if( this.bIsInit ){
      if( this._beforeinstallprompt ) this._beforeinstallprompt.prompt(), this._beforeinstallprompt = null
    }
  }
  isInStandaloneMode = () => ( "standalone" in window.navigator ) && ( window.navigator.standalone )
}
let neodigmPWA = new NeodigmPWA( document, [ neodigmOpt.N55_PWA_TEMPLATE_ID ] )

//  Neodigm 55 Agent  Begin //
class NeodigmAgent {
  constructor(_d, _aQ) {  //  plugin extension manifest
      this._d = _d; this._aQ = _aQ;
      this.aeWdgs = [];
      this.bIsInit = false
  }
  async init() {  //  rinit
    this.aeWdgs = [ ... this._d.querySelectorAll( this._aQ[0] )]
    this.aeWdgs.forEach( ( oeWdg ) => { 
        if( oeWdg.dataset.n55WidgetId ){
          const sURI = "https://arcanus55.github.io/neodigm55/dist/widgets/" + oeWdg.dataset.n55WidgetId + "/" + oeWdg.dataset.n55WidgetId
          fetch( sURI + ".json" )
          .then( rs => rs.json() )
          .then( rs => {
            if(  rs[0].compressed && LZString ){
              oeWdg.innerHTML = LZString.decompressFromEncodedURIComponent( rs[0].compressed )
              if( neodigmUtils ){
                if( rs[0]?.js ){  //  Inject script elms from manifest
                  rs[0].js.forEach( ( js )=>{ neodigmUtils.fAsyncJS( document, js ) } )
                }
                neodigmUtils.fAsyncJS( this._d, sURI + ".js" )
              }
            }
          } )
        }
    } )
    if( neodigmEnchantedCTA ){
      neodigmEnchantedCTA.setOnLongTap( function(){ neodigmToast.q( "Powered by Neodigm ✨ 55", "night" ); neodigmUtils.robinTheme('marcom'); neodigmWired4Sound.sound("6"); }, "js-touch-point__share")
    } 
  }
  genCronSync() {  //  Protomolecule
    let tN = new Date()
    return tN.getTime() * tN.getHours()
  }
}
let neodigmAgent = new NeodigmAgent( document, ["neodigm-widget"] )

//  Neodigm 55 Picnic  Begin //
class NeodigmPicnic {
  constructor(_d, _aQ) {
      this._d = _d; this._aQ = _aQ;
      this.bIsInit = false
  }
  init() {  //  rinit
    this.bIsInit = true
    return this;
  }
  render( sId, oRows ){
    if( this.bIsInit && sId ){
      let elPicn = this._d[ neodigmOpt.N55_APP_STATE.CONTEXT ].querySelector( this._aQ[0] + "#" + sId)
      if( elPicn && elPicn?.dataset?.n55PicnicConfig ){
        let oCnf = JSON.parse( elPicn.dataset.n55PicnicConfig )
        let sMU = `<header>`
        oCnf.cols.forEach( ( oCol )=>{ sMU += `<div>` + oCol.name + `</div>`})
        sMU += `</header>`
        if( oRows.rows.length ){
          sMU += `<output><article>`
          oRows.rows.forEach( ( aRow )=>{
          sMU += `<section>`
          aRow.forEach( ( sCell )=>{ sMU += `<div>` + sCell + `</div>` } )
          sMU += `</section>`
        } )
          sMU += `</article></output>`
        }
        elPicn.innerHTML = sMU
      }
      // set hight --var
    }
    return this;
  }

}
let neodigmPicnic = new NeodigmPicnic( document, ["neodigm-picnic"] )

// v2.5.0 - Refactor Toast and Metronome STATIC
//  -Neodigm 55 SodaPop Simple Tab (Carosel) //
//  Neodigm 55 Popover Begin  //
//  -Neodigm 55 Enchanted CTA FlashTheme Round-robin //
//  Neodigm 55 Claire Declaire-itive //
//  -Neodigm 55 Confetti Begin (Claire) //
//  Neodigm 55 Cypher Type FX Begin  //
//  Neodigm 55 Post-It Begin (wdg) //

// v2.x.0
//  Neodigm 55 FAB Begin //
//  -Neodigm 55 KPI Card Begin //
//  Neodigm 55 Tradecraft Redact Begin  //
//  Neodigm 55 VT100 Begin //
//  Neodigm 55 Hot Keys Hover and Tripple Click Begin //

// Claire
//  Neodigm 55 Horizontal Accordion Begin //
//  Neodigm 55 Card Deck Begin //
//  Neodigm 55 Memory Slots Begin //
//  Neodigm 55 Quiz | Questionnaire Challenge Begin // T/F, single/multi response, matching, or sequence questions
//  Neodigm 55 Dynamic Infographic Begin //
//  Neodigm 55 Voice Conversational Marketing //

// Parking lot
//  Neodigm 55 A11Y skip Begin  //
//  Neodigm 55 Debugger - Capture all life cycle  //
//  Neodigm 55 Dice Begin  //
//  -Neodigm 55 ToolTip Marquee Begin  //
//  Neodigm 55 Vivid Type Begin  //

function doDOMContentLoaded(){
  const neodigmMU = `
<neodigm-sodapop-scrim></neodigm-sodapop-scrim>
<neodigm-sodapop-scrim-close>
<svg fill="#DD4124" height="48" viewBox="1 0 22 22" width="48" data-sodapop-scrim-svg><path d="M0 0h24v24H0z" fill="none"></path><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path></svg>
</neodigm-sodapop-scrim-close>
<neodiigm-snack class="l-snackbar" role="alert">
<section id="js-snackbar__id" class="snackbar__cont snackbar__cont--hide" aria-live="polite" aria-atomic="true">
<div class="snackbar__progbar"></div><p class="snackbar__msg"></p>
</section>
</neodiigm-snack>
<neodigm-tulip class="tulip__cont--hide" role="tooltip"><p></p> <neodigm-marquee data-n55-marquee-text=" ##msg## " data-n55-marquee-size="xsmall"><pre data-n55-theme="##theme##"></pre></neodigm-marquee> </neodigm-tulip>`;  //  Universal Templs

  let eMU = document.createElement("output");
  eMU.innerHTML = neodigmMU;
  document[ neodigmOpt.N55_APP_STATE.CONTEXT ].appendChild(eMU);
  setTimeout( ()=>{
    if( neodigmOpt.N55_TYPE ){
        let elLk = document.createElement("link")
        elLk.setAttribute("rel", "stylesheet"); elLk.setAttribute("type", "text/css");

elLk.setAttribute("requestor", "Neodigm 55");
        elLk.setAttribute("href", neodigmOpt.N55_TYPE )
        document.head.appendChild( elLk )
    }
    neodigmUtils.appStateListen()  //  Bind to Host
    neodigmMetronome.init()  //  Always-on
    NeodigmClaire.init()
    if( neodigmOpt.N55_AMPM_THEME && !document[ neodigmOpt.N55_APP_STATE.CONTEXT ].dataset.n55AmpmTheme ) document[ neodigmOpt.N55_APP_STATE.CONTEXT ].dataset.n55AmpmTheme = neodigmOpt.N55_AMPM_THEME
    if( neodigmOpt.CONSOLE_LOG_VER ) console.log("%c Neodigm 55 the eclectic low-code UX micro-library ✨ v" + neodigmUtils.ver, "background: #000; color: #F5DF4D; font-size: 20px");
    if( neodigmOpt.neodigmToast ) neodigmToast.init()
    if( neodigmOpt.neodigmSodaPop ) neodigmSodaPop.init()
    if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.init()
    if( neodigmOpt.neodigmParallax ) neodigmParallax.init()
    if( neodigmOpt.neodigmMarquee ) neodigmMarquee.init()
    if( neodigmOpt.neodigmEnchantedCTA ) neodigmEnchantedCTA.init()
    if( neodigmOpt.neodigmKPI ) neodigmKPI.init()
    if( neodigmOpt.neodigmPWA ) neodigmPWA.init()
    if( neodigmOpt.neodigmCarousel ) neodigmCarousel.init()
    if( neodigmOpt.neodigmTulip ) neodigmTulip.init()
    if( neodigmOpt.neodigmPopTart ) neodigmPopTart.init()
    if( neodigmOpt.neodigmAgent ) neodigmAgent.init()
    if( neodigmOpt.neodigmPicnic ) neodigmPicnic.init()
  }, 56)
}

document.addEventListener("DOMContentLoaded", function() { doDOMContentLoaded() });

// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
// https://github.com/KilledByAPixel/ZzFX
let zzfx,zzfxV,zzfxX
zzfxV=neodigmOpt.W4S_VOLUME;
zzfx=(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let
M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0
,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+
r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1)
,-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:
-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/
2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)
+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.
getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination
);b.start();return b};zzfxX=new (window.AudioContext||webkitAudioContext)

var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);
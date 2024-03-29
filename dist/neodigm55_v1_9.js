/*
Neodigm 55 UX v1.9.0
Copyright (c) 2022, Arcanus 55 Privacy Paranoid Vault | Forged by Scott C. Krause

Neodigm 55 is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make your website playful and fun.

All rights reserved. Redistributions of source code must retain the above copyright and notice.
*/

//  Neodigm 55 Options Custom Config Begin  //
let neodigmOpt = {
  neodigmToast: true,
    N55_GTM_DL_TOAST: "n55_gtm_dl_toast",
  neodigmSodaPop: true,
    N55_GTM_DL_POP_OPEN: "n55_gtm_dl_pop_open",
    N55_GTM_DL_POP_CLOSE: "n55_gtm_dl_pop_close",
  neodigmClare: false,  //  Off for now, later cannot be turned off
  neodigmWired4Sound: true,
    W4S_VOLUME: .060,
    EVENT_SOUNDS: true,
  neodigmParallax: true,
    PRLX_MOBILE: false,  //  Show Parallax on Mobile
  neodigmMarquee: true,
  neodigmEnchantedCTA: true,
    N55_CTA_RND_TOUCH: 14001,  //  Touch random CTA button every Xms
    N55_GTM_DL_CTA: "n55_gtm_dl_cta",
    N55_CTA_FX: [ "alternate", "emit", "flash_danger", "flash_warning", "radius", "scroll", "shake" ],
  CONSOLE_LOG_VER: true,
  N55_DEBUG_lOG: false,
  N55_THEME_COLORS: {"brand":["",""], "primary":["",""]}
}

if( typeof neodigmOptCustom != 'undefined' ){
    for( cnfgProp in neodigmOptCustom ){  //  Import Custom Objects props if exists
      neodigmOpt[ cnfgProp ] = neodigmOptCustom[ cnfgProp ]
    }
}

//  Neodigm 55 Utils Begin  //
const neodigmUtils = ( ( _d ) =>{
  return {
    ver: "1.9.0",
    isMobile: function(){ return (_d.body.clientWidth <= 768) ? true : false; },
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
      aDset.forEach( (sVal, nIx) => {
          if( sVal == "-" ){
              bUpper = true;
          }else{
              aDret.push( ( bUpper ) ? sVal.toUpperCase() : sVal );
              bUpper = false;
          }
      });
      return aDret.join("");
    },
    capFirst: s => (s && s[0].toUpperCase() + s.slice(1)) || ""
  }
})( document );

//  Neodigm 55 Toast Begin  //
let neodigmToast = (function(_d, eID, _q) {
  let _nTimeout = 5800, _aQ = [], _eSb, _eSbText, _sTheme
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
      if( neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound( 1 )
    _eSb.classList.add("snackbar__cont--show")
    if("vibrate" in navigator) window.navigator.vibrate([48, 56])
    setTimeout(_fClose, _nTimeout)
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
                      setTimeout(_fOpen, 1200)
                  }
                  _eSb.classList.remove("snackbar__cont--alt")
              }
          }
          _d.body.addEventListener("click", ( ev )=>{
            let evToast = ev?.target?.dataset.n55Toast || ev?.srcElement?.parentNode?.dataset.n55Toast
            let evTheme = ev?.target?.dataset.n55Theme || ev?.srcElement?.parentNode?.dataset.n55Theme
            if( evToast && (evTheme != "disabled") ) neodigmToast.q( evToast )
          }, true)
          bIsInit = true
      },
      q: function( sMsg, sTheme ) {
          if( bIsInit && !bIsPause ){ 
            if( sMsg && sMsg != _aQ[0]?.sMsg ) _aQ.push( {"sMsg": sMsg, "sTheme":sTheme} ) // temporal debounce
            if( window.dataLayer && neodigmOpt.N55_GTM_DL_TOAST ) window.dataLayer.push( {"event": neodigmOpt.N55_GTM_DL_TOAST, "msg": sMsg } )
            if(_aQ.length == 1) _fOpen()
          }
          return neodigmToast
      },
      setTheme: function( sTheme ){
        if( bIsInit && !bIsPause ){ _sTheme = sTheme }
        return neodigmToast
      },
      getQ: function(){ return _aQ; },
      pause: function(){ bIsPause = true;  return neodigmToast; },
      play:  function(){ bIsPause = false; return neodigmToast; }
  }
})(document, "js-snackbar__id", "[data-n55-toast]");

//  Neodigm 55 Soda Pop Begin  //
class NeodigmSodaPop {
    constructor(_d, _aQ) {  //  Flux Capacitor
        this._d = _d; this._aQ = _aQ
        this.eSoda = this.eScrim = this.eClose = this.fOnBeforeOpen = this.fOnAfterOpen = this.fOnClose = null
        this.bIsOpen = this.bIsModal = this.bIsInit = false
    }
    init() {
        this.eScrim = this._d.querySelector(this._aQ[0])
        this.eClose = this._d.querySelector(this._aQ[0] + "-close")
        this._d.body.addEventListener("click", (ev) => {
          let evAtr = ev?.target?.dataset?.n55SodapopId || ev?.srcElement?.parentNode?.dataset?.n55SodapopId 
          let evTheme = ev?.target?.dataset.n55Theme || ev?.srcElement?.parentNode?.dataset.n55Theme
          if( evAtr && (evTheme != "disabled") ) {
              ev.preventDefault()
              neodigmSodaPop.open( evAtr )
          }
          if("NEODIGM-SODAPOP-SCRIM" == ev.target.tagName) {
              if(this.bIsModal) {
                  this.shake()
              } else {
                  this.close()
              }
          }
          if("NEODIGM-SODAPOP-SCRIM-CLOSE" == ev.target.tagName) {
              this.close()
          }
        }, false)
        this.bIsInit = true
        return this
    }
    open(_sId) {
      if(this.bIsOpen) this.close(true)
      this.eTmpl = this._d.getElementById(_sId)
      if(this.bIsInit && this.eTmpl && this.eScrim) {
          if(this.fOnBeforeOpen) this.fOnBeforeOpen()
          this.bIsModal = (this.eTmpl.dataset.n55SodapopModal == "true")
          if(this.bIsModal) {
            this.eClose.classList.add("ndsp__modal")
          }else{
            this.eClose.classList.remove("ndsp__modal")
          }
          this.eScrim.dataset.n55SodapopScrim = "opened"
          this.eClose.dataset.n55SodapopScrim = "opened"
          this.eSoda = this._d.createElement(this._aQ[1])
          setTimeout(function() {
              neodigmSodaPop.eScrim.classList.add("ndsp__blur");
          }, 96)
          if(this.bIsModal) this.eSoda.classList.add("ndsp__modal")
          this.eSoda.classList.add("ndsp__size--" + this.eTmpl.dataset.n55SodapopSize ) 
          setTimeout(function() {
              neodigmSodaPop.eSoda.classList.add("ndsp__opened");
          }, 4)
          this.eSoda.innerHTML = this.eTmpl.innerHTML
          this._d.body.appendChild(this.eSoda)
          if("vibrate" in navigator) window.navigator.vibrate([16, 8]) 
          if(neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS) neodigmWired4Sound.sound(7)
          this.bIsOpen = true;
          if(this.fOnAfterOpen) this.fOnAfterOpen()
          if( window.dataLayer && neodigmOpt.N55_GTM_DL_POP_OPEN ) window.dataLayer.push( {"event": neodigmOpt.N55_GTM_DL_POP_OPEN, "id": _sId } )
      }
      return neodigmSodaPop
    }
    close(_bFast) {
        if(this.bIsInit && this.bIsOpen) {
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
                    }, 304)
                }, 176)
            }
            if(this.fOnClose) this.fOnClose()
            if("vibrate" in navigator) window.navigator.vibrate([8, 16])
            if(neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS) neodigmWired4Sound.sound(3)
            this.bIsOpen = false
            if( window.dataLayer && neodigmOpt.N55_GTM_DL_POP_CLOSE ) window.dataLayer.push( {"event": neodigmOpt.N55_GTM_DL_POP_CLOSE } )
        }
        return this
    }
    shake() {
        if(this.bIsInit && this.bIsOpen) {
            if("vibrate" in navigator) window.navigator.vibrate([8, 32, 48])
            neodigmSodaPop.eSoda.classList.add("ndsp__opened--shake1");
            setTimeout(function(){
                neodigmSodaPop.eSoda.classList.remove("ndsp__opened--shake1");
            }, 460)
            if( neodigmOpt.neodigmWired4Sound && neodigmOpt.EVENT_SOUNDS ) neodigmWired4Sound.sound(9)
            if("vibrate" in navigator) window.navigator.vibrate([48, 32, 8])
        }
        return this
    }
    autoOpen(_sId) {
        setTimeout(function() {
            neodigmSodaPop.open(_sId)
        }, 256);
        return this
    }
    isOpen() {
        return this.bIsOpen
    }
    setOnBeforeOpen(_f) {
        this.fOnBeforeOpen = _f
    }
    setOnAfterOpen(_f) {
        this.fOnAfterOpen = _f
    }
    setOnClose(_f) {
        this.fOnClose = _f
    }
}
let neodigmSodaPop = new NeodigmSodaPop( document, ["neodigm-sodapop-scrim", "neodigm-sodapop", "data-n55-sodapop-modal"] )

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
      [,,646,,.16,.08,1,1.5,-15,,938,.06,,,-64,,,,.18]
    ]
    this.bIsInit = false
  }
  init () {
    ["click", "mouseover"].forEach(( evName ) => {
      this._d.querySelector( this._aQ[0] ).addEventListener(evName, ( ev )=>{
        let sAtr = "n55Wired4sound" + neodigmUtils.capFirst( evName )
        let evAtr = ev?.target?.dataset[ sAtr ] || ev?.srcElement?.parentNode?.dataset[ sAtr ]
        let evTheme = ev?.target?.dataset.n55Theme || ev?.srcElement?.parentNode?.dataset.n55Theme
        if( evAtr && (evTheme != "disabled") ) neodigmWired4Sound.sound( evAtr )
      }, false);
    })
    this.bIsInit = true
    return this
  }
  pause (){ if( this.bIsInit ){ this.bIsPause = true;  return this; } }
  play ( sSnd ){ if( this.bIsInit ){
    if( sSnd ) this.sound( sSnd )  //  Legacy compat
    this.bIsPause = false; return this;
  } }
  sound ( nSnd ) {
    if( this.bIsInit && !this.bIsPause){
      if(typeof nSnd  === "object"){
        if( zzfx ) zzfx(... nSnd )
      }else{
        if(nSnd >= this.aSnd.length) nSnd = 1
        if( zzfx ) zzfx(... this.aSnd[ nSnd ])
      }
    }
    return this
  }
  setVolume ( nVol ) {
    if( zzfxV ) zzfxV = nVol
    return this
  }
}
let neodigmWired4Sound = new NeodigmWired4Sound( document, ["body"])

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
    ndPDv.style.backgroundImage = "url(" + ndP.dataset[ this._aQ[1] ] + ")"
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
    init: function(){
      oEmit = {}  //  Reset all sans setIntr
      aIntv.forEach( ( i )=>{ clearInterval( i ) } )
      bIsInit = true
      return neodigmMetronome;
    },
    tick: function( t ){
      if( bIsInit && !bIsPause ){ oEmit[ t ].forEach( ( f )=>{ f() }) }
      return neodigmMetronome;
    },
    subscribe: function( f, t ){  //  Usage: .subscribe(f, 1000)
      if( bIsInit ){
        let _t = t
        if( !oEmit[ _t ] ){
          oEmit[ _t ] = []
          aIntv.push( setInterval( ()=>{ neodigmMetronome.tick( _t ) }, _t) )
        }
        oEmit[ _t ].push( f )
      }
      return neodigmMetronome;
    },
    unsubscribe: function( t ){  //  TODO
      return neodigmMetronome;
    },
    pause: function(){ bIsPause = true;  return neodigmMarquee; },
    play:  function(){ bIsPause = false; return neodigmMarquee; }
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
      pause: function(){ bIsPause = true;  return neodigmMarquee; },
      play:  function(){ bIsPause = false; return neodigmMarquee; }
    }
})( document, ["neodigm-marquee", "n55MarqueeText"], 112 );

//  Neodigm 55 Claire Begin  //
class NeodigmClaire {
    constructor( _d, _aQ ) {
/*
Create hidden canvas the size of
      All target DOM elements, given the two farthest x/y coordinance
Paint a generative / procedural dwitter on the hidden canvas
Directionally paint each DOM el in turn, with it's slice of the hidden canvas.
Fire completed callback
*/
        this._d = _d; this._aQ = _aQ
        this.bIsInit = false; this.bIsPause = false
        //  Cut Out Layer
    }
    init () {
        this.bIsInit = true
        return this
    }
    setCanv ( sQ ){
      if( this.bIsInit && !this.bIsPause ){
        let canvCntr = this._d.querySelector( sQ )
        let aElCanv = [ ... canvCntr.querySelectorAll( ":scope > *" )]
        if( canvCntr ){
console.log( "canvCntr | ", canvCntr)
console.log( "aElCanv | ", aElCanv)
          aElCanv.forEach(function( el ){
            let cnv = document.createElement( "canvas" )
            cnv.style.width = el.clientWidth
            cnv.style.height = el.clientHeight
            el.appendChild( cnv )
          })
        }
      }
      return this
    }
    pause (){ this.bIsPause = true; return this; }
    play (){ this.bIsPause = false; return this; }
    setTheme (){ if( this.bIsInit ){ return this; } }
}
let neodigmClaire = new NeodigmClaire( document, ["neodigm-claire"] )

//  Neodigm 55 Enchanted CTA Begin
class NeodigmEnchantedCTA {
    constructor( _d, _aQ ) {
        this._d = _d; this._aQ = _aQ
        this.bIsInit = false; this.bIsPause = false
        this.aE = []
    }
    init () {
      this.aE = [ ... this._d.querySelectorAll( this._aQ[0] )]
      if( !this.bIsInit ) this._d.body.addEventListener("click", ( ev ) => {  //  once
        let sId = ev?.target?.id || ev?.srcElement?.parentNode?.id || "add_id"
        let bCta = ("n55EnchantedCta" in ev?.target?.dataset) || ("n55EnchantedCta" in ev?.srcElement?.parentNode?.dataset) 
        if( bCta && window.dataLayer && neodigmOpt.N55_GTM_DL_CTA ) window.dataLayer.push( {"event": neodigmOpt.N55_GTM_DL_CTA, "id": sId } )
      }, false)
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
    revertTheme ( sId ){  //  Revert to orig theme at point of init
      if( this.bIsInit && !this.bIsPause ){
        this.aE.forEach( (eC) => {
          if( sId ){
            if( (eC?.id == sId) && eC.dataset.n55Theme && eC.n55Theme ) eC.dataset.n55Theme = eC.n55Theme
          }else{
            if( eC.dataset.n55Theme && eC.n55Theme ) eC.dataset.n55Theme = eC.n55Theme
          }
        });
      }
    return this;
    }
    flashTheme ( sTheme ){
      if( this.bIsInit && !this.bIsPause && sTheme ){
        this.setTheme( sTheme )
        setTimeout( function(){ neodigmEnchantedCTA.revertTheme() }, 256)
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
                  eCt["n55EnchantedCtaAlt"] = eCt.innerHTML
                  eCt.querySelectorAll("span")[0].innerText = eCt.dataset.n55EnchantedCtaAlt.split("|")[0]
                  eCt.querySelectorAll("span")[1].innerText = eCt.dataset.n55EnchantedCtaAlt.split("|")[1]
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
}
let neodigmEnchantedCTA = new NeodigmEnchantedCTA( document, ["[data-n55-enchanted-cta]"] )

// v1.9.0 - Refactor Toast and Metronome
//  Neodigm 55 Confetti Begin (Claire) //
//  Neodigm 55 Cypher Type FX Begin  //
//  Neodigm 55 ToolTip Marquee Begin  //
//  Neodigm 55 FAB //

// v2.0.0
//  Neodigm 55 KPI Card Begin //

//  Neodigm 55 Tradecraft Redact Begin  //
//  Neodigm 55 VT100 Begin //

// Claire
//  Neodigm 55 Horizontal Accordion Begin //
//  Neodigm 55 Card Deck Begin //
//  Neodigm 55 Memory Slots Begin //
//  Neodigm 55 Quiz | Questionnaire Challenge Begin //
//  Neodigm 55 Dynamic Infographic Begin //
//  Neodigm 55 Voice Conversational Marketing //

// Parking lot
//  Neodigm 55 A11Y skip Begin  //
//  Neodigm 55 Dice Begin  //
//  Neodigm 55 Popover Begin  //
//  Neodigm 55 PWA Begin  //
//  Neodigm 55 Virtual Keyboard Begin  //
//  Neodigm 55 Vivid Begin  //
//  Neodigm 55 CAPTCHA Begin //

function doDOMContentLoaded(){
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
    neodigmMetronome.init()
    if( neodigmOpt.neodigmClaire ) neodigmClaire.init()  //  Note this will be always-on (like metronome)
    if( neodigmOpt.CONSOLE_LOG_VER ) console.log("%c Neodigm 55 the eclectic JavaScript UX micro-library ✨ v" + neodigmUtils.ver, "background: #000; color: #F5DF4D; font-size: 20px");
    if( neodigmOpt.neodigmToast ) neodigmToast.init()
    if( neodigmOpt.neodigmSodaPop ) neodigmSodaPop.init()
    if( neodigmOpt.neodigmWired4Sound ) neodigmWired4Sound.init()
    if( neodigmOpt.neodigmParallax ) neodigmParallax.init()
    if( neodigmOpt.neodigmMarquee ) neodigmMarquee.init()
    if( neodigmOpt.neodigmEnchantedCTA ) neodigmEnchantedCTA.init()
  }, 56)
}

document.addEventListener("DOMContentLoaded", function(ev) {
  doDOMContentLoaded()
});

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
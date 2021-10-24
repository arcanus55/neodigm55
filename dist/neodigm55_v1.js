    var neodigmSnack = (function(_d, eID) {
        var _nTimeout = 5400, _aQ = [], _eSb, _eSbText;
        var _fOpen = function() {
            _eSbText.innerHTML = _aQ[0].replace("|", "<br>");
            _eSb.style.left = ((_d.body.clientWidth / 2) - (_eSb.clientWidth / 2)) + "px";
            _eSb.classList.remove("snackbar__cont--hide");
            _eSb.classList.add("snackbar__cont--show");
            if ("vibrate" in navigator) window.navigator.vibrate([16, 8]);
            setTimeout(_fClose, _nTimeout);
        };
        return {
            init: function(){
                _eSb = _d.getElementById(eID);
                if( _eSb ){
                    _eSbText  = _eSb.querySelector("P");
                    _fClose = function() {
                        _aQ.shift();
                        _eSb.classList.remove("snackbar__cont--show");
                        _eSb.classList.add("snackbar__cont--hide");
                        if (_aQ.length != 0) {
                            setTimeout(_fOpen, 1200);
                        }
                    }
                }
            },
            q: function(sMsg) {
                if (sMsg != _aQ[0]) _aQ.push(sMsg); // debounce
                if (_aQ.length == 1) {
                    _fOpen();
                }
            }
        }
    })(document, "js-snackbar__id");

    
    // neodigm 55 JS v1.0.2 | Scott C. Krause | neodigm | Gamefried JavaScript Framework
    
    var neodigm = {};
    
    // neodigm Modal Begin //
    var _aRevAct=0, _aRevX=0, _sRevId="", _bIsOpen = false, _fOnClose=null, _d=document;
    var neodigmPop = {
      eRev: 0, eRevScrim: 0,
      "init" : function() {
        _aRevX = _d.getElementsByClassName("close-reveal-modal");
        for (var i = 0, ln = _aRevX.length; i < ln; i++) {
            _aRevX[i].addEventListener("click", neodigmPop.close, false);
        }
        _aRevAct = _d.querySelectorAll("[data-rev-id]");
        for (var i = 0, ln = _aRevAct.length; i < ln; i++) {
            _aRevAct[i].addEventListener("click", neodigmPop.open, false);
        }
        neodigmPop.eRevScrim = _d.getElementById("id-reveal__scrim");
      },
      "open" : function(e){
        _bIsOpen = true;
        _sRevId = this.getAttribute("data-rev-id");
        if(_sRevId){
          neodigmPop.eRevScrim.classList.add("reveal__scrim");
          neodigmPop.eRev = _d.getElementById(_sRevId);
          neodigmPop.eRev.classList.add("reveal__box");
          neodigmPop.eRev.parentElement.classList.remove("reveal__init");
            neodigmPop.eRev.style.top = String(window.pageYOffset + 84) + "px";
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
            neodigmPop.eRev.style.top = String(window.pageYOffset + 84) + "px";
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
    // neodigm Modal End //
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
        neodigmSnack.init();
        neodigmPop.init();
    });

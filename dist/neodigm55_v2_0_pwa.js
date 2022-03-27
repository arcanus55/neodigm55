/*
Neodigm 55 UX v2.0.0
Copyright (c) 2022, Arcanus 55 Privacy Paranoid Vault | Forged by Scott C. Krause

Neodigm 55 is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make your website playful and fun.

All rights reserved. Redistributions of source code must retain the above copyright and notice.
*/

//  Neodigm 55 Options Custom Config Begin  //
let neodigmOpt_pwa = {
  ver: "2.0.0",
  neodigmPWA: true,
    N55_GTM_DL_PWA_REGISTERED: "n55_gtm_dl_pwa_registered",
    N55_GTM_DL_PWA_INSTALLED: "n55_gtm_dl_pwa_installed"
}

if( typeof neodigmOpt_pwaCustom != 'undefined' ){
    for( cnfgProp in neodigmOpt_pwaCustom ){  //  Import Custom Objects props if exists
      neodigmOpt_pwa[ cnfgProp ] = neodigmOpt_pwaCustom[ cnfgProp ]
    }
}

//  Neodigm 55 PWA Begin  //

class NeodigmPWA {
  constructor( _d, _aQ ) {
      this._d = _d; this._aQ = _aQ
      this.bIsInit = false
  }
  init () {

    this.bIsInit = true
    return this
  }
}
let neodigmPWA = new NeodigmPWA( document, ["neodigm-", "n55"] )

function doDOMContentLoaded_pwa(){
  const neodigmMU = `
<p>
</p>`;
  let eMU = document.createElement("output");
  eMU.innerHTML = neodigmMU;
  document.body.appendChild(eMU);
  setTimeout( ()=>{


    if( neodigmOpt_pwa.neodigmPWA ) neodigmPWA.init()


  }, 96)
}

document.addEventListener("DOMContentLoaded", function(ev) {
  doDOMContentLoaded_pwa()
});
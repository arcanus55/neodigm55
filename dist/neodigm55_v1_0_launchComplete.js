/*
Neodigm 55 plugin Launch Complete
Copyright (c) 2022, Arcanus 55 Privacy Paranoid Vault | Forged by Scott C. Krause

Neodigm 55 is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make your website playful and fun.

All rights reserved. Redistributions of source code must retain the above copyright and notice.
*/

//  Neodigm 55 Options Custom Config Begin  //
let neodigmOpt_launchComplete = {
  ver: "1.0.0",
  N55_LC_TAG1: "SEMbright 🚀 Digital Marketing That Moves",
  N55_LC_COLOR_BRAND: "7BC4C4",
  N55_GTM_DL_PWA_REGISTERED: "n55_gtm_dl_pwa_registered",
  N55_GTM_DL_PWA_INSTALLED: "n55_gtm_dl_pwa_installed"
}

if( typeof neodigmOpt_launchCompleteCustom != 'undefined' ){
    for( cnfgProp in neodigmOpt_launchCompleteCustom ){  //  Import Custom Objects props if exists
      neodigmOpt_launchComplete[ cnfgProp ] = neodigmOpt_launchCompleteCustom[ cnfgProp ]
    }
}

//  N55 PWA Console Brand begin  //
console.log("%c " + neodigmOpt_launchComplete.N55_LC_TAG1, "background: #000; color: #" + neodigmOpt_launchComplete.N55_LC_COLOR_BRAND + "; font-size: 38px");
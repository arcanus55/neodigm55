/*
Neodigm 55 plugin m5m Launch Complete
Copyright (c) 2022, Arcanus 55 Privacy Paranoid Vault | Forged by Scott C. Krause

Neodigm 55 is an eclectic JavaScript UX micro-library.
The lightweight components come together in a unique way that will make your website playful and fun.

All rights reserved. Redistributions of source code must retain the above copyright and notice.
*/

//  Neodigm 55 Options Custom Config Begin  //
let neodigmOpt_launchComplete = {
  ver: "1.0.0",
  N55_LC_DOMAIN: ["SEMbright.com", 256],
  N55_LC_TAG1: ["SEMbright 🚀 Digital Marketing That Moves", 256],
  N55_LC_TAG2: ["SEMbright 🚀 Digital Marketing That Moves", 256],
  N55_LC_TAG3: ["SEMbright 🚀 Digital Marketing That Moves", 256],
  N55_LC_COLOR_BRAND: ["7BC4C4", 256],
  N55_LC_KEYWORDS: [["A", "B"], 256],
  CONSOLE_LOG_VER: true,
}
if( typeof neodigmOpt_launchCompleteCustom != 'undefined' ){
    for( cnfgProp in neodigmOpt_launchCompleteCustom ){  //  Import Custom Objects props if exists
      neodigmOpt_launchComplete[ cnfgProp ] = neodigmOpt_launchCompleteCustom[ cnfgProp ]
    }
}
//  N55 PWA Console Brand begin  //
if( neodigmOpt_launchComplete.CONSOLE_LOG_VER ) console.log("%c " + neodigmOpt_launchComplete.N55_LC_TAG1[0], "background: #000; color: #" + neodigmOpt_launchComplete.N55_LC_COLOR_BRAND[0] + "; font-size: 38px");

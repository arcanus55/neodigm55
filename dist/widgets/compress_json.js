let doAction = function( sAct ){
    let eTermFrom = document.querySelector( "#l-term-from" )
    let eTermTo = document.querySelector( "#l-term-to" )
    let eKPIFrom = document.querySelector( "#kpi-from__fb" )
    let eKPITo = document.querySelector( "#kpi-to__fb" )
    
    if( eTermFrom && eTermTo ){
        if( sAct == "cBase64uri" ){
            if( eTermFrom.value ){
                try{
                    eTermTo.value = LZString.compressToEncodedURIComponent( eTermFrom.value ).replaceAll(`"`, `_DQ_`)
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("Please put some text in|the FROM box.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        if( sAct == "dBase64uri" ){
            if( eTermTo.value ){
                try{
                    eTermFrom.value = LZString.decompressFromEncodedURIComponent( eTermTo.value )
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("Please put some compressed text in|the TO box.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        
        if( sAct == "cUTF16" ){
            if( eTermFrom.value ){
                try{
                    eTermTo.value = LZString.compressToUTF16( eTermFrom.value ).replaceAll(`"`, `_DQ_`)
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("Please put some text in|the FROM box.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        if( sAct == "dUTF16" ){
            if( eTermTo.value ){
                try{
                    eTermFrom.value = LZString.decompressFromUTF16( eTermTo.value )
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("Please put some compressed text in|the TO box.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        if( sAct == "fromCopy" ){
            if( eTermFrom.value ){
                try{
                    navigator.clipboard.writeText( eTermFrom.value )
                    neodigmToast.q("Copied to|Clipboard", "primary")
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("There is no text to copy.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        if( sAct == "fromPaste" ){
            try{
                navigator.clipboard
                .readText()
                .then((clipText) => ( eTermFrom.value = clipText ));
                neodigmToast.q("Pasted from Clipboard", "primary")
            }catch( er ){
                neodigmToast.q("Unexpected Error|" + er , "danger")
            }
        }
        if( sAct == "fromClear" ){ eTermFrom.value = "" }

        if( sAct == "toCopy" ){
            if( eTermTo.value ){
                try{
                    navigator.clipboard.writeText( eTermTo.value )
                    neodigmToast.q("Copied to|Clipboard", "primary")
                }catch( er ){
                    neodigmToast.q("Unexpected Error| " + er , "danger")
                }
            }else{
                neodigmToast.q("There is no text to copy.", "danger")
                neodigmUtils.robinTheme("danger");
            }
        }
        if( sAct == "toPaste" ){
            try{
                navigator.clipboard
                .readText()
                .then((clipText) => ( eTermTo.value = clipText ));
                neodigmToast.q("Pasted from Clipboard", "primary")
            }catch( er ){
                neodigmToast.q("Unexpected Error|" + er , "danger")
            }
        }
        if( sAct == "toClear" ){ eTermTo.value = "" }
        eKPIFrom.textContent = eTermFrom.value.length
        eKPITo.textContent = eTermTo.value.length
    }
    return false;
}
neodigmMarquee.init();
neodigmEnchantedCTA.init();